## BUILD

docker build -t upload_app .
<br/>
docker tag upload_app <a href="https://hub.docker.com/r/mohammedwazier/upload_app">mohammedwazier/upload_app</a>
<br/>
docker push <a href="https://hub.docker.com/r/mohammedwazier/upload_app">mohammedwazier/upload_app</a>

### How to Use

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
