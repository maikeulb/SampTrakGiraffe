module Tdl.Pathology.SampTracker.Cookie

open System.IO

type CookieSerialiser =
  abstract serialise : Map<string, obj> -> byte []
  abstract deserialise : byte [] -> Map<string, obj>

open System.Runtime.Serialization.Formatters.Binary

type BinaryFormatterSerialiser() =
  //interface CookieSerialiser with
    member x.serialise m =
      use ms = new MemoryStream()
      let f = new BinaryFormatter()
      f.Serialize(ms, m)
      ms.ToArray()

    member x.deserialise (data : byte []) =
      use ms = new MemoryStream(data)
      let f = new BinaryFormatter()
      f.Deserialize ms :?> _

