# Angular GitHub Authentication

> NOTE: This project works best if you have NODE JS or NPM installed

# Test Rails doesn't allow requests from Corss Origins

> NOTE: The Server `https://seagatesystemtest.testrail.net/` needs to accept CORS origin Header Requests.

Stack Overflow link to this question can be found below: 

- [CORS Origin needs to be setup from the server side](https://stackoverflow.com/questions/25727306/request-header-field-access-control-allow-headers-is-not-allowed-by-access-contr)

*The server (that the POST request is sent to) needs to include the Access-Control-Allow-Headers header (etc) in its response. Putting them in your request from the client has no effect.*

This is because it is up to the server to specify that it **accepts cross-origin requests** `(and that it permits the Content-Type request header, and so on)` – the client cannot decide for itself that a given server should allow CORS.

**Solution**: 
- Setup an `Application Server`  (locally) and let the Server make the HTTP Request to `https://seagatesystemtest.testrail.net/`
- Angular Application will communicate with the `Application Server` and get the results.


## Setting up the project
- Install Node JS.
- Once NodeJS is installed successfully, check if Node or NPM is installed by running the following commands:

```js
npm -v
```
- You need to install a plugin called - `http-server`
```js
npm install -g http-server
``` 
- git clone the URL: [https://github.com/avj2352/simpleAngularAuthentication.git](https://github.com/avj2352/simpleAngularAuthentication.git)
- Run npm install command. This will install the dependencies mentioned in the `package.json`
```js
npm install
```
- Run npm start. This will trigger the `http-server` and the application will be hosted(by default) on http://localhost:8080
```js
npm start
```

## If you don't have Node JS or cannot install Node JS

If in case, you cannot install `Node JS` or dont have `Node JS` installed in your system, You need to just replace the following links in `index.html`
Replace the following links with their respective CDN links:

```html
<script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-base64/angular-base64.min.js"></script>
    <script src="node_modules/ng-storage/ngStorage.min.js"></script>
```

and host the application on your respective server.

