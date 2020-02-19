IF NOT EXIST paket.lock (
    START /WAIT .paket/paket.exe install
)
dotnet restore src/SamplTrackrGiraffe
dotnet build src/SamplTrackrGiraffe

