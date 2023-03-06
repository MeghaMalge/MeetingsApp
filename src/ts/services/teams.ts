import ITeams from "../models/team";
import  config  from '../config';
const apiBaseUrl = config.apiBaseUrl;

const getTeams = function () {
    return fetch( `${apiBaseUrl}/api/teams`, {
        method: "GET",
        headers: {
            Authorization: `${localStorage.getItem( `token` )}`,
            "Content-Type": "application/json"
        }
    } ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }
        return response.json();
    } );
};
function addTeam( team: ITeams ) {
    return fetch( `${apiBaseUrl}/api/teams`, {
        method: "POST",
        body: JSON.stringify( team ),
        headers: {
            Authorization: `${localStorage.getItem( `token` )}`,
            "Content-Type": "application/json"
        }
    } ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }

        return response.json();
    } )
        .then( function ( addTeamResponse ) {
            return addTeamResponse;
        } );
}
function excuseYourself( teamID: string | undefined ) {
    console.log( teamID );
    return fetch(
        `${apiBaseUrl}/api/teams/${teamID}?action=remove_member`,
        {
            method: "PATCH",

            headers: {
                Authorization: `${localStorage.getItem( `token` )}`
            }
        }
    ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }
        return response.json();
    } );
}
function addMember( teamID: string | undefined, userID: string ) {
    return fetch(
        `${apiBaseUrl}/api/teams/${teamID}?action=add_member&email=${userID}`,
        {
            method: "PATCH",

            headers: {
                Authorization: `${localStorage.getItem( `token` )}`
            }
        }
    ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }

        return response.json();
    } );
}

export { getTeams, addTeam, addMember, excuseYourself };
