/*
A comfortable HTTP client

This class hides the gory details of the underlying HTTP protocol
from the rest of the code by providing a simple interface for doing
requests and handling authentication. This is not a general purpose http client, but is a wrapper over other libraries, along with the necessary authentication for gpodder api.
*/
const path = require("path");
const fetch = require("node-fetch");
const Promise = require("bluebird");
class HttpClient {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // convenience functions for http requests
    get(uri){
        options = {
            headers: {
                "Authorization": ""
            }
        }
        return new Promise(function(resolve, reject){
            fetch(uri)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => reject(err))
        });
    }

    put(uri, data) {
        return new Promise(function(resolve, reject) {
            fetch(uri, data)
                .th
        })
    }

    post(uri, data) {

    }



    
}