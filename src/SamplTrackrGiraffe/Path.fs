module Tdl.Pathology.SampTracker.Path

type StringPath = PrintfFormat<(string -> string), unit,string,string,string>
type IntPath =    PrintfFormat<(int    -> string), unit,string,string,int>
type DualIntPath = PrintfFormat<(int -> int -> string), unit,string,string,int*int>
let home = "/"


module Account =
    let logon = "/account/logon"
    let badlogon : StringPath = "/account/logon/%s"
    let logoff = "/account/logoff"
    let register = "/account/register"
    let reset = "/account/reset"
    let location = "/account/location"
    let changePassword : StringPath = "/account/reset/%s"
    let changeMyPassword = "/account/change"
    let health ="/health"
module SampleAudit =
    let sampleaudit : StringPath = "/audit/%s"

module Api =
    ///user api paths
    let userlocations : StringPath= "/api/userlocations/%s"
    let users = "/api/users"
    let user : IntPath = "/api/user/%i"
    ///location api paths    
    let locations = "/api/locations"
    let siteLocationsWithDespathLocations = "/api/despatchlocations"
    let despatchLocationsForLocationId = "/api/despatchlocationsforlocid"
    let despatchLocationsById : IntPath = "/api/despatchlocations/%i"

    let allLocations = "/api/alllocations"
    let locationById : IntPath= "/api/location/%i"
    let locationByName : StringPath= "/api/location/%s"
    
    ///container api paths    
    let containers = "/api/containers"
    let containertypes = "/api/containertypes"
    let containersByLocId : IntPath = "/api/containers/%i"
    ///box api paths
    let boxes = "/api/boxes"
    let boxtypes = "/api/boxtypes"
    let boxesByLocId : IntPath = "/api/boxes/%i"
    let boxesByBoxId : IntPath = "/api/box/%i"
    let childBoxesByBoxId : IntPath = "/api/childboxes/%i"
    let packChildBox = "/api/packchildbox"
    let courierBox : IntPath = "/api/courierbox/%i"
    let moveBoxSamples : DualIntPath = "/api/moveboxsamples/%i/%i"
    let toggleContext : StringPath = "/api/context/%s"
    let context = "/api/context"
    ///rack api paths    
    let racks = "/api/racks"
    let racksByContainerId : IntPath = "/api/racks/%i"
    let rackByRackId : IntPath = "/api/rack/%i"
    ///sample api paths
    let samplesByRackId : IntPath = "/api/racksamples/%i"
    let samplesByBoxId : IntPath = "/api/boxsamples/%i"
    let saveSample = "/api/samples"
    let unpackSample = "/api/unpacksample"
    let sampleOps : IntPath = "/api/sample/%i"
    let sampleAudits : StringPath = "/api/sampleaudit/%s"
    let boxSampleAudits : StringPath = "/api/boxsampleaudits/%s"
    let boxAudits : IntPath = "/api/boxaudit/%i"

    ///barcode
    let barcode : StringPath = "/api/barcode/%s"

    let boxlabel : IntPath = "/api/boxlabel/%i"
