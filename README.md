## BUILD

docker build -t upload_app .
docker tag upload_app mohammedwazier/upload_app
docker push mohammedwazier/upload_app

How to Use

```
/uploads
[POST] {form-data}
file[array]: [file]
response: JSON {
    state,
    message,
    data: {
        files: [],
        submit: []
    }
}
```

```
/public/:filename
response: OBJECT FILE
```
