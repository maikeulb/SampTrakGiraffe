module Tdl.Pathology.SampTracker.Repo

open System
open System.Collections.Generic
open System.Configuration
open System.Diagnostics
open System.Linq

open FSharp.Data.Sql
open FSharp.Data.Sql.Operators
open FSharp.Data.Sql.Common
open FSharp.Data.Sql.Transactions
open Tdl.Pathology.SampTracker.Types
open Microsoft.Extensions.Configuration

let [<Literal>] connxn = "Server=10.170.184.69,1433;Database=TRACKR_V2;User ID =trakr;Password=Twe@ker23"
//let [<Literal>] connxn = "Server=10.170.184.69,1433;Database=TRACKR_V2;User ID =sa;Password=w1npath"

let config = (new ConfigurationBuilder()).SetBasePath(IO.Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build()

type Sql = SqlDataProvider<ConnectionString = connxn,DatabaseVendor = Common.DatabaseProviderTypes.MSSQLSERVER>


type DbContext = Sql.dataContext
type UserEntity = DbContext.``dbo.UserEntity``
type UserLocationEntity = DbContext.``dbo.UserLocationEntity``
type LocationEntity = DbContext.``dbo.LocationEntity``
type ContainerEntity = DbContext.``dbo.ContainerEntity``

//QueryEvents.SqlQueryEvent.Add( printfn "%A")
let getCtxt ( cnnxn : string ) =    Sql.GetDataContext( cnnxn )
//let getCtxt () =  Sql.GetDataContext(  )

let firstOrNone s = s |> Seq.tryFind (fun _ -> true)
let someOrNone s = if s |> Seq.length > 0 then Some(s |> List.ofSeq) else None
let ifNullNone x = if x = null  then None else Some x
let ifZeroNone x = if x = 0 then None else Some x

let genPseudoID () =
    let rnd = new Random()
    let bytes = Array.init 6 (fun _ -> 0uy)
    rnd.NextBytes(bytes)
    Convert.ToBase64String(bytes).TrimEnd([|'='|])

let locationPredicate (locid:string) = 
                              match Int32.TryParse locid with
                              |false,_
                              |true,0 -> <@ fun (_) -> true @>
                              |true,v -> <@ fun (l:LocationEntity) -> (=) l.LocationId v @>

let userPredicate un = match un with
                       |"" -> <@ fun (_) -> true @>
                       |_  -> <@ fun (u:UserEntity) -> (=) u.DisplayName un @>

module User =
    let validateUser (un, pw) (ctx:DbContext) =
        let user =
            query {
                for user in ctx.Dbo.User do
                where (user.ShortName = un)
                select user
            } |> firstOrNone
        match user with
        |Some u -> if (Crypto.VerifyHashedPassword(u.PassHash, pw)) then
                        {
                            UserId = u.UserId
                            Email = u.Email
                            DisplayName = u.DisplayName
                            ShortName = u.ShortName
                            IsAdmin = u.IsAdmin
                            Locations = [||]
                            SiteMembership = [||]
                        } |>Some
                   else
                       None
        |None   -> None
    let getUserEntity uid (ctx : DbContext) : UserEntity option =
         query {
             for user in ctx.Dbo.User do
             where (user.UserId = uid)
             select user
         } |> firstOrNone

    let getUserEntityByName un (ctx : DbContext) : UserEntity option =
         query {
             for user in ctx.Dbo.User do
             where (user.ShortName = un)
             select user
         } |> firstOrNone

    let getUser un (ctx : DbContext) : User option =
        query {
            for user in ctx.Dbo.User do
            where (user.ShortName = un)
            select user
        }
        |> Seq.map (fun user -> user.MapTo<User>())
        |> firstOrNone
    let upsertUser (user : User) (ctx : DbContext) =
        match getUserEntity user.UserId ctx with
        |None -> None
        |Some(ue) -> ue.Email <- user.Email
                     ue.DisplayName <- user.DisplayName
                     ue.IsAdmin <- user.IsAdmin
                     ue.ShortName <- user.ShortName
                     //add locations
                     let oldLocations = ue.``dbo.UserLocation by UserId`` |> List.ofSeq
                     //delete locations removed
                     let toDelete = oldLocations |> List.choose ( fun oldul ->
                        //printfn "%i" oldul.UserId
                        if  ( user.Locations |> Array.exists (fun l -> (*printfn "\t%i - %i" oldul.LocationId l.LocationId ;*) oldul.LocationId = l.LocationId)) then None else Some(oldul))
                     toDelete |> List.iter (fun ul -> ul.Delete())
                     //insert locations added
                     user.Locations |> Array.choose ( fun newul -> if  not ( oldLocations |> List.exists (fun l -> newul.LocationId = l.LocationId)) then Some newul else None )
                                    |> Array.iter (fun ul -> ctx.Dbo.UserLocation.Create() |> ignore)//(UserId = user.UserId, LocationId = ul.LocationId) |> ignore )
                     ctx.SubmitUpdates()
                     Some ue.UserId

    let changeUserPassword (u : UserEntity) (pword : string) (ctx : DbContext) =
        let passhash = Crypto.HashPassword pword
        u.PassHash <- passhash
        u.ResetToken <- String.Empty
        ctx.SubmitUpdates()
        u.UserId

    let newUser (email,displayname,shortname,password,isadmin) (ctx : DbContext) =
        let passhash = Crypto.HashPassword password
        let user = ctx.Dbo.User.Create(Email = email,
                                       DisplayName= displayname,
                                       ShortName=shortname,
                                       PassHash = passhash,
                                       isAdmin = isadmin)
        ctx.SubmitUpdates()
        user

    let deleteUser (user : User) (ctx : DbContext) =
        match getUserEntity (user.UserId) ctx with
        |None -> ()
        |Some k -> k.Delete()
        ctx.SubmitUpdates()

    let storeUserResetToken (un : string) (token : string) (ctx : DbContext) =
        match getUserEntityByName un ctx with
        |None -> None
        |Some k -> k.ResetToken <- token
                   ctx.SubmitUpdates()
                   Some k

    let getUserByResetToken (token : string) (ctx : DbContext) =
        query {
            for u in ctx.Dbo.User do
            where (u.ResetToken = token)
            select {
                        UserId = u.UserId
                        Email = u.Email
                        DisplayName = u.DisplayName
                        ShortName = u.ShortName
                        IsAdmin = u.IsAdmin
                        Locations = [||]
                        SiteMembership = [||]
                  }
        }
        |> firstOrNone

    let getUserEntityByDisplayName (ctx :DbContext) un =
        query {
            for user in ctx.Dbo.User do
            where (user.DisplayName = un)
            select user
        } |> firstOrNone

module Location =

    let getLocationsForUser un (ctx:DbContext) =
        query {
            for user in ctx.Dbo.User do
            join ul in ctx.Dbo.UserLocation on (user.UserId = ul.UserId)
            join l in ctx.Dbo.Location on (ul.LocationId = l.LocationId)
            //join f in ctx.Dbo.LabelFormats on (l.LabelFmt = f.FormatId)
            where (user.ShortName = un)
            select l
        } |> Seq.map (fun l -> {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } })
          |> Seq.sortBy (fun l -> l.Name) |> someOrNone

    let getLocationsForUserDisplayName un (ctx:DbContext) =
        query {
            for user in ctx.Dbo.User do
            join ul in ctx.Dbo.UserLocation on (user.UserId = ul.UserId)
            join l in ctx.Dbo.Location on (ul.LocationId = l.LocationId)
            //join f in ctx.Dbo.LabelFormats on (l.LabelFmt = f.FormatId)
            where (user.DisplayName = un)
            select l
        } |> Seq.map (fun l -> {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } })
          |> Seq.sortBy (fun l -> l.Name) |> someOrNone
    (*
    let getSiteLocations locationId  (ctx : DbContext) =
        query {
            for s in ctx.Dbo.Site do
            //join l in ctx.Dbo.Location on (s.SiteId = l.SiteId)
            for l in (!!) s.``dbo.Location by SiteId`` do
            //join f in ctx.Dbo.LabelFormats on (l.LabelFmt = f.FormatId)
            for f in (!!) l.``dbo.LabelFormats by FormatId`` do
            where ((%locationPredicate locationId) l)
            select (s,l,f)
        } |> Seq.map (fun (s,l,f) -> {SiteId = s.SiteId; Name= s.Name; Description = s.Description; Locations = [||]},l,f )
          |> Seq.groupBy (fun (s,l,f) -> s)
          |> Seq.map (fun (s,ls) -> let locations = ls |> Seq.map (fun(_,l,f) -> {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = f.FormatId; Name = f.Name } }) |> Array.ofSeq
                                    {s with Locations=locations})
          |> Array.ofSeq
    let getSiteLocationsWithDespatchLocs locationId un (ctx : DbContext) =
        let allSiteLocations = getSiteLocations "0" un ctx
        query {
            for s in ctx.Dbo.Site do
            //join l in ctx.Dbo.Location on (s.SiteId = l.SiteId)
            for l in (!!) s.``dbo.Location by SiteId`` do
            //join f in ctx.Dbo.LabelFormats on (l.LabelFmt = f.FormatId)
            for f in (!!) l.``dbo.LabelFormats by FormatId`` do
            //for orig in (!!) l.``dbo.OriginDestinations by LocationId`` do
            for dest in (!!) l.``dbo.OriginDestinations by LocationId_1`` do
            where ((%locationPredicate locationId) l)
            select (s,l,f,dest)
        } |> Seq.map (fun (s,l,f,dest) -> { SiteLocationsDespatchLocation.SiteId = s.SiteId; Name= s.Name; Description = s.Description; LocationsDespatchLocations = [||]},l,f,dest )
          |> Seq.groupBy (fun (s,l,f,dest) -> s)
          |> Seq.map (fun (s,ls) -> let locations = ls
                                                    |> Seq.groupBy (fun (_,l,f,dest) -> l.LocationId)
                                                    |> Seq.map (fun(locId,groups) ->
                                                        let destinations = groups |> Seq.choose (fun(_,l,f,dest) -> if dest.DestinationLocationId > 0 then Some dest.DestinationLocationId else None ) |> Array.ofSeq
                                                        let l,fmt = groups |> Seq.map (fun (_,l,f,_) -> l,{ FormatId = f.FormatId; Name = f.Name }) |> Seq.take 1 |> Seq.exactlyOne
                                                        let siteMembership = allSiteLocations |> Array.map (fun s -> { SiteMembership.Name = s.Name; Description=s.Description; LocationMembership = s.Locations |> Array.map (fun l -> if (destinations |> Array.exists (fun destId -> destId = l.LocationId))  then { LocationId=l.LocationId;Name=l.Name;IsMember = true } else  { LocationId=l.LocationId;Name=l.Name;IsMember = false } ) } )
                                                        { LocationsDespatchLocation.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = fmt ; DespatchLocations = siteMembership } ) |> Array.ofSeq
                                    { s with LocationsDespatchLocations = locations } // |> Array.distinct }
                     )
          |> Array.ofSeq
    let getSiteLocations locationId un (ctx : DbContext) =
        query {
            for u in ctx.Dbo.User do
            join ul in ctx.Dbo.UserLocation on (u.UserId = ul.UserId)
            join l in ctx.Dbo.Location on (ul.LocationId = l.LocationId)
            join s in ctx.Dbo.Site on (l.SiteId = s.SiteId)
            //join l in ctx.Dbo.Location on (s.SiteId = l.SiteId)
            //for l in (!!) s.``dbo.Location by SiteId`` do
            //join f in ctx.Dbo.LabelFormats on (l.LabelFmt = f.FormatId)
            for f in (!!) l.``dbo.LabelFormats by FormatId`` do
            where ( ((%locationPredicate locationId) l) && ((%userPredicate un) u) )
            select (s,l,f)
        } |> Seq.map (fun (s,l,f) -> {SiteId = s.SiteId; Name= s.Name; Description = s.Description; Locations = [||]},l,f )
          |> Seq.groupBy (fun (s,l,f) -> s)
          |> Seq.map (fun (s,ls) -> let locations = ls |> Seq.map (fun(_,l,f) -> {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = f.FormatId; Name = f.Name } }) |> Array.ofSeq
                                    {s with Locations=locations})
          |> Array.ofSeq

          *)
    let getSiteLocations locationId un (ctx : DbContext) =
        query {
            for u in ctx.Dbo.User do
            join ul in ctx.Dbo.UserLocation on (u.UserId = ul.UserId)
            join l in ctx.Dbo.Location on (ul.LocationId = l.LocationId)
            join s in ctx.Dbo.Site on (l.SiteId = s.SiteId)
            for f in (!!) l.``dbo.LabelFormats by FormatId`` do
            where ( ((%locationPredicate locationId) l) && ((%userPredicate un) u) )
            select (s,l,f)
        } |> Seq.map (fun (s,l,f) -> {SiteId = s.SiteId; Name= s.Name; Description = s.Description; Locations = [||]},l,f )
          |> Seq.groupBy (fun (s,l,f) -> s)
          |> Seq.map (fun (s,ls) -> let locations = ls |> Seq.map (fun(_,l,f) -> {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = f.FormatId; Name = f.Name } }) |> Seq.distinct |> Array.ofSeq
                                    {s with Locations=locations})
          |> Array.ofSeq
    
    //let getPagedSiteLocations locationId un (page: int) (ctx : DbContext) =
    //    let allSiteLocations = getSiteLocations "0" un ctx
    //    allSiteLocations |> Array.mapi (fun i s -> if (i = page) then s else { s with Locations = [||] })
    
    let getSiteLocationsWithDespatchLocs locationId un (ctx : DbContext) =
        let allSiteLocations = getSiteLocations "0" un ctx
        query {
            for u in ctx.Dbo.User do
            join ul in ctx.Dbo.UserLocation on (u.UserId = ul.UserId)
            join l in ctx.Dbo.Location on (ul.LocationId = l.LocationId)
            join s in ctx.Dbo.Site on (l.SiteId = s.SiteId)
            for f in (!!) l.``dbo.LabelFormats by FormatId`` do
            //for orig in (!!) l.``dbo.OriginDestinations by LocationId`` do
            for dest in (!!) l.``dbo.OriginDestinations by LocationId_1`` do
            where ( ((%locationPredicate locationId) l) && ((%userPredicate un) u) )
            select (s,l,f,dest)
        } |> Seq.map (fun (s,l,f,dest) -> { SiteLocationsDespatchLocation.SiteId = s.SiteId; Name= s.Name; Description = s.Description; LocationsDespatchLocations = [||]},l,f,dest )
          |> Seq.groupBy (fun (s,l,f,dest) -> s)
          |> Seq.map (fun (s,ls) -> let locations = ls
                                                    |> Seq.groupBy (fun (_,l,f,dest) -> l.LocationId)
                                                    |> Seq.map (fun(locId,groups) ->
                                                        let destinations = groups |> Seq.choose (fun(_,l,f,dest) -> if dest.DestinationLocationId > 0 then Some dest.DestinationLocationId else None ) |> Array.ofSeq
                                                        let l,fmt = groups |> Seq.map (fun (_,l,f,_) -> l,{ FormatId = f.FormatId; Name = f.Name }) |> Seq.take 1 |> Seq.exactlyOne
                                                        let siteMembership = allSiteLocations |> Array.map (fun s -> { SiteMembership.Name = s.Name; Description=s.Description; LocationMembership = s.Locations |> Array.map (fun l -> if (destinations |> Array.exists (fun destId -> destId = l.LocationId))  then { LocationId=l.LocationId;Name=l.Name;IsMember = true } else  { LocationId=l.LocationId;Name=l.Name;IsMember = false } ) } )
                                                        { LocationsDespatchLocation.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = fmt ; DespatchLocations = siteMembership } ) |> Array.ofSeq
                                    { s with LocationsDespatchLocations = locations } // |> Array.distinct }
                     )
          |> Array.ofSeq

    let getUsersSiteLocations (ctx : DbContext) =
        let allSiteLocations = getSiteLocations "0" "" ctx //refactor
        let users =
            query {
                for u in ctx.Dbo.User do
                for ul in (!!) u.``dbo.UserLocation by UserId`` do // left join to userlocations
                //join ul ctx.Dbo.UserLocation on (u.UserId = ul.UserId)
                for l in (!!) ul.``dbo.Location by LocationId`` do // left join to locations
                //join l in ctx.Dbo.Location on (ul.LocationId = l.LocationId)
                for f in (!!) l.``dbo.LabelFormats by FormatId`` do // left join to LabelFormats
                select (u,l,f)
            } |> List.ofSeq
                |> List.map (fun (u,l,f) -> { UserId = u.UserId; Email = u.Email; DisplayName = u.DisplayName; ShortName = u.ShortName; IsAdmin = u.IsAdmin; Locations = [||]; SiteMembership = [||] }, l, f )
                |> List.groupBy (fun (u,l,f) -> u)
                |> List.map (fun (u,(locs_fmts)) -> let locs = locs_fmts |> Seq.map (fun(_,l,f) -> {Location.Name= l.Name; LocationId=l.LocationId; PrinterIp = l.PrinterIp; LabelFormat = {FormatId = f.FormatId; Name = f.Name } } )
                                                                         |> Seq.filter (fun l -> l.LocationId > 0 ) |> Array.ofSeq
                                                    let siteMembership = allSiteLocations |> Array.map (fun s -> { SiteMembership.Name = s.Name; Description=s.Description; LocationMembership = s.Locations |> Array.map (fun l -> if (locs.Contains(l)) then {LocationId=l.LocationId;Name=l.Name;IsMember= true} else  {LocationId=l.LocationId;Name=l.Name;IsMember= false} ) } )
                                                    { u with Locations = locs; SiteMembership = siteMembership })
        users |> List.sortBy (fun u -> u.ShortName)

    let getLocationEntity id (ctx:DbContext) =
        query {
            for l in ctx.Dbo.Location do
            where (l.LocationId = id)
            select l
        } |> firstOrNone

    let upsertLocation (loc : Location) (ctx:DbContext) =
        match getLocationEntity loc.LocationId ctx with
        |None -> None //this should create a new locaton
        |Some l -> l.Name <- loc.Name
                   l.PrinterIp <- loc.PrinterIp
                   ctx.SubmitUpdates()
                   Some l.LocationId
    let getLocationDespatchLocationsByOriginId origId (ctx : DbContext) : int list option =
        query {
                for dest in ctx.Dbo.OriginDestinations do
                where (dest.OriginLocationId = origId)
                select dest.DestinationLocationId
        } |> someOrNone
    let updateLocationDespatchLocations locId (despatchlocationIds : int list) (ctx : DbContext) =
        match getLocationDespatchLocationsByOriginId locId ctx with
        |None   -> despatchlocationIds |> List.iter (fun id ->
                          let deptchLoc = ctx.Dbo.OriginDestinations.Create()
                          deptchLoc.DestinationLocationId <- id
                          deptchLoc.OriginLocationId <- locId
                          ctx.SubmitUpdates())
                   Some locId
        |Some l -> ( despatchlocationIds |> List.except l )
                   |> List.iter (fun id ->
                          let deptchLoc = ctx.Dbo.OriginDestinations.Create()
                          deptchLoc.DestinationLocationId <- id
                          deptchLoc.OriginLocationId <- locId
                          ctx.SubmitUpdates())
                   Some locId

    let getDespatchLocationsForLocation (locId:int) (ctx : DbContext) =
        query {
            for dest in ctx.Dbo.OriginDestinations do
            join loc in ctx.Dbo.Location on (dest.DestinationLocationId = loc.LocationId)
            where (dest.OriginLocationId = locId)
            select loc
        } |> Seq.map (fun l -> {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } })
          |> Seq.sortBy (fun l -> l.Name) |> someOrNone

    let getLocationByName (locName : string) (ctx : DbContext) =
        query {
            for l in ctx.Dbo.Location do
            for f in (!!) l.``dbo.LabelFormats by FormatId`` do // left join to LabelFormats
            where (l.Name = locName)
            select (l,f)
        } |> firstOrNone
          |> Option.map (fun (l,f) -> {Location.Name= l.Name; LocationId=l.LocationId; PrinterIp = l.PrinterIp; LabelFormat= {FormatId=f.FormatId ;Name=f.Name}})

    let getPrinterIpAndFormat (locName : string) (ctx : DbContext) =
        let data =
            query {
                for l in ctx.Dbo.Location do
                join f in ctx.Dbo.LabelFormats on (l.LabelFmt = f.FormatId)
                where (l.Name = locName)
                select (l.PrinterIp,f.Template)
            } |> firstOrNone
        data
    // let getLabelFormatString (locName : string) (ctx : DbContext) =
    //     let fmt =
    //         query {
    //             for l in ctx.Dbo.Location do
    //             join f in ctx.Dbo.LabelFormats on (l.LabelFmt = f.LabelFmtId)
    //             where (l.Name = locName)
    //             select f.Template
    //         } |> firstOrNone
    //     if ((fmt.IsNone) || fmt.Value = "") then None else fmt

module Box =

    let getBoxEntity id (ctx: DbContext) =
        query {
            for b in ctx.Dbo.Box do
            where (b.BoxId= id)
            select b
        } |> firstOrNone

    let auditBox (box:Box) (ctx: DbContext) =
        let ba = ctx.Dbo.BoxAudit.Create()
        ba.BoxId <- box.BoxId
        ba.Description <- box.Description
        ba.Destination <- box.Destination.Name
        if (Operators.box box.LastLocation <> null) then ba.LastLocation <- box.LastLocation.Name
        if box.ParentBoxId.IsSome then match getBoxEntity (box.ParentBoxId.Value) ctx with
                                       |None -> ()
                                       |Some pb -> ba.ParentBox <- pb.Description
        ba.User <- box.User //rename
        ba.Status <- box.Status
        ba.Event <- box.Event
        ba.TrackingAuditId <- box.TrackingAuditId
        //ba.GpsLocation <- box.
        ba.BoxType <- box.BoxType
        ba.DateTime <- DateTime.Now
        ctx.SubmitUpdates()

    let getBoxTypes (ctx: DbContext) =
        query { for t in ctx.Dbo.BoxType do
                select {BoxType = t.BoxType }}
        |> List.ofSeq

    let getBoxes locationId un (ctx: DbContext) =
        let boxes = 
            query {  for b in ctx.Dbo.Box do
                     join d in ctx.Dbo.Location on (b.Destination = d.LocationId)
                     join ll in ctx.Dbo.Location on (b.LastLocation = ll.LocationId)
                     //join boxTyp in ctx.Dbo.BoxType on (b.BoxType = boxTyp.BoxType) // to exclude 'Transient Boxes'
                     join userlocs in ctx.Dbo.UserLocation on (ll.LocationId = userlocs.LocationId)
                     join user in ctx.Dbo.User on (userlocs.UserId = user.UserId)
                     where ((((%locationPredicate locationId) d) || ((%locationPredicate locationId) ll)) && ((%userPredicate un) user) && (b.BoxType <> "Transient Box"))
                     select ( b,d, ll)
            } |> Seq.map (fun (b,d,ll) ->
                                let destination = {Location.LocationId = d.LocationId; Name = d.Name; PrinterIp = d.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                                let lastLocation = {Location.LocationId = ll.LocationId; Name = ll.Name; PrinterIp = ll.PrinterIp; LabelFormat = { FormatId = 0; Name = "" }  }
                                {   BoxId = b.BoxId
                                    ParentBoxId = b.ParentBoxId |> ifZeroNone //|> Option.create
                                    BoxType = b.BoxType
                                    Description = b.Description
                                    LastLocation = lastLocation
                                    Destination = destination
                                    LastMoved = b.LastMoved
                                    User = b.User
                                    Status = b.Status
                                    Event = b.Event
                                    TrackingAuditId = b.TrackingAuditId
                                })
            |> Array.ofSeq
        boxes


    let getBoxesByLocationId id (ctx: DbContext) =
        query {  for b in ctx.Dbo.Box do
                 join d in ctx.Dbo.Location on (b.Destination = d.LocationId)
                 join ll in ctx.Dbo.Location on (b.LastLocation = ll.LocationId)
                 where (ll.LocationId = id)
                 select (b, ll , d)
        } |> Seq.map (fun (b,ll, d) ->
                            let destination = { Location.LocationId = d.LocationId; Name = d.Name; PrinterIp = d.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                            let lastLocation = { Location.LocationId = ll.LocationId; Name = ll.Name; PrinterIp = ll.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                            {   BoxId = b.BoxId
                                ParentBoxId = b.ParentBoxId |> ifZeroNone //|> Option.create
                                BoxType = b.BoxType
                                Description = b.Description
                                LastLocation = lastLocation
                                Destination = destination
                                LastMoved = b.LastMoved
                                User = b.User
                                Status = b.Status
                                Event = b.Event
                                TrackingAuditId = b.TrackingAuditId
                            })
          |> List.ofSeq

    let getBoxByBoxId (id : int) (ctx : DbContext) =
        query {
            for b in ctx.Dbo.Box do
            join d in ctx.Dbo.Location on (b.Destination = d.LocationId)
            join ll in ctx.Dbo.Location on (b.LastLocation = ll.LocationId)
            where ( b.BoxId = id )
            select (b,ll,d)
        } |> firstOrNone
          |> Option.map (fun (b,ll,d) ->
                            let destination = {Location.LocationId = d.LocationId; Name = d.Name; PrinterIp = d.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                            let lastLocation = {Location.LocationId = ll.LocationId; Name = ll.Name; PrinterIp = ll.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                            {   BoxId = b.BoxId
                                ParentBoxId = b.ParentBoxId |> ifZeroNone //|> Option.create
                                BoxType = b.BoxType
                                Description = b.Description
                                LastLocation = lastLocation
                                Destination = destination
                                LastMoved = b.LastMoved
                                User = b.User
                                Status = b.Status
                                Event = b.Event
                                TrackingAuditId = b.TrackingAuditId
                            })

    let getChildBoxesByBoxId (id : int) (ctx : DbContext) =
        query {
            for b in ctx.Dbo.Box do
            join d in ctx.Dbo.Location on (b.Destination = d.LocationId)
            join ll in ctx.Dbo.Location on (b.LastLocation = ll.LocationId)
            where (b.ParentBoxId = id)
            select (b,ll,d) }
        |> Seq.map (fun (b,ll,d)  ->
                            let destination = {Location.LocationId = d.LocationId; Name = d.Name; PrinterIp = d.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                            let lastLocation = {Location.LocationId = ll.LocationId; Name = ll.Name; PrinterIp = ll.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                            {   BoxId = b.BoxId
                                ParentBoxId = b.ParentBoxId |> ifZeroNone //|> Option.create
                                BoxType = b.BoxType
                                Description = b.Description
                                LastLocation = lastLocation
                                Destination = destination
                                LastMoved = b.LastMoved
                                User = b.User
                                Status = b.Status
                                Event = b.Event
                                TrackingAuditId = b.TrackingAuditId
                            }
                    )
        |> List.ofSeq

    let upsertBox (box : Box) (ctx : DbContext) =
        let b =
            match getBoxEntity box.BoxId ctx with
            |None -> let b = ctx.Dbo.Box.Create()
                     (* only set these when creating the box due to the odd 6:30 AM bug.
                      * split up this repo moethod into insert, update and move Box
                      * if this sorts out the problem
                      *)
                     b.BoxType <- box.BoxType
                     b.Description <- box.Description
                     b
            |Some b-> b
        (*if box transitions from !BeingPacked -> BeingPacked; generate new TrackingAuditId, and store in Box row.*)
        match b.Status = "BeingPacked" , box.Status = "BeingPacked" with
        |true,_  -> ()
        |false,true -> b.TrackingAuditId <- genPseudoID ()
        |_          -> b.TrackingAuditId <- "" //blank it
        //if (box.ParentBoxId.IsNone) then b.SetColumn("ParentBoxId", null |> Operators.box) else b.ParentBoxId <- box.ParentBoxId.Value
        match box.ParentBoxId with
        |None -> b.SetColumn("ParentBoxId", null )//|> Operators.box)
        |Some v -> b.ParentBoxId <- v
        if (Operators.box (box.Destination) <> null)  then  b.Destination <- box.Destination.LocationId
        if (Operators.box (box.LastLocation) <> null) then  b.LastLocation <- box.LastLocation.LocationId
        
        b.LastMoved <- box.LastMoved //DateTime.Now
        b.User <- box.User
        b.Status <- box.Status
        b.Event <- box.Event
        printfn "Box - %A" box
        ctx.SubmitUpdates()
        printfn "saved box"
        //let ctx = getCtxt( ctx.CreateConnection().ConnectionString )
        let ctx = getCtxt ( config.["connxn"] )
        auditBox {box with BoxId = b.BoxId; TrackingAuditId = b.TrackingAuditId} ctx
        printfn "returned from audit"
        {box with BoxId = b.BoxId; TrackingAuditId = b.TrackingAuditId}

module Container =
    let getContainerTypes (ctx: DbContext) =
        query { for ct in ctx.Dbo.ContainerType do
                select ct}
        |> List.ofSeq |> List.map (fun ct -> ct.MapTo<ContainerType>())

    let getContainers locationId un (ctx: DbContext) =
        query {  for c in ctx.Dbo.Container do
                 join l in ctx.Dbo.Location on (c.Location = l.LocationId)
                 join ul in ctx.Dbo.UserLocation on (l.LocationId = ul.LocationId)
                 join u in ctx.Dbo.User on (ul.UserId = u.UserId)
                 where ( ((%locationPredicate locationId) l) && ((%userPredicate un) u) )
                 select ( c, l)
        } |> Seq.map (fun (c,l) -> let location = {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                                   {    ContainerId = c.ContainerId
                                        ContainerType = c.ContainerType
                                        Description = c.Description
                                        Location = location
                                   })
        |> List.ofSeq
    let getContainerEntity id (ctx: DbContext) =
        query {
            for c in ctx.Dbo.Container do
            where (c.ContainerId= id)
            select c
        } |> firstOrNone

    let getContainersByLocationId id (ctx: DbContext) =
        query {  for c in ctx.Dbo.Container do
                 join l in ctx.Dbo.Location on (c.Location = l.LocationId)
                 where (l.LocationId = id)
                 select ( c, l)
        } |> Seq.map (fun (c,l) -> let location =  {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                                   {    ContainerId = c.ContainerId
                                        ContainerType = c.ContainerType
                                        Description = c.Description
                                        Location = location
                                   })
          |> List.ofSeq

    let upsertContainer (cntnr : Container) (ctx : DbContext) =
        let c =
            match getContainerEntity cntnr.ContainerId ctx with
            |None -> let c = ctx.Dbo.Container.Create()
                     c
            |Some c-> c
        c.ContainerType <- cntnr.ContainerType
        c.Description <- cntnr.Description
        c.Location <- cntnr.Location.LocationId
        ctx.SubmitUpdates()
        c.ContainerId

module Rack =

    let getRackEntity id (ctx: DbContext) =
        query {
            for r in ctx.Dbo.Rack do
            where (r.RackId = id)
            select r
        } |> firstOrNone

    let getRacks locationId un (ctx: DbContext) =
        query {
                 for u in ctx.Dbo.User do
                 join ul in ctx.Dbo.UserLocation on (u.UserId = ul.UserId)
                 join l in ctx.Dbo.Location on (ul.LocationId = l.LocationId)
                 //join c in ctx.Dbo.Container on (l.LocationId = c.Location)
                 for c in (!!) l.``dbo.Container by LocationId`` do
                 for r in (!!) c.``dbo.Rack by ContainerId`` do
                 where (((%locationPredicate locationId) l ) && (c.ContainerType <> "Analyser") && ((%userPredicate un) u))
                 select (r,c,l)
        } |> Seq.map (fun (r,c,l) ->
                                let location = {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                                {   ContainerId = c.ContainerId
                                    ContainerType = c.ContainerType
                                    Description = c.Description
                                    Location = location
                                },
                                { Rack.RackId = r.RackId
                                  Description = r.Description
                                  ContainerId = r.ContainerId
                                  Rows = r.Rows //|> ifNullNone
                                  Cols = r.Cols //|> ifNullNone
                                  Status = r.Status
                                })
          |> Seq.groupBy(fun(c,r) -> c )
          |> Seq.map (fun (c,(group)) ->
                    let racks = group |> Seq.map snd |> Seq.filter (fun (r:Rack) -> r.RackId > 0)
                    {ContainerRack.Container = c; Racks = racks |> List.ofSeq})
          |> List.ofSeq

    let getRacksByContainerId containerId (ctx: DbContext) =
        query { for c in ctx.Dbo.Container do
                join l in ctx.Dbo.Location on (c.Location = l.LocationId)
                for r in (!!) c.``dbo.Rack by ContainerId`` do
                where (c.ContainerId = containerId)
                select (r,c,l)
             }|> Seq.map (fun (r,c,l) ->
                                    let location = {Location.LocationId = l.LocationId; Name = l.Name; PrinterIp = l.PrinterIp ; LabelFormat = { FormatId = 0; Name = "" } }
                                    {   ContainerId = c.ContainerId
                                        ContainerType = c.ContainerType
                                        Description = c.Description
                                        Location = location
                                    },
                                    { Rack.RackId = r.RackId
                                      Description = r.Description
                                      ContainerId = r.ContainerId
                                      Rows = r.Rows //|> ifNullNone
                                      Cols = r.Cols //|> ifNullNone
                                      Status = r.Status
                                    })
              |> Seq.groupBy(fun(c,r) -> c )
              |> Seq.map (fun (c,(group)) ->
                                let racks = group |> Seq.map snd |> Seq.filter (fun (r:Rack) -> r.RackId > 0)
                                {ContainerRack.Container = c; Racks = racks |> List.ofSeq})
              |> List.ofSeq

    let getRackByRackId rackId (ctx : DbContext ) =
        query {
            for r in ctx.Dbo.Rack do
            where (r.RackId = rackId)
            select r
        } |> firstOrNone |> Option.map (fun r -> r.MapTo<Rack>())

    let upsertRack (rak : Rack) (ctx : DbContext) =
        let r =
            match getRackEntity rak.RackId ctx with
            |None -> let r = ctx.Dbo.Rack.Create()
                     r
            |Some r-> r
        r.Status <- rak.Status
        //r.Description <- rak.Description
        r.ContainerId <- rak.ContainerId
        r.Rows <- rak.Rows
        r.Cols <- rak.Cols
        ctx.SubmitUpdates()
        r.RackId

module Sample =
    let auditSample (ctx:DbContext) (smp : Sample) =
        let sa = ctx.Dbo.SampleAudit.Create()
        sa.SampleNo <- smp.SampleNo
        sa.SampTypeSuffix <- smp.SampTypeSuffix
        if smp.BoxId > 0 then match Box.getBoxEntity smp.BoxId ctx with
                               |None -> ()
                               |Some b -> sa.Box <- b.Description
        
        if smp.RackId > 0 then match Rack.getRackByRackId smp.RackId ctx with
                               |None -> ()
                               |Some r -> sa.Rack <- r.Description
                                          match Container.getContainerEntity r.ContainerId ctx with
                                          |Some cnt -> sa.Box <- cnt.Description
                                          |None     -> ()

        sa.SampleId <- smp.SampleId
        sa.ColId <- smp.Col
        sa.RowId <- smp.Row
        sa.Event <- smp.Event
        sa.TrackingAuditId <- smp.TrackingAuditId
        sa.User <- smp.User
        sa.DateTime <- DateTime.Now
        ctx.SubmitUpdates()

    let getSampleEntity id (ctx:DbContext) =
        query {
            for s in ctx.Dbo.Sample do
            where (s.SampleId = id)
            select s
        } |> firstOrNone

    let getSample id (ctx:DbContext) =
        query {
            for s in ctx.Dbo.Sample do
            join smptyp in ctx.Dbo.SampleTypes on (s.SampTypeSuffix = smptyp.SampTypeSuffix)
            where (s.SampleId = id)
            select {
                    Sample.SampleId = s.SampleId
                    SampleNo = s.SampleNo
                    SampTypeSuffix = s.SampTypeSuffix
                    User = s.User
                    Row = s.RowId
                    Col = s.ColId
                    RackId = s.RackId
                    BoxId = s.BoxId
                    SampleType = smptyp.SampTypeDesc
                    DateTime = s.DateTime
                    Event = s.Event
                    TrackingAuditId = s.TrackingAuditId
                }
        } |> firstOrNone

    let getSamplesByRackId id (ctx: DbContext) =
        query {
            for smp in ctx.Dbo.Sample do
            join smptyp in ctx.Dbo.SampleTypes on (smp.SampTypeSuffix = smptyp.SampTypeSuffix)
            where (smp.RackId = id)
            select (smp, smptyp.SampTypeDesc)
        } |> Seq.map (fun (s,typ) -> {
                                        Sample.SampleId = s.SampleId
                                        SampleNo = s.SampleNo
                                        SampTypeSuffix = s.SampTypeSuffix
                                        User = s.User
                                        Row = s.RowId
                                        Col = s.ColId
                                        RackId = s.RackId
                                        BoxId = s.BoxId
                                        SampleType = typ
                                        DateTime = s.DateTime
                                        Event = s.Event
                                        TrackingAuditId = s.TrackingAuditId
                                    })
          |> List.ofSeq |> List.sortBy (fun s -> s.Row, s.Col)

    let getSamplesByBoxId id (ctx: DbContext) =
        query {
            for smp in ctx.Dbo.Sample do
            join smptyp in ctx.Dbo.SampleTypes on (smp.SampTypeSuffix = smptyp.SampTypeSuffix)
            where (smp.BoxId = id)
            select (smp, smptyp.SampTypeDesc)
        } |> Seq.map (fun (s,typ) -> {
                                        Sample.SampleId = s.SampleId
                                        SampleNo = s.SampleNo
                                        SampTypeSuffix = s.SampTypeSuffix
                                        User = s.User
                                        Row = s.RowId
                                        Col = s.ColId
                                        RackId = s.RackId
                                        BoxId = s.BoxId
                                        SampleType = typ
                                        DateTime = s.DateTime
                                        Event = s.Event
                                        TrackingAuditId = s.TrackingAuditId
                                    })
          |> List.ofSeq |> List.sortBy (fun s -> s.Row, s.Col)

    let getAllSamplesByBox boxid (ctx : DbContext) =
        let boxSamples = getSamplesByBoxId boxid ctx
        let childBoxSamples =
            Box.getChildBoxesByBoxId boxid ctx
            |> List.map (fun childbox -> getSamplesByBoxId childbox.BoxId ctx) |> List.concat
        boxSamples @ childBoxSamples

    let upsertSample (smp:Sample) (ctx:DbContext) =
      try
        let s =
            match getSampleEntity smp.SampleId ctx with
            |None  -> let s = ctx.Dbo.Sample.Create()
                      s
            |Some s-> s //update
        if smp.BoxId  > 0 then s.BoxId <- smp.BoxId
        if smp.RackId > 0 then s.RackId <- smp.RackId
        s.ColId <- smp.Col
        s.DateTime <- DateTime.Now
        s.Event <- smp.Event
        s.TrackingAuditId <- smp.TrackingAuditId
        s.RowId <- smp.Row
        s.SampTypeSuffix <- smp.SampTypeSuffix
        s.SampleNo <- smp.SampleNo
        s.User <- smp.User
        ctx.SubmitUpdates()
        auditSample ctx { smp with SampleId = s.SampleId }
        s.SampleId
      with
      |e -> printfn "upsertSample %s - %A" e.Message smp
            smp.SampleId
    let unpackSample (smp:Sample) (ctx:DbContext) =
        //let barcode = sprintf "%s%s" smp.SampleNo (smp.SampTypeSuffix.ToString())
        let checkedDestination = try
                                    config.["checkedDestination"] |> int //ConfigurationManager.AppSettings.Get("checkedDestination") |> int
                                 with
                                 |_ -> 63
        //LocationID	Name	                        Site	RoleID
        //292	        Halo Level 0 - Sample Receipt	HALO	24
        //TK : Sort out SP in GLP-SERVER, to format sample type/sampleno
        try
          let s =
              query {
                  for s in ctx.Dbo.Sample do
                  join b in ctx.Dbo.Box on (s.BoxId = b.BoxId)
                  where ((s.SampleNo = smp.SampleNo) && (s.SampTypeSuffix = smp.SampTypeSuffix) && (b.Destination = checkedDestination))// && (b.Status = "InTransit")) -- requires DA systems to have implemented their end
                  select s
              } |> firstOrNone
          match s with
          |None -> None
          |Some(s) ->
              let event = sprintf "Unpacked from boxid %i GLP track @ %s %s" (s.BoxId) (DateTime.Now.ToShortDateString()) (DateTime.Now.ToShortTimeString())
              //s.Event <- event
              auditSample ctx { smp with Event = event; User = "GLP"; BoxId=s.BoxId }
              s.Delete()
              ctx.SubmitUpdates()
              Some(s.SampleId)
        with
        |e -> printfn "unpackSample %s - %A" (e.Message) smp
              None

    let deleteSample smpId (ctx:DbContext) =
      try
        let s = getSampleEntity smpId ctx
        match s with
        |None -> None
        |Some s ->
            //let smp = (getSample smpId ctx).Value
            //auditSample smp ctx
            s.Delete()
            ctx.SubmitUpdates()
            Some smpId
      with |e -> printfn "deleteSample %s - %i" (e.Message) smpId
                 None

    let moveBoxSamples (startBoxId:int) (endBoxId: int) (user:string) (ctx: DbContext) =
        //let samples = query {
        //        for s in ctx.Dbo.Sample do
        //        where (s.BoxId = startBoxId)
        //        select s
        //}
        let endBox = Box.getBoxByBoxId endBoxId ctx // then the parent of this one.
        match endBox with
        |None -> failwith "bad"
        |Some endBox ->
        let parentBox = Box.getBoxByBoxId (endBox.ParentBoxId.Value) ctx 
        let samples = getSamplesByBoxId startBoxId ctx
        let evt = sprintf "Fixed box %i packed in box %s" startBoxId  (if (parentBox.IsSome) then (parentBox.Value.Description) else "")
        let trackingAuditId = match parentBox with
                              |None -> ""
                              |Some b -> b.TrackingAuditId //update the trackingAuditId to that of the parent
        samples |> Seq.iter (fun s -> upsertSample { s with BoxId = endBoxId; User = user; Event = evt; TrackingAuditId = trackingAuditId } ctx |> ignore )

module Audit =
    //open System.Linq

    let getSampleAudits (smpno : string) (ctx:DbContext) =
        let audits =
            query {
                for aud in ctx.Dbo.SampleAudit do
                join smptyp in ctx.Dbo.SampleTypes on (aud.SampTypeSuffix = smptyp.SampTypeSuffix)
                where (aud.SampleNo = smpno)
                sortBy aud.SampleId
                select {
                        SampleAuditId = 0
                        SampleId = aud.SampleId
                        SampleNo = aud.SampleNo
                        SampTypeSuffix = aud.SampTypeSuffix
                        User = aud.User
                        Row = aud.RowId
                        Col = aud.ColId
                        Rack = aud.Rack
                        RackId = 0
                        Box = aud.Box
                        BoxId = 0
                        SampleType = smptyp.SampTypeDesc
                        DateTime = aud.DateTime
                        Event = aud.Event
                        IsCurrent = false
                     }
            } |> List.ofSeq
        (*
        let current =
             query {
                 for s in ctx.Dbo.Sample do
                 join smptyp in ctx.Dbo.SampleTypes on (s.SampTypeSuffix = smptyp.SampTypeSuffix)
                 for r in (!!) s.``dbo.Rack by RackId`` do   //left join to rack to get description
                 for b in (!!) s.``dbo.Box by BoxId`` do     //left join to box to get description
                 for c in (!!) r.``dbo.Container by ContainerId`` do
                 where (s.SampleNo = smpno)
                 select {
                             SampleAuditId = s.SampleId
                             SampleId = s.SampleId
                             SampleNo = s.SampleNo
                             SampTypeSuffix = s.SampTypeSuffix
                             User = s.User
                             Row = s.RowId
                             Col = s.ColId
                             Rack = r.Description
                             RackId = r.RackId
                             Box = if (Operators.box r.RackId = null) then b.Description else c.Description
                             BoxId = b.BoxId
                             SampleType = smptyp.SampTypeDesc
                             DateTime = s.DateTime
                             Event = s.Event
                             IsCurrent = true
                      }
             } |> List.ofSeq

        current @ audits |> List.distinctBy (fun aud ->
            sprintf "%s%s%i%i%i%i"
              aud.Event
              (aud.DateTime.ToString())
              aud.Row
              aud.Col
              aud.SampleId
              aud.SampTypeSuffix) |> List.sortByDescending (fun s -> s.DateTime) *)
        audits |> List.sortByDescending (fun s -> s.DateTime)
    let getBoxAudits boxid (ctx:DbContext) =
        let audits =
            query {
                for ba in ctx.Dbo.BoxAudit do
                where (ba.BoxId = boxid)
                sortByDescending ba.BoxAuditId
                select {BoxId = ba.BoxId
                        ParentBox = ba.ParentBox
                        Description = ba.Description
                        LastLocation = ba.LastLocation
                        Destination = ba.Destination
                        DateTime = ba.DateTime
                        User = ba.User
                        Status = ba.Status
                        Event = ba.Event
                        TrackingAuditId = ba.TrackingAuditId
                }
            }
            |> List.ofSeq //|> List.sortByDescending (fun ba -> ba.DateTime)
        audits

    let getSampleAuditsByTrackingId trackingId (ctx:DbContext) =
        query {
            for aud in ctx.Dbo.SampleAudit do
            join smptyp in ctx.Dbo.SampleTypes on (aud.SampTypeSuffix = smptyp.SampTypeSuffix)
            where (aud.TrackingAuditId = trackingId && aud.TrackingAuditId <> "")
            sortBy aud.SampleAuditId
            select {
                    SampleAuditId = aud.SampleAuditId
                    SampleId = aud.SampleId
                    SampleNo = aud.SampleNo
                    SampTypeSuffix = aud.SampTypeSuffix
                    User = aud.User
                    Row = aud.RowId
                    Col = aud.ColId
                    Rack = aud.Rack
                    RackId = 0
                    Box = aud.Box
                    BoxId = 0
                    SampleType = smptyp.SampTypeDesc
                    DateTime = aud.DateTime
                    Event = aud.Event
                    IsCurrent = false
                 }
        } |> List.ofSeq
