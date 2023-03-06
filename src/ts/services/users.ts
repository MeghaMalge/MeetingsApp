import  config  from '../config';
const apiBaseUrl = config.apiBaseUrl;
function getUserID() {
    return fetch( `${apiBaseUrl}/api/users`, {
        method: "GET",

        headers: {
            Authorization: `${localStorage.getItem( `token` )}`,
            "Content-Type": "application/json"
        }
    } )
        .then( function ( response ) {
            if ( !response.ok ) {
                throw new Error( response.statusText );
            }
            return response.json();
        } )
        .then( function ( usersResponse ) {
            return usersResponse;
        } );
}
// getUserID();

export { getUserID };
