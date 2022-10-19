## BUILD

docker build -t upload_app .
docker tag upload_app mohammedwazier/upload_app
docker push mohammedwazier/upload_app
