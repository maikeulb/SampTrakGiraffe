module Giraffe.DotLiquid

open System.IO
open System.Text
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open DotLiquid
//open Giraffe.Common
open FSharp.Control.Tasks.V2
open System.Collections.Generic
open Microsoft.FSharp.Reflection
open System.Collections.Concurrent
open DotLiquid.NamingConventions
open Microsoft.FSharp.Control

module Async = 
    let map f xAsync = async {
        // get the contents of xAsync 
        let! x = xAsync 
        // apply the function and lift the result
        return f x
        }

module internal Impl =

  /// Protects accesses to various DotLiquid internal things
  let safe =
    let o = obj()
    fun f -> lock o f

  open System.Reflection

  /// Given a type which is an F# record containing seq<_>, list<_>, array<_>, option and 
  /// other records, register the type with DotLiquid so that its fields are accessible
  let tryRegisterTypeTree =
    let registered = Dictionary<_, _>()
    let rec loop ty =
      if not (registered.ContainsKey ty) then
        if FSharpType.IsRecord ty then
          let fields = FSharpType.GetRecordFields ty
          Template.RegisterSafeType(ty, [| for f in fields -> f.Name |])
          for f in fields do loop f.PropertyType
        elif ty.IsGenericType then
          let t = ty.GetGenericTypeDefinition()
          if t = typedefof<seq<_>> || t = typedefof<list<_>>  then
            loop (ty.GetGenericArguments().[0])          
          elif t = typedefof<option<_>> then
            Template.RegisterSafeType(ty, [|"Value"|])
            loop (ty.GetGenericArguments().[0])     
        elif ty.IsArray then          
          loop (ty.GetElementType())
        registered.[ty] <- true
    fun ty -> safe (fun () -> loop ty)
  type Renderer<'model> = string -> 'model -> string
  let parseTemplate template typ : Renderer<'m> =
      tryRegisterTypeTree typ
      let t = Template.Parse template
      fun k v ->
        dict [k, box v] |> Hash.FromDictionary |> t.Render
  // -------------------------------------------------------------------------------------------------
  // Parsing and loading DotLiquid templates and caching the results
  // -------------------------------------------------------------------------------------------------
  /// Memoize asynchronous function. An item is recomputed when `isValid` returns `false`
  let asyncMemoize isValid f =
      let cache = ConcurrentDictionary<_ , _>()
      fun x -> async {
      match cache.TryGetValue x with
      | true, res when isValid x res ->
          return res

      | _ ->
          let! res = f x
          cache.[x] <- res
          return res
      }
  /// Asynchronously loads a template & remembers the last write time
  /// (so that we can automatically reload the template when file changes)
  let fileTemplate (typ, fileName) = async {
        let writeTime = File.GetLastWriteTime fileName
        use file = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite)
        use reader = new StreamReader(file)
        let! dotLiquidTemplate = reader.ReadToEndAsync() |> Async.AwaitTask
        return writeTime, parseTemplate dotLiquidTemplate typ
    }

  /// Load template & memoize & automatically reload when the file changes
  let fileTemplateMemoized =
        fileTemplate
        |> asyncMemoize (fun (_, templatePath) (lastWrite, _) ->
           File.GetLastWriteTime templatePath <= lastWrite)

// -------------------------------------------------------------------------------------------------
// Public API
// -------------------------------------------------------------------------------------------------

//let mutable private templatesDir = None

/// The model you pass to your liquid templates will be available under this
/// key.
[<Literal>]
let ModelKey = "model"

/// Renders the liquid template given a full path.
let renderPageFile fileFullPath (model : 'm) =
  Impl.fileTemplateMemoized (typeof<'m>, fileFullPath)
  |> Async.map (fun (writeTime, renderer) ->
    renderer ModelKey (box model))

/// Render a page using DotLiquid template. Takes a path (relative to the directory specified
/// using `setTemplatesDir` and a value that is exposed as the "model" variable. You can use
/// any F# record type, seq<_>, list<_>, and array<_>  and option without having to explicitly 
/// register the fields.
///
///     type Page = { Total : int }
///     let app = page "index.html" { Total = 42 }
///

/// Renders a model and a template with the DotLiquid template engine and sets the HTTP response
/// with the compiled output as well as the Content-Type HTTP header to the given value.
let dotLiquid (contentType : string) (template : string) (model) : HttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        printfn "%A" model
        Impl.tryRegisterTypeTree (model.GetType())
        task {
            let! rendered = renderPageFile template model
            let bytes = rendered |> Encoding.UTF8.GetBytes
            return! ctx.WriteBytesAsync bytes //next ctx
        }


/// Reads a dotLiquid template file from disk and compiles it with the given model and sets
/// the compiled output as well as the given contentType as the HTTP response.
let dotLiquidTemplate (contentType : string) (templatePath : string) (model) : HttpHandler =
    fun (next : HttpFunc) (ctx : HttpContext) ->
        task {
            let env = ctx.RequestServices.GetService<IHostingEnvironment>()
            let path = Path.Combine(env.ContentRootPath, templatePath)
            return! dotLiquid contentType path model next ctx
        }

/// Reads a dotLiquid template file from disk and compiles it with the given model and sets
/// the compiled output as the HTTP response with a Content-Type of text/html.
let dotLiquidHtmlTemplate (templatePath : string) (model) : HttpHandler =
    dotLiquidTemplate "text/html" templatePath model