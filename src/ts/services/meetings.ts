import IMeetings from "../models/meetings";
import  config  from '../config';
const apiBaseUrl = config.apiBaseUrl;
function addMeeting( newMeeting: IMeetings ) {
    return fetch( `${apiBaseUrl}/api/meetings`, {
        method: "POST",
        body: JSON.stringify( newMeeting ),
        headers: {
            Authorization: `${localStorage.getItem( "token" )}`,
            "Content-Type": "application/json"
        }
    } )
        .then( function ( response ) {
            if ( !response.ok ) {
                throw new Error( response.statusText );
            }

            return response.json();
        } )
        .then( function ( addMeetingResponse ) {
            return addMeetingResponse;
        } );
}

const getMeetings = function ( date: string ) {
    return fetch(
        `${apiBaseUrl}/api/calendar?date=${date}`,
        {
            method: "GET",
            headers: {
                Authorization: `${localStorage.getItem( "token" )}`
            }
        }
    ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }
        console.log( response );
        return response.json();
    } );
};

function filterMeetings( period: string, search: string ) {
    console.log( localStorage.getItem( `token` ) );

    return fetch(
        `${apiBaseUrl}/api/meetings?period=${period}&search=${search}`,

        {
            method: "GET",

            headers: {
                Authorization: `${localStorage.getItem( `token` )}`,

                "Content-Type": "application/json"
            }
        }
    ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }
        return response.json();
    } );
}

function excuseYourself( meetingID: string | undefined ) {
    return fetch(
        `${apiBaseUrl}/api/meetings/${meetingID}?action=remove_attendee`,
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
function addAttendee( meetingID: string | undefined, userID: string ) {
    return fetch(
        `${apiBaseUrl}/api/meetings/${meetingID}?action=add_attendee&email=${userID}`,
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

export { addMeeting, getMeetings, addAttendee, excuseYourself, filterMeetings };
