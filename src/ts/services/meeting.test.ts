import { addMeeting, filterMeetings } from "./meetings";
import meetingsData from "../mocks/meeting";

import "../setupTests";

test( "getMeetings fetches the list of meetings when the HTTP request is successful", ( done ) => {
    filterMeetings( "all", "" ).then( ( meetings ) => {
        expect( meetings instanceof Array ).toBe( true );

        expect( meetings ).toEqual( meetingsData );

        done();
    } );
} );

test( "addMeeting adds meeting when HTTP request is successful", ( done ) => {
    const newMeeting = {
        "name": "Google marketing campaign",
        "description": "Increasing brand awareness and spreading information about new products",
        "date": "2022-8-13",
        "startTime": {
            "hours": "9",
            "minutes": "0"
        },
        "endTime": {
            "hours": "10",
            "minutes": "30"
        },
        "attendees": [ "puranik@sapient.com" ]
    }
    addMeeting( newMeeting ).then( ( meeting ) => {
        expect( meeting ).toEqual( meetingsData[0] );
        console.log( meeting );
        console.log( meetingsData[0] );
        done();
    } );
} );
