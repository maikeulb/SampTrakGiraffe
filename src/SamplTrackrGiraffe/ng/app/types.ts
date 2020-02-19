export class User {
    UserId : number
    Email: string
    DisplayName : string
    ShortName : string
    IsAdmin : boolean
    Locations : Location []
    SiteMembership : SiteMembership []
    editable : boolean
}

export class LabelFormat {
    FormatId: number
    Name: string
}

export class Location {
    LocationId : number
    Name : string
    PrinterIp: string
    LabelFormat: LabelFormat
    editable: boolean
}

export class LocationMembership {
    LocationId : number
    Name:string
    IsMember : boolean
}

export class Site {
    Name : string
    Description : string
    Locations : Location []
}

export class SiteMembership  {
    Name : string
    Description : string
    LocationMembership : LocationMembership []
}

export class LocationsDespatchLocation  {
  LocationId: number
  Name: string
  PrinterIp: string
  LabelFormat: LabelFormat
  //DespatchLocationIds : number []
  DespatchLocations: SiteMembership[]
  editable : boolean
}

export class SiteLocationsDespatchLocation {
  SiteId: number
  Name: string
  Description: string
  //Locations : Location []
  LocationsDespatchLocations: LocationsDespatchLocation[] //TK - refactor all arrays to list. ?
}

export class ContainerType {
    ContainerType: string
    Temperature: number
    //status ?
}

export class Container {
    ContainerId : number
    ContainerType : string
    Description : string
    Location : Location
    editable: boolean
}

export class BoxType {
    BoxType : string
}

export class Box  {
    BoxId: number
    ParentBoxId? : number | null
    BoxType: string
    Description: string
    LastLocation: Location
    Destination: Location
    LastMoved: Date
    User: string
    Status: string
    Event : string
    TrackingAuditId : string
    editable: boolean
}

export class BoxAudit  {
    BoxId : number
    ParentBox : string
    Description : string
    LastLocation : string
    Destination : string
    DateTime : Date
    User : string
    Status : string
    Event: string
    TrackingAuditId : string
}

export class Rack  {
    RackId: number
    Description: string
    Rows: number
    Cols: number
    ContainerId : number
    Status: string
    editable: boolean
}

export class Sample {
    SampleId: number
    SampleNo: string
    SampTypeSuffix: number
    RackId?: number | null
    BoxId?: number | null
    Row: number
    Col: number
    SampleType:string
    DateTime: Date
    Event: string
    TrackingAuditId : string
}

export class SampleAudit  {
    SampleAuditId:number
    SampleId:number
    SampleNo:string
    SampTypeSuffix:number
    User : string
    Rack:string
    RackId?: number | null
    Box:string
    BoxId?: number | null
    Row:number
    Col:number
    SampleType:string
    DateTime:Date// ? option
    Event:string
    IsCurrent:boolean
}

export class ContainerRack  {
    Container: Container
    Racks: Rack []
}

export class Position {
    Col: number
    Row: number
}

export class Context {
  Username: string
  LocationId: number
  Location: string
  Admin: boolean
  Context: boolean
}
