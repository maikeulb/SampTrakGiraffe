module Tdl.Pathology.SampTracker.Utils

open System
open System.Configuration
open System.Collections.Generic
open System.IO
open System.Net
open System.Net.Sockets
open System.Net.Mail
open System.Reflection
//open System.Runtime.Serialization.Json
open System.Text
open Microsoft.AspNetCore.Http

type System.String with
    member x.Chunk(count:int) = let padlen = x.Length + (x.Length % count)
                                seq{ for i in 0 .. count  .. (padlen - count) do
                                        yield x.Substring(i,count)}
    ///Pad right to total length 'len' with spaces; if Longer than 'len', then substring(0,len)
    member x.PadRght(len:int) = if x.Length > len then
                                 x.Substring(0,len)
                                else
                                 x.PadRight(len)
    
    member x.With(newstring:string, start:int) =
        sprintf "%s%s%s" (x.Substring(0,start)) newstring (x.Substring(start + newstring.Length))

let sendMail (emailTo:string,ccTo:string,subject:string,body:string, isHtml:bool, smtpSvr:string )=
    use msg = new MailMessage("Reports@tdlpathology.com",emailTo,subject,body)//from, to, subject, body
    msg.IsBodyHtml <- isHtml
    match ccTo with 
    |"" -> ()
    |_  -> msg.CC.Add(ccTo)
    try 
        //let smtpSvr = ""//ConfigurationManager.AppSettings.Get("smptSvr")
        let client = new SmtpClient(smtpSvr)
        //client.UseDefaultCredentials <- true
        client.Send(msg)
    with
    |e -> printfn "failed sending mail - %s" e.InnerException.Message

let checkPrinterStatus (ip:string) =
    use tcpClient = new TcpClient()
    try
      //(ip,9100)
      match tcpClient.ConnectAsync(ip,9100).Wait(1000) with
      |true ->
        let stream = tcpClient.GetStream()
        let data = (System.Text.Encoding.UTF8.GetBytes("~HS"))
        stream.Write(data,0, data.Length)
        let resp = Array.create 80 32uy
        let bytesRead = stream.Read(resp,0,80)
        tcpClient.Close()
        let resp = System.Text.Encoding.UTF8.GetString(resp)

        let fields = [|
                        "communication_settings"; "paper_out_flag"; "pause_flag"; "label_length";
                        "number_of_formats_in_receive_buffer"; "buffer_full_flag"; "communications_diagnostic_mode";
                        "partial_format_flag"; "unu;sed"; "corrupt_ram_flag"; "temperature_range_under";
                        "temperature_range_over"
                        "function_settings"; "unused"; "head_up_flag"; "ribbon_out_flag";
                        "thermal_transfer_mode_flag"; "print_mode"; "print_width_mode";
                        "label_waiting_flag"; "labels_remain_in_batch"; "format_while_printing_flag";
                        "number_of_graphics_in_memory";
                        "password"; "static_ram_installed"
                    |]
        let failedFields = ["pause_flag";
                            "buffer_full_flag";
                            "corrupt_ram_flag";
                            "temperature_range_over";
                            "temperature_range_under";
                            "head_up_flag";
                            "ribbon_out_flag";
                            "paper_out_flag"]

        let msgs = resp.Split(Environment.NewLine.ToCharArray(),StringSplitOptions.RemoveEmptyEntries)
                   |> Array.map (fun l -> l.Split([|','|],StringSplitOptions.RemoveEmptyEntries))
                   |> Array.concat
                   |> Array.zip fields
                   |> Array.filter (fun (a,b) -> a = "1" && failedFields |> List.contains b)
                   |> Array.map snd
        msgs
      |false -> [|sprintf "timed out connecting %s" ip|]
    with
    |e -> [|e.Message|]

let printLabel (data:string) (printerIp : string) =
    //let printerIp = "10.170.202.41" // stored per location
    use tcpClient = new TcpClient()
    try
        match tcpClient.ConnectAsync(printerIp,9100).Wait(1000) with
        |true ->
          tcpClient.ReceiveTimeout <- 1000
          let stream = tcpClient.GetStream()
          let data = (System.Text.Encoding.UTF8.GetBytes(data))
          stream.Write(data,0, data.Length)
          tcpClient.Close()
        |false -> failwith (sprintf "timed out connecting %s" printerIp)
    with
    |e -> failwith (sprintf "Problem printing - %s" (e.Message))
    
