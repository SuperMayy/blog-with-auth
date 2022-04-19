# Getting Started 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The APP ustilises: the context API for state management, utilised react-router-don v6, utilises moment.js


## Available Scripts

To run aplication locally:

### `npm install`



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To build application:

### `npm run build`


# React Application Exercise

Blog with auth a maintainable React application using modern JavaScript and framework(s). The application is a blog pulling content from the API listed below based on some simple HTML/CSS markup; there is also basic login/logout functionality. 

It follows React best practices, uses modern JavaScript features (ES6-8), utilize build processes, implements a routing strategy (react-router-don v6), and handle state management (Context API), handles the authentication flow (login and logout), store tokens (via Context API), and handle expired tokens.

## Requirements

* Application utilizing the provided HTML/CSS and following the specifications. No server-side rendering is required, though we’d like the application built in such a way that server side rendering could be added in the future.
* Modern JavaScript best practices.
* No page reloads necessary.
* Built using React.
* Login/logout functionality using JSON Web Token authentication.

## APIs

The API is the default WordPress REST API provided with WordPress. The relevant endpoints are listed below:

* `GET https://js1.10up.com/wp-json/wp/v2/posts` - Get blog posts
* `GET https://js1.10up.com/wp-json/wp/v2/pages` - Get pages (about)
* `POST https://js1.10up.com/wp-json/jwt-auth/v1/token` - Receive a token based on a username and password. 
  ```
  {
    "username": "USERNAME",
    "password": "PASSWORD"
  }
  ```
* `POST https://js1.10up.com/wp-json/jwt-auth/v1/token/validate` - Check whether an existing token is valid or not. For this request, pass along the `Authentication` header like so:
  ```
  Authentication: Bearer TOKEN
  ```

  Decided not to store the token in the browser, in order to persist the login, as web storage does not enforce any secure standards during transfer. 

  "Web Storage (localStorage/sessionStorage) is accessible through JavaScript on the same domain. This means that any JavaScript running on your site will have access to web storage, and because of this can be vulnerable to cross-site scripting (XSS) attacks. XSS, in a nutshell, is a type of vulnerability where an attacker can inject JavaScript that will run on your page. Basic XSS attacks attempt to inject JavaScript through form inputs, where the attacker puts" `https://newbedev.com/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs`