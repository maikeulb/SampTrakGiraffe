
#@echo off
echo "Cleaning ....."
dotnet clean

echo "Publish release build"
dotnet publish -c Release

echo "build/tag docker img"
docker build -t bennylynch/samptrakgiraffe:latest .

echo "stop the dockers"
docker stop $(docker ps -a -q )

echo "rm the dockers"
docker rm $(docker ps -a -q )

echo "start the docker"
docker run -p 9090:9090 bennylynch/samptrakgiraffe:latest