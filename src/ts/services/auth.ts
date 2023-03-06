import ICredentials from "../models/credentials";
import  config  from '../config';
const apiBaseUrl = config.apiBaseUrl;
function register( user: ICredentials ) {
    return fetch( `${apiBaseUrl}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify( user ),
        headers: {
            "Content-Type": "application/json"
        }
    } )
        .then( function ( response ) {
            if ( !response.ok ) {
                throw new Error( response.statusText );
            }
            return response;
        } );
}

function login( credentials: ICredentials ) {
    return fetch( `${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify( credentials ),
        headers: {
            "Content-Type": "application/json"
        }
    } )
        .then( function ( response ) {
            if ( !response.ok ) {
                throw new Error( response.statusText );
            }

            return response.json();
        } )
        .then( function ( loginResponse ) {
            localStorage.setItem( "message", loginResponse.message );
            localStorage.setItem( "token", loginResponse.token );
            localStorage.setItem( "email", loginResponse.email );
            localStorage.setItem( "name", loginResponse.name );
            return loginResponse;
        } );
}

function isAuthenticated() {
    if ( localStorage.getItem( "token" ) === null ) {
        return false;
    }
    return true;
}

export { login, register, isAuthenticated };
