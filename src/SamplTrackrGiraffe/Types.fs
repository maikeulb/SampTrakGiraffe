module Tdl.Pathology.SampTracker.Types
open System

[<CLIMutable>]
type Logon = {
    Username: string
    Password: string
    Location: string
}

type LabelFormat = {
    FormatId : int
    Name : string
}
[<CLIMutable>]
type Location = {
    LocationId : int
    Name:string
    PrinterIp : string
    //Description: string
    LabelFormat : LabelFormat
}

type LocationMembership = {
    LocationId : int
    Name:string
    IsMember : bool
}

type Site = {
    SiteId : int
    Name : string
    Description : string
    Locations : Location [] //TK - refactor all arrays to list. ?
}

type SiteMembership = {
    Name : string
    Description : string
    LocationMembership : LocationMembership []
}

[<CLIMutable>]
type User = {
    UserId : int
    Email: string
    DisplayName : string
    ShortName : string
    IsAdmin : bool
    Locations : Location []
    SiteMembership : SiteMembership []
    //Sites : Site []
}
[<CLIMutable>]
type RegisterUser = {
    
    Email: string
    DisplayName : string
    ShortName : string
    IsAdmin : bool
    Password: string
    ConfirmPassword: string
    //Sites : Site []
}
[<CLIMutable>]
type ResetRequest = {
    Username: string
}
[<CLIMutable>]
type PasswordChange = {
    Username : string
    Password : string
    ConfirmPassword : string
}
type LocationsDespatchLocation = {
    LocationId : int
    Name:string
    PrinterIp : string
    LabelFormat : LabelFormat
    DespatchLocations : SiteMembership []
}

type SiteLocationsDespatchLocation = {
    SiteId : int
    Name : string
    Description : string
    //Locations : Location []
    LocationsDespatchLocations : LocationsDespatchLocation [] //TK - refactor all arrays to list. ?
}

type Sample = {
    SampleId:int
    SampleNo:string
    SampTypeSuffix:byte
    User : string
    RackId:int
    BoxId:int
    Row:int16//int option
    Col:int16//int option
    SampleType:string
    DateTime:DateTime // ? option
    Event:string
    TrackingAuditId : string
}

type SampleAudit = {
    SampleAuditId:int
    SampleId: int
    SampleNo:string
    SampTypeSuffix:byte
    User : string
    Rack:string
    RackId:int
    Box:string
    BoxId:int
    Row:int16//int option
    Col:int16//int option
    SampleType:string
    DateTime:DateTime // ? option
    Event:string
    IsCurrent : bool
}

type Rack = {
    RackId:int
    Description:string
    Rows:int16
    Cols:int16
    ContainerId:int
    Status:string
    //Samples : Sample list // ? empty
}

type RackSamples = {
    Rack : Rack
    Samples : Sample list
}

type Container = {
    ContainerId : int
    ContainerType : string
    Description : string
    Location : Location
    //LastMoved : DateTime
    //MovedBy : string
    //Racks : Rack list
    //Containers : Container list //could be empty[]
}

type Box = {
    BoxId : int
    ParentBoxId : int option
    BoxType : string
    Description : string
    LastLocation : Location
    Destination : Location
    LastMoved : DateTime
    User : string
    Status : string
    Event: string
    TrackingAuditId : string
    //Racks : Rack list
    //Containers : Container list //could be empty[]
}

type BoxAudit = {
    BoxId : int
    ParentBox : string
    Description : string
    LastLocation : string
    Destination : string
    DateTime : DateTime
    User : string
    Status : string
    Event: string
    TrackingAuditId : string
    //Racks : Rack list
    //Containers : Container list //could be empty[]
}

type CourierContainer = {
        ContainerId:int
        LastMoved :Nullable<System.DateTime>
        MovedBy:string
        status:string
        GPSLat:int
        GPSLon:int
}
type BoxType = {
   BoxType : string 
}

type ContainerRack = {
    Container : Container
    Racks : Rack list
    //Containers : ContainerRack list
}

type ContainerType = {
    ContainerType : string
    Temperature : int
    //status ?
}
