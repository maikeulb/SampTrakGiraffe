module Tdl.Pathology.SampTracker.App

open System
open System.Globalization
open System.Collections.Generic
open System.Text
open System.Security.Claims
open System.Security.Claims

open Microsoft.AspNetCore.Authentication
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure

open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Http
open FSharp.Control.Tasks.V2
open FSharp.Control.Tasks.V2.ContextInsensitive

open Giraffe
open DotLiquid
open Giraffe.HttpStatusCodeHandlers
open Tdl.Pathology.SampTracker.Types
open Tdl.Pathology.SampTracker.Repo
open Tdl.Pathology.SampTracker.Path
open Tdl.Pathology.SampTracker.Utils

open Microsoft.AspNetCore.Identity
open Microsoft.AspNetCore.Identity.EntityFrameworkCore
open Microsoft.EntityFrameworkCore
open Giraffe.Serialization
open Newtonsoft.Json
open System.IO
open Microsoft.AspNetCore.Authentication.Cookies
open Microsoft.AspNetCore.DataProtection
open Utf8Json
open Utf8Json.FSharp
open System.Transactions
open Microsoft.Extensions.Configuration
open Utf8Json.Resolvers


// ---------------------------------
// Web app
// ---------------------------------
//type Model = { Username : string ; Location : string ; isAdmin : bool }
//type SimpleClaim = { Type: string; Value: string }
let mutable cnnxn = String.Empty

type UserLoggedOnSession = {
    Username : string
    LocationId : string
    Location : string
    Admin : bool
    Context : string
}

type LocationsList = {
    Locations : Location list
}

let setCookie name (state : IDictionary<string,obj>) = 
    fun (next : HttpFunc) (ctx : HttpContext) ->
        let protector = ctx.GetService<IDataProtectionProvider>().CreateProtector("samptrak")
        let options = new CookieOptions(Path="/",HttpOnly=false,Secure=false)
        let ckietxt = protector.Protect ( JsonConvert.SerializeObject(state) )
        ctx.Response.Cookies.Append(name,ckietxt,options)
        next ctx

        
type Session =
    |NoSession
    |UserLoggedOn of UserLoggedOnSession


let genHash (tohash: string) =
    use sha = Security.Cryptography.SHA256.Create()
    Text.Encoding.UTF8.GetBytes(tohash)
    |> sha.ComputeHash
    |> Array.map (fun b -> b.ToString("x2"))
    |> String.concat ""

let genPseudoID () =
    let rnd = new Random()
    let bytes = Array.init 6 (fun _ -> 0uy)
    rnd.NextBytes(bytes)
    Convert.ToBase64String(bytes).TrimEnd([|'='|])

let generateResetToken =
    let rnd = new Random()
    let bytes = Array.init 20 (fun _ -> 0uy)
    rnd.NextBytes(bytes)
    Convert.ToBase64String(bytes)

let session f =
    fun (next : HttpFunc) (ctx : HttpContext) ->
            match ctx.User.Identity.IsAuthenticated , ctx.Request.Cookies.TryGetValue("st") with
            |false,(_,_)
            |_,(false,_) -> f NoSession next ctx
            |true,(true, ckie) ->
                let protector = ctx.GetService<IDataProtectionProvider>().CreateProtector("samptrak")
                let map = JsonConvert.DeserializeObject<Dictionary<string,obj>>( protector.Unprotect ckie)
                f (UserLoggedOn {Username   = map.["username"] |> string
                                 LocationId = map.["locid"] |> string 
                                 Location   = map.["loc"] |> string 
                                 Admin      = map.["admin"] |> string |> bool.Parse
                                 Context    = map.["context"] |> string }) next ctx
        
let showErrors (errors : IdentityError seq) =
    errors
    |> Seq.fold (fun acc err ->
        sprintf "Code: %s, Description: %s" err.Code err.Description
        |> acc.AppendLine : StringBuilder) (StringBuilder(""))
    |> (fun x -> x.ToString())
    |> text

let accessDenied txt = (setStatusCode 401 >=> text txt )

//let mustBeAdmin : HttpFunc -> HttpContext -> HttpFuncResult =
//    requiresAuthentication (accessDenied "Access Denied")
//    >=> requiresRole "Admin" (accessDenied "Access Denied")

module Home =
    let home =
        session (function
             | UserLoggedOn { Username = username; Location = loc; Admin = admin } ->
                    let model = { Username = username;Context=""; LocationId = ""; Location = loc; Admin= admin }
                    dotLiquidHtmlTemplate "Views/Index.html" model
             |_ -> dotLiquidHtmlTemplate "Views/Index.html" ""
        )

    let toggleContext isLocal =
        session (function
                | UserLoggedOn { Username = username; LocationId = locid; Location = loc; Admin = admin } ->
                    let state = ["username", box username;"loc", box loc; "locid", box locid; "admin", box admin; "context", box isLocal ] |> dict
                    setCookie "st" state
                    >=> Successful.OK isLocal
                | _  -> redirectTo false Path.Account.logon
        )
    let changeLocation =
        choose [
            GET  >=> session (function
                        | UserLoggedOn { Username = username; Location = _; Admin = _ } ->
                            let ctx = Repo.getCtxt( cnnxn )
                            match Repo.Location.getLocationsForUserDisplayName username ctx with
                            |Some ls -> 
                                
                                dotLiquidHtmlTemplate ("Views/location.html") ls
                            |None    -> RequestErrors.NOT_FOUND ""
                        | _  -> redirectTo false Path.Account.logon
            )
            POST >=> session (function
                       | UserLoggedOn { Username = username; Location = _; Admin = admin; Context = _ctx } ->
                            fun (next : HttpFunc) (ctx : HttpContext) ->
                                task {
                                    let! form = ctx.BindFormAsync<Location>()
                                    return! (
                                        let ctxt = (Repo.getCtxt( cnnxn ))
                                        let locName = ( Repo.Location.getLocationEntity ( form.LocationId |> int ) ctxt).Value.Name
                                        let state = ["username", box username;"loc", box locName; "locid", box form.LocationId; "admin", box admin; "context", box _ctx  ] |> dict
                                        setCookie "st" state
                                        >=> redirectTo false Path.home
                                    ) next ctx
                                }
                       | _  -> redirectTo false Path.Account.logon
                )
                    
        ]
    let getContext : HttpHandler =
        session (function
                | UserLoggedOn userSession -> 
                    fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                        task { return! ctx.WriteJsonAsync userSession }

                | _  -> redirectTo false Path.Account.logon
        )
    
    let barcode v =
        choose [
            GET >=> fun (next : HttpFunc) (ctx : HttpContext) ->
                        task {
                            let img = BarcodeLib.Core.Barcode.DoEncode(BarcodeLib.Core.TYPE.CODE128, v, true, System.Drawing.Color.Black, System.Drawing.Color.White, 200, 40)
                            //let _ = new Bitmap(img)
                            use mem = new IO.MemoryStream()
                            img.Save(mem,Drawing.Imaging.ImageFormat.Bmp)
                            mem.Seek(0L, SeekOrigin.Begin) |> ignore
                            return! ctx.WriteBytesAsync (mem.ToArray())
                        }
        ]
    
    let boxlabel (id : int) =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctxt : HttpContext) ->
                            task {
                                let ctx = Repo.getCtxt( cnnxn )
                                match Repo.Box.getBoxByBoxId id ctx with
                                |None -> return! RequestErrors.NOT_FOUND (sprintf "%i" id) next ctxt
                                |Some b ->
                                    match Repo.Location.getPrinterIpAndFormat loc ctx with
                                    |Some (ip,fmt) ->
                                        let data =
                                            let fmt = Printf.StringFormat<int -> string -> string -> string -> string> fmt
                                            match b.Description.Length with
                                            |l when l <= 20  ->
                                              sprintf fmt (b.BoxId) (b.Description) "" (DateTime.Today.ToShortDateString()) 
                                            |_ ->
                                              sprintf fmt (b.BoxId) (b.Description.Substring(0,20)) (b.Description.Substring(20)) (DateTime.Today.ToShortDateString())
                                        match checkPrinterStatus ip with
                                        |[||] ->
                                          try
                                            printLabel data ip // check status of printer; return appropriate message
                                            return! ctxt.WriteJsonAsync b
                                          with
                                          |e -> return! ServerErrors.INTERNAL_ERROR e.Message  next ctxt
                                        |_ as errs ->
                                          return!ServerErrors.INTERNAL_ERROR (errs |> Array.fold (fun acc elem -> sprintf "%s %s" acc elem) "")  next ctxt
                                    |None -> return! RequestErrors.NOT_FOUND (sprintf "%d" id)  next ctxt
                        }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]
    
    let rackLabel (id : int) =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctxt : HttpContext) ->
                            task {
                                let ctx = Repo.getCtxt( cnnxn )
                                match Repo.Rack.getRackByRackId id ctx with
                                |None -> return! RequestErrors.NOT_FOUND (sprintf "%d" id) next ctxt
                                |Some r ->
                                    match Repo.Location.getPrinterIpAndFormat loc ctx with
                                    |Some (ip,fmt) ->
                                        let data =
                                            let fmt = Printf.StringFormat<int -> string -> string -> string -> string> fmt
                                            sprintf fmt (r.RackId) (r.Description) "" "" 
                                        try
                                          printLabel data ip
                                          return! ctxt.WriteJsonAsync r 
                                        with
                                        |e -> return! ServerErrors.INTERNAL_ERROR e.Message next ctxt
                                    |None -> return! RequestErrors.NOT_FOUND (sprintf "%d" id) next ctxt
                        }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]

module Auth =
    let health = text "health"
    let badlogon msg =
        let model = new Dictionary<string,string>()
        model.Add("msg", msg)
        dotLiquidHtmlTemplate ("Views/logon.html") model
    let logoff = fun (next : HttpFunc) (ctx : HttpContext) ->
                    task { 
                        ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme) |> ignore
                        return! dotLiquidHtmlTemplate ("Views/logon.html") "" next ctx 
                    }
        
    let admin f_success =
        session (function
        | UserLoggedOn { Admin = true } -> f_success
        | UserLoggedOn _                -> accessDenied "Only for Admin"
        | _                             -> accessDenied "not logged in")
    let logon =
            choose [
                GET  >=> fun (next : HttpFunc) (ctx : HttpContext) ->
                            dotLiquidHtmlTemplate ("Views/logon.html") "" next ctx
                POST >=>fun (next : HttpFunc) (ctx : HttpContext) ->
                            task {
                                let! form = ctx.BindFormAsync<Logon>()
                                return! (
                                    let ctxt = (Repo.getCtxt( cnnxn ))
                                    match Repo.User.validateUser (form.Username, form.Password) ctxt with
                                    |Some user -> 
                                        let claims = [
                                                new Claim(ClaimTypes.Name, user.Email)
                                                new Claim("FullName", user.DisplayName)
                                                new Claim(ClaimTypes.Role, if (user.IsAdmin) then "Administrator" else "User")
                                            ]

                                        let claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                                        let authProperties = new AuthenticationProperties()
                                        do ctx.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties) |> ignore
                                        let locName = ( Repo.Location.getLocationEntity ( form.Location |> int ) ctxt).Value.Name
                                        let state = ["username", box user.DisplayName;"loc", box locName; "locid", box form.Location; "admin", box user.IsAdmin; "context", box false  ] |> dict
                                        setCookie "st" state
                                        >=> redirectTo false Path.home
                                    |None -> 
                                        redirectTo false (sprintf Account.badlogon "Invalid user or password.")
                                ) next ctx
                            }
            ]

    let register =
        choose [
            GET >=> session (function
                            | UserLoggedOn { Username = username; Location = loc } ->
                            fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                task {
                                    let model = { Email="";DisplayName= "";ShortName ="";IsAdmin = false; Password=""; ConfirmPassword="" }
                                    return! dotLiquidHtmlTemplate ("Views/register.html") model next ctx
                                }
                            | _ -> accessDenied "not logged in" )
            POST >=>
                fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                    task {
                        let! form = ctx.BindFormAsync<RegisterUser>()
                        let ctxt = (Repo.getCtxt( cnnxn ))
                        match Repo.User.getUser form.Email ctxt  with
                        | Some existing ->
                            let model = new Dictionary<string,string>()
                            model.Add("Message","Sorry this username is already taken. Try another one.")
                            return! dotLiquidHtmlTemplate ("Views/register.html") model next ctx
                        | None ->
                            let password = form.Password
                            let isAdmin = form.IsAdmin// = "on"
                            let user = Repo.User.newUser (form.Email,form.DisplayName,form.ShortName,password,isAdmin) ctxt
                            return! redirectTo false Path.home next ctx
                    }
        ]

    let reset =
        choose [
            GET  >=> dotLiquidHtmlTemplate ("Views/reset.html") ""
            POST >=> fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                        task {
                            let (settings : IConfiguration) = ctx.GetService<IConfiguration>()
                            let smtpSvr = settings.["smtpSvr"]
                            let! form = ctx.BindFormAsync<ResetRequest>()
                            
                            let un = form.Username
                            let token = generateResetToken
                            let hash = genHash token
                            match Repo.User.storeUserResetToken un hash (Repo.getCtxt( cnnxn )) with
                            |None -> return! Successful.OK "Invalid link." next ctx
                            |Some u ->
                                let subject = sprintf "Password reset request for %s from sample tracker" u.ShortName
                                let resetUrl = sprintf "%s://%s/account/reset/%s"  (ctx.Request.Scheme) (ctx.Request.Host.ToString()) (System.Net.WebUtility.UrlEncode(token))
                                let body = sprintf "Click <a href='%s'>here</a> to reset your password for %s.\r\n" resetUrl (u.DisplayName) //token hash
                                Tdl.Pathology.SampTracker.Utils.sendMail (u.Email,"",subject,body,true,smtpSvr)
                                return! redirectTo false Path.Account.logon next ctx
                        }
        ]

    let changePassword token =
        choose [
            GET >=> warbler( fun _ ->
                    fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                        task {
                            let hash = genHash token
                            match Repo.User.getUserByResetToken hash ( Repo.getCtxt( cnnxn )) with
                            |None -> return! Successful.OK "Invalid password reset link. Only the most recent link is valid. Please check for a more recent email." next ctx
                            |Some u ->
                                let model = {Username = u.ShortName}
                                return! dotLiquidHtmlTemplate ("Views/changepassword.html") model next ctx
                        }
                )
            POST >=> fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                        task {
                            let! form = ctx.BindFormAsync<PasswordChange>()
                            let un = form.Username
                            let password = form.Password
                            let ctxt = (Repo.getCtxt( cnnxn ))
                            match Repo.User.getUserEntityByName un ctxt with
                            |None -> return! RequestErrors.NOT_FOUND un next ctx
                            |Some u ->
                                Repo.User.changeUserPassword u password ctxt |> ignore
                                return! redirectTo false Path.Account.logon next ctx
                        }
        ]

    let changeMyPassword =
      choose [
        GET >=> session ( function
                        | UserLoggedOn { Username = username; Location = loc } ->
                            let model = new Dictionary<string,string>()
                            model.Add("Username",username)
                            dotLiquidHtmlTemplate ("Views/changemypassword.html") model 
                        | _ -> ServerErrors.NOT_IMPLEMENTED "no!" )
        POST >=> session ( function
                         |UserLoggedOn {Username = un } ->
                            fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                task {
                                    let! form = ctx.BindFormAsync<PasswordChange>()
                                    //let un = form.Username
                                    let password = form.Password
                                    printfn "%A - %A" password un
                                    let ctxt = (Repo.getCtxt( cnnxn ))
                                    match Repo.User.getUserEntityByDisplayName ctxt un with
                                    |None -> return! RequestErrors.NOT_FOUND un next ctx
                                    |Some u ->
                                      Repo.User.changeUserPassword u password  ctxt |> ignore
                                      return! redirectTo false Path.Account.logon next ctx

                                }
                         |_ ->  RequestErrors.FORBIDDEN "Not authorised"
                 )
      ]

module Users =
    let users = choose [
                    GET >=> fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                task {
                                        let users = Repo.Location.getUsersSiteLocations (Repo.getCtxt( cnnxn ))
                                        return! ctx.WriteJsonAsync users
                                }
                ]
    let user uid =
        choose [
            POST >=> Auth.admin (fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                    task {
                                        let! user = ctx.BindJsonAsync<User>()
                                        match Repo.User.upsertUser user (Repo.getCtxt( cnnxn )) with
                                        |None -> return! RequestErrors.NOT_FOUND (sprintf "%i" uid) next ctx
                                        |Some v -> return! ctx.WriteStringAsync (sprintf "%i" v)
                                    }
                            )
        ]
    let userlocations u =
        choose [
            GET >=> fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                        printfn "%A" (ctx.GetService<IJsonSerializer>().GetType())
                        task {
                            match Repo.Location.getLocationsForUser u (Repo.getCtxt( cnnxn )) with
                            |Some ls -> return! ctx.WriteJsonAsync ls
                            |None    -> return! RequestErrors.NOT_FOUND "" next ctx
                        }
        ]

module Locations =
    //let all = fun (next : HttpFunc) (ctx : HttpContext) ->
    //    task {
    //            let conts = Repo.Box.getBoxes "0" "The System" (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause, and location where
    //            return! ctx.WriteJsonAsync conts
    //    }
    let locations (getAll : bool) =
        session (function
        | UserLoggedOn { Username = username; LocationId = loc; Context = isLocal } ->
            fun (next : HttpFunc) (ctx : HttpContext) ->
                task {
                    let loc = if (bool.Parse(isLocal) && not getAll) then loc else "0"
                    let locs = Repo.Location.getSiteLocations loc username (Repo.getCtxt( cnnxn ))
                    return! ctx.WriteJsonAsync locs
                }   
        | _  -> RequestErrors.FORBIDDEN "Not authorised"
    )
    
    let despatchlocations (getAll : bool) =
        choose [
            GET >=> session (function
                    | UserLoggedOn { Username = username; LocationId = loc; Context = isLocal } ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let loc = if (bool.Parse(isLocal) && not getAll) then loc else "0"
                                printfn "locid = %s; isLocal - %A" loc isLocal
                                let locs = Repo.Location.getSiteLocationsWithDespatchLocs loc username (Repo.getCtxt( cnnxn ))
                                return! ctx.WriteJsonAsync locs 
                        }
                    | _  -> RequestErrors.FORBIDDEN "Not authorised" 
                )
        ]
    let despatchlocationsById (locId : int) =
        choose [
            POST >=>Auth.admin (fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                    task {
                                        let! despatchlocationIds = ctx.BindJsonAsync<int list>()
                                        match Repo.Location.updateLocationDespatchLocations locId despatchlocationIds (Repo.getCtxt( cnnxn )) with
                                        |None -> return! RequestErrors.NOT_FOUND (sprintf "%i" locId ) next ctx
                                        |Some v -> return! Successful.OK (sprintf "%i" v) next ctx
                                    }
                         )
        ]

    let getDespatchLocationsForLoggedInLocation =
        choose [
            GET >=> session (function
                    | UserLoggedOn { Username = _; LocationId = loc; Context = _ } ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                    let locs = match Repo.Location.getDespatchLocationsForLocation (loc |> int ) (Repo.getCtxt( cnnxn )) with
                                               |Some l -> l
                                               |None   -> []
                                    return! ctx.WriteJsonAsync locs
                            }
                    | _  -> RequestErrors.FORBIDDEN "Not authorised"
                )
        ]

    let locationById id =
        choose [
            POST >=>Auth.admin (fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                task {
                                    let! location = ctx.BindJsonAsync<Location>()
                                    match Repo.Location.upsertLocation location (Repo.getCtxt( cnnxn )) with
                                    |None -> return! RequestErrors.NOT_FOUND (sprintf "%i" id) next ctx
                                    |Some v -> return! Successful.OK (sprintf "%i" v) next ctx
                                }
                         )
        ]
    let locationByName locName =
        choose [
            GET >=>session (function
                    | UserLoggedOn { Username = username; LocationId = loc; Context = isLocal } ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                match Repo.Location.getLocationByName locName (Repo.getCtxt( cnnxn )) with
                                |None -> return! RequestErrors.NOT_FOUND locName next ctx
                                |Some loc -> return! ctx.WriteJsonAsync loc
                            }
                    | _  -> RequestErrors.FORBIDDEN "Not authorised"
                )
        ]

module Containers =
    let containertypes =
        choose [
            GET >=> session (function
                |UserLoggedOn { Username = un } ->
                    fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                        task {
                            let conttyps = Repo.Container.getContainerTypes (Repo.getCtxt( cnnxn ))
                            return! ctx.WriteJsonAsync conttyps 
                    }
                | _  -> RequestErrors.FORBIDDEN "Not authorised" 
            )
        ]
    let containers =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; LocationId = loc; Context = isLocal } ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let loc = if (bool.Parse(isLocal)) then loc else "0"
                                let conts = Repo.Container.getContainers loc un (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause, and location where
                                return! ctx.WriteJsonAsync conts 
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
            POST >=> Auth.admin (
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let! container = ctx.BindJsonAsync<Container>()
                                let id = Repo.Container.upsertContainer container (Repo.getCtxt( cnnxn ))
                                return! Successful.OK (sprintf "%d" id) next ctx
                            }
                        )
        ]

    let containersByLocationId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let conts = Repo.Container.getContainersByLocationId id (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause
                                return!  ctx.WriteJsonAsync  conts 
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]

module Boxes =
    //open Fake.XMLHelper
    let boxtypes =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un } ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let bxtyps = Repo.Box.getBoxTypes (Repo.getCtxt( cnnxn ))
                                return! ctx.WriteJsonAsync bxtyps 
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised" )
        ]

    let boxes =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; LocationId = loc; Context = isLocal } ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let loc = if (bool.Parse(isLocal)) then loc else "0"
                                let conts = Repo.Box.getBoxes loc un (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause, and location where
                                return! ctx.WriteJsonAsync conts
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"

            )
            POST >=> session (function
                              |UserLoggedOn { Username = un } -> // LocationId = loc; Context = isLocal; Admin = _ } ->
                                  fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                      task {
                                            let! box = ctx.BindJsonAsync<Box>()
                                            let ctxt = Repo.getCtxt( cnnxn )

                                            //If box.ParentBoxId <> null, then prevent infinite recursion, somehow .....
                                            //ChildBoxes get recursivley updated, appropriately
                                            let rec updateChildren id acc = //acc here accumumlates ids of boxes that have been updated.
                                                Repo.Box.getChildBoxesByBoxId id ctxt |>
                                                    List.iter (fun ch ->
                                                            let status = if (box.Status <> "Unpacked") then box.Status else ch.Status
                                                            let dest = if (ch.BoxType = "Transient Box") then ch.Destination else box.Destination
                                                            let chbox  = Repo.Box.upsertBox { ch with User = un; Status = status ; Event = box.Event;
                                                                                                    Destination = dest;
                                                                                                    LastLocation = box.LastLocation } (Repo.getCtxt( cnnxn ) )
                                                            Repo.Sample.getSamplesByBoxId chbox.BoxId ctxt |> List.iter (fun s -> Repo.Sample.upsertSample { s with Event = sprintf "%s - in box id %d" box.Event id; User = un } (Repo.getCtxt( cnnxn )) |> ignore)
                                                            //if the Id of this child box is not in the acc (ie already been done)
                                                            if ((acc |> List.contains chbox.BoxId) |> not) then updateChildren chbox.BoxId  (chbox.BoxId :: acc))
                                            updateChildren box.BoxId []

                                            let box = Repo.Box.upsertBox { box with User = un } (Repo.getCtxt( cnnxn ))
                                            //if box.BoxType = "Transient Box" && box.Status = "Empty" then should delete. ? nightly task.
                                            return! ctx.WriteJsonAsync box
                                            //OK (JsonConvert.SerializeObject( box , new Json.OptionConverter()))
                                    }
                              |_ ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]

    let boxesByLocationId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let boxes = Repo.Box.getBoxesByLocationId id (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause
                                return! ctx.WriteJsonAsync boxes //, new Json.OptionConverter() ) )
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]
    let boxByBoxId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                match Repo.Box.getBoxByBoxId id (Repo.getCtxt( cnnxn )) with
                                |None -> return! RequestErrors.NOT_FOUND (sprintf "%d" id) next ctx
                                |Some b -> return! ctx.WriteJsonAsync b
                        }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]
    let childBoxesByBoxId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let bs = Repo.Box.getChildBoxesByBoxId id (Repo.getCtxt( cnnxn ))
                                return! ctx.WriteJsonAsync bs
                            }// , new Json.OptionConverter()) )
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised")
        ]
    let packChildBox =
        choose [
            POST >=> session (function
                              |UserLoggedOn { Username = un; LocationId = loc; Context = isLocal } ->
                                  fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                      task {
                                            let! box = ctx.BindJsonAsync<Box>()
                                            let ctxt = Repo.getCtxt( cnnxn )
                                            //this is a child box, fail, if it has any child boxes itself
                                            match Repo.Box.getChildBoxesByBoxId (box.BoxId) ctxt with
                                            |[] ->
                                                if (box.ParentBoxId.IsSome) then
                                                  match Repo.Box.getBoxByBoxId box.ParentBoxId.Value ctxt with
                                                  |Some parent ->
                                                      let evt = sprintf "'%s' packed in parent '%s'" box.Description parent.Description
                                                      Repo.Sample.getSamplesByBoxId (box.BoxId) ctxt |> List.iter (fun s ->  Repo.Sample.upsertSample { s with User = un; Event = evt;  } (Repo.getCtxt( cnnxn )) |> ignore )
                                                  |None ->
                                                      ()
                                                let box = Repo.Box.upsertBox { box with User = un } (Repo.getCtxt( cnnxn ))  
                                                return! Successful.OK (sprintf "%d" box.BoxId) next ctx
                                            |ch ->
                                                let childs = ch |> List.fold (fun acc elem -> acc  + elem.Description  + ", ") ""
                                                return! RequestErrors.FORBIDDEN (sprintf "Not allowed!\r\nThis box contains [%s]" childs) next ctx
                                        }
                              |_ ->  RequestErrors.FORBIDDEN "Not authorised"
                    )
        ]

    let courierBox boxid =
        choose [
            PUT
            POST >=>
                fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                    task {
                      let ctxt = Repo.getCtxt( cnnxn )
                      match Repo.Box.getBoxByBoxId boxid ctxt with
                      | Some box ->
                          //get samples in box,
                          let boxSamples = Repo.Sample.getAllSamplesByBox boxid ctxt
                          //and all childBoxes;
                          let childBoxes = Repo.Box.getChildBoxesByBoxId boxid ctxt
                          //update status to Intransit, audit
                          boxSamples |> List.iter (fun s -> Repo.Sample.upsertSample { s with Event = sprintf "Collected by courier";User="Courier"; DateTime = DateTime.Now} ctxt |> ignore )
                          //update status of boxes to InTransit, lastMoved, movedBy
                          childBoxes |> List.iter (fun b -> Repo.Box.upsertBox {box with Status = "InTransit"} ctxt  |> ignore)
                          return! Successful.OK (boxid.ToString()) next ctx
                      |None -> return! RequestErrors.NOT_FOUND (boxid.ToString()) next ctx
                    }
        ]

    let moveBoxSamples (a,b) =
        printfn "%d %d" a b
        choose [
            POST >=> session (function
                              |UserLoggedOn { Username = un } ->
                                //what if either box doesn't exist ?
                                Repo.Sample.moveBoxSamples a b un (Repo.getCtxt( cnnxn ))
                                Successful.OK (sprintf "%d" b)
                              |_ -> RequestErrors.FORBIDDEN "Not authorised"
            )
        ]

module Racks =
    let racks =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; LocationId = loc; Context = isLocal } ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let loc = if (bool.Parse(isLocal)) then loc else "0"
                                let raks = Repo.Rack.getRacks loc un (Repo.getCtxt( cnnxn ))
                                return! ctx.WriteJsonAsync raks
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
            POST >=> session (function
                    |UserLoggedOn { Username = un; LocationId = locid; Location = locname; Context = isLocal } ->
                            fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                task {
                                    let! rak = ctx.BindJsonAsync<Rack>()
                                    let ctxt = Repo.getCtxt( cnnxn )
                                    let rakSamples = Repo.Sample.getSamplesByRackId rak.RackId ctxt
                                    printfn "%A %s %s %d" rak locid locname (rakSamples.Length)
                                    match rak.Status with
                                    |"Empty" -> 
                                            //wrap in txn
                                            use ts = new TransactionScope()
                                            rakSamples |> List.iter (fun s ->
                                                        let evt = sprintf "Discarded from %s %s" (rak.Description) locname
                                                        Repo.Sample.auditSample ctxt { s with Event = evt } 
                                                        Repo.Sample.deleteSample s.SampleId ctxt |> ignore
                                                    )
                                            ts.Dispose()
                                    |_       -> ()
                                    let id =
                                        match rakSamples.Length with
                                        |0 -> Repo.Rack.upsertRack { rak with Status = "Empty" } ctxt
                                        //|a when int16 a >= rak.Rows * rak.Cols -> Repo.Rack.upsertRack { rak with Status = "Full" } ctxt
                                        |_ -> Repo.Rack.upsertRack rak ctxt
                                    return! ctx.WriteStringAsync (id.ToString())
                                }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]

    let racksByContainerId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let racks = Repo.Rack.getRacksByContainerId id (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause
                                return! ctx.WriteJsonAsync racks 
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]
    let rackByRackId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                match Repo.Rack.getRackByRackId id (Repo.getCtxt( cnnxn )) with
                                |Some rack ->
                                    return! ctx.WriteJsonAsync rack
                                |None ->
                                    return! RequestErrors.NOT_FOUND (id.ToString()) next ctx
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]

module Sample =
    let samplesByRackId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let samples = Repo.Sample.getSamplesByRackId id (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause
                                return! ctx.WriteJsonAsync samples
                        }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]

    let samplesByBoxId id =
        choose [
            GET >=> session (function
                    |UserLoggedOn { Username = un; Location = loc} ->
                        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                let samples = Repo.Sample.getSamplesByBoxId id (Repo.getCtxt( cnnxn )) //TK - implement 'username' where clause
                                return! ctx.WriteJsonAsync samples 
                            }
                    | _  ->  RequestErrors.FORBIDDEN "Not authorised"
            )
        ]
    let saveSample =
        choose [
            POST    >=> session (function
                        |UserLoggedOn { Username = un; Location = loc } ->
                            fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                                task {
                                        let! smp = ctx.BindJsonAsync<Sample>()
                                        let ctxt = Repo.getCtxt( cnnxn )
                                        match smp.RackId with // prevent saving sample outside bounds of rack.
                                        | 0 ->
                                            let id = Repo.Sample.upsertSample { smp with User = un } ctxt
                                            return! ctx.WriteStringAsync (sprintf "%d" id) 
                                        | _ ->
                                            match Repo.Rack.getRackByRackId (smp.RackId) ctxt with
                                            |None   -> return! RequestErrors.NOT_FOUND (smp.RackId.ToString()) next ctx
                                            |Some r -> if (smp.Row <= r.Rows && smp.Col <= r.Cols) then
                                                            let id = Repo.Sample.upsertSample { smp with User = un } ctxt
                                                            return! ctx.WriteStringAsync (sprintf "%d" id) 
                                                       else
                                                            return! RequestErrors.FORBIDDEN "Outside bounds of rack!" next ctx
                            }
                        |_ -> RequestErrors.FORBIDDEN "Not authorsied"
                    )
        ]
    let unpackSample = //called from the TSM router service - applicable to boxes destined for =>
    (* LocationId	SiteId	  Name	                                    PrinterIp
        101	        32	    Halo Level 1 � Autolab	                  10.170.1.1*)
        choose [
            POST    >=> fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
                            task {
                                    let! smp = ctx.BindJsonAsync<Sample>()
                                    match Repo.Sample.unpackSample (smp) (Repo.getCtxt( cnnxn )) with
                                    |None    -> return! ctx.WriteStringAsync "Not Found"
                                    |Some id -> return! ctx.WriteStringAsync (sprintf "%d" id)
                        }
        ]
    let sampleOps id =
        choose [
            DELETE >=> match Repo.Sample.deleteSample id (Repo.getCtxt( cnnxn )) with
                       |None -> RequestErrors.NOT_FOUND (id.ToString())
                       |Some s-> Successful.OK (s.ToString())
        ]

module Audit =
    let sampleAudits s =
        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
            task {
                let auds = Repo.Audit.getSampleAudits s (Repo.getCtxt( cnnxn ))
                return! ctx.WriteJsonAsync auds
            }
    let boxAudits boxid =
        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
            task {
                let auds = Repo.Audit.getBoxAudits boxid (Repo.getCtxt( cnnxn ))
                return! ctx.WriteJsonAsync auds
            }
    
    let auditLiquidView (s : string) =
        let s = match s.Trim().Substring(0,2) with
                |"00" -> s.Trim().Substring(2,9)
                |_    -> s.Trim()
        let auds = Repo.Audit.getSampleAudits s (Repo.getCtxt( cnnxn ))
        dotLiquidHtmlTemplate ("Views/sampleaudit.html") auds

    let boxSampleAudits trackingId =
        fun (next : HttpFunc) (ctx : Microsoft.AspNetCore.Http.HttpContext) ->
            task {
                let auds = Repo.Audit.getSampleAuditsByTrackingId trackingId (Repo.getCtxt( cnnxn ))
                return! ctx.WriteJsonAsync auds
        }

let webApp =
    choose [
        route home >=> Home.home
        (* AUTH *)
        route Account.logon >=> Auth.logon
        route Account.logoff >=> Auth.logoff
        routef Account.badlogon Auth.badlogon
        route Account.register >=> Auth.admin Auth.register
        route Account.reset >=> Auth.reset
        route Account.location >=> Home.changeLocation
        routef Account.changePassword Auth.changePassword
        route Account.changeMyPassword >=> Auth.changeMyPassword
        (* USERS *)
        route Api.users >=> Auth.admin Users.users
        routef Api.user Users.user
        routef Api.userlocations Users.userlocations

        route Api.locations >=> (*Auth.admin*) (Locations.locations false)
        route Api.allLocations >=> (*Auth.admin*) (Locations.locations true)
        route Api.siteLocationsWithDespathLocations >=> Locations.despatchlocations false
        routef Api.despatchLocationsById Locations.despatchlocationsById
        route Api.despatchLocationsForLocationId >=> Locations.getDespatchLocationsForLoggedInLocation
        routef Api.locationById Locations.locationById
        routef Api.locationByName Locations.locationByName

        route Api.containers >=> (*Auth.admin*) Containers.containers
        routef Api.containersByLocId Containers.containersByLocationId
        route Api.containertypes >=> Containers.containertypes
         
        route Api.boxes >=> warbler (fun _ -> Boxes.boxes)
        route Api.packChildBox >=> Boxes.packChildBox
        routef Api.boxesByLocId Boxes.boxesByLocationId
        routef Api.boxesByBoxId Boxes.boxByBoxId
        route Api.boxtypes >=> Boxes.boxtypes
        routef Api.childBoxesByBoxId Boxes.childBoxesByBoxId
        routef Api.courierBox Boxes.courierBox
        routef Api.moveBoxSamples Boxes.moveBoxSamples

        route Api.racks >=> Racks.racks
        routef Api.racksByContainerId Racks.racksByContainerId
        routef Api.rackByRackId Racks.rackByRackId

        routef Api.samplesByRackId Sample.samplesByRackId
        routef Api.samplesByBoxId Sample.samplesByBoxId
        route Api.saveSample >=> Sample.saveSample
        route Api.unpackSample >=> Sample.unpackSample
        routef Api.sampleOps Sample.sampleOps

        routef Api.sampleAudits Audit.sampleAudits
        routef Api.boxAudits Audit.boxAudits
        routef Api.boxSampleAudits Audit.boxSampleAudits
        routef SampleAudit.sampleaudit Audit.auditLiquidView

        routef Api.barcode Home.barcode
        routef Api.boxlabel Home.boxlabel

        route Account.health >=> Auth.health
        routef Api.toggleContext Home.toggleContext
        route Api.context >=> Home.getContext
        //route "/locs" >=> Locations.all
        routex  "(.*)" >=> Home.home //necessary in Angular2 app, so that index.html is loaded if user refreshes in a 'route'
    ]
    

// ---------------------------------
// Error handler
// ---------------------------------

let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

// ---------------------------------
// Config and Main
// ---------------------------------

let configureCors (builder : CorsPolicyBuilder) =
    builder.WithOrigins("http://localhost:9090")
           .AllowAnyMethod()
           .AllowAnyHeader()
           |> ignore

let configureApp (app : IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IHostingEnvironment>()
    let (settings : IConfiguration) = app.ApplicationServices.GetService<IConfiguration>()
    cnnxn <- 
        try 
            settings.["connxn"] 
        with
        |_ -> "Data Source=10.170.185.132;Initial catalog='BARNET_DEV';User ID = 'sa';Password='C0r3p01nt'"
    (match env.IsDevelopment() with
    | true  -> app.UseDeveloperExceptionPage()
    | false -> app.UseGiraffeErrorHandler(errorHandler))
        .UseAuthentication()
        .UseAuthorization()        
        .UseHttpsRedirection()
        .UseCors(configureCors)
        .UseStaticFiles()
        .UseGiraffe(webApp)

let configureServices (services : IServiceCollection) =
    //Authentication Middleware/Cookie
    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie() |> ignore
    services.AddAuthorization() |> ignore
    // Enable CORS
    services.AddCors() |> ignore

    // Configure Giraffe dependencies
    services.AddGiraffe() |> ignore
    
    services.AddDataProtection().PersistKeysToFileSystem(
                match Environment.OSVersion.Platform with
                |PlatformID.Unix -> DirectoryInfo("/etc/keys/")
                |_ -> DirectoryInfo(@"\\files-tdl\DEPT\IT\samptrakkeys\")
        ) |> ignore
    
    // Now customize only the IJsonSerializer by providing a custom
    // object of JsonSerializerSettings
    
    let customSettings = JsonSerializerSettings(Culture = CultureInfo("en-GB"))
    customSettings.Converters.Add(new Json.OptionConverter())

    services.AddSingleton<IJsonSerializer>(
       NewtonsoftJsonSerializer(customSettings)) |> ignore
            
    
    //let resolver = CompositeResolver.Create(
    //                        FSharpResolver.Instance,
    //                        StandardResolver.Default 
    //                    )
    //services.AddSingleton<IJsonSerializer>(Utf8JsonSerializer(resolver)) |> ignore
    
    
    //services.AddSingleton<IJsonSerializer>( Thoth.Json.Giraffe.ThothSerializer() ) |> ignore

let configureLogging (builder : ILoggingBuilder) =
    builder//.AddFilter(fun l -> l.Equals LogLevel.Error)
           .AddConsole()
           .AddDebug() |> ignore

let configureAppConfiguration (*(context: WebHostBuilderContext)*) (config: IConfigurationBuilder) =
    config
        .AddJsonFile("appsettings.json", false, true)
        .AddEnvironmentVariables() |> ignore

[<EntryPoint>]
let main _ =
    let contentRoot = IO.Directory.GetCurrentDirectory()
    let webRoot     = IO.Path.Combine(contentRoot, "WebRoot")
    DotLiquid.Template.NamingConvention <- DotLiquid.NamingConventions.RubyNamingConvention()
    Template.FileSystem <- { new DotLiquid.FileSystems.IFileSystem with
                                member _.ReadTemplateFile(context, templateName) =
                                  let templatePath = context.[templateName] :?> string
                                  let fullPath = IO.Path.Combine("Views", templatePath)
                                  if not (IO.File.Exists(fullPath)) then failwithf "File not found: %s" fullPath
                                  IO.File.ReadAllText(fullPath) }
    WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(contentRoot)
        .UseWebRoot(webRoot)
        .ConfigureAppConfiguration(configureAppConfiguration)
        .Configure(Action<IApplicationBuilder> configureApp)
        .ConfigureServices(configureServices)
        .ConfigureLogging(configureLogging)
        .UseUrls("http://0.0.0.0:9090/")
        .Build()
        .Run()
    0