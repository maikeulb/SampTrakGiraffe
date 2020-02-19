@echo off
echo "Cleaning ....."
dotnet clean
echo "Publish release build"
dotnet publish -c Release
echo "build/tag docker img"
docker build -t bennylynch/samptrakgiraffe:latest .
echo "push docker img"
docker push bennylynch/samptrakgiraffe:latest
echo "delete and redeploy"
kubectl get deploy
kubectl delete deploy sampgiraf-dply
kubectl create -f .\yaml\samptrak-deployment.yaml