import { getTeams, addTeam, addMember } from "./teams";
import teamsData from "../mocks/teams";

import "../setupTests";

test( "getMeetings fetches the list of meetings when the HTTP request is successful", ( done ) => {
    getTeams().then( ( teams ) => {
        expect( teams instanceof Array ).toBe( true );

        expect( teams ).toEqual( teamsData );

        done();
    } );
} );

test( "addTeam adds a team when HTTP request is successful", ( done ) => {
    const data = {
        name: "Google Marketing",
        shortName: "Google",
        description: "Training",
        members: [
            {
                userId: "62f0cabdad71500015c8be35",
                email: "srushti19@sapient.com"
            },
            {
                userId: "62f5dee054002f00158ac9b8",
                email: "srushtivg@sapient.com"
            },
            {
                userId: "631ece689fcf940015bbde6d",
                email: "srushti@sapient.com"
            }
        ]
    };
    addTeam( data )
        .then( ( team ) => {
            expect( team instanceof Object ).toBe( true );
            expect( team ).toEqual( teamsData[0] );
            done();
        } );
} );


