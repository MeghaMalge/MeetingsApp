import { getUserID } from "./users";
import usersData from "../mocks/users";

import "../setupTests";

test( "getUserID fetches the list of users when the HTTP request is successful", ( done ) => {
    getUserID().then( ( users ) => {
        expect( users instanceof Array ).toBe( true );

        expect( users ).toEqual( usersData );

        done();
    } );
} );
