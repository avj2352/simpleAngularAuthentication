# Angular GitHub Authentication

> NOTE: This project works best if you have NODE JS or NPM installed

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

