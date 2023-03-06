import { rest } from "msw";
import  apiBaseUrl  from '../config';
// import config from "../config";

// const { apiBaseUrl } = config;
import meetings from "../mocks/meeting";
import teams from "../mocks/teams";
import users from "../mocks/users";
import member from "../mocks/attendee";

const handlers = [
    rest.post(
        `${apiBaseUrl}/api/meetings`,
        ( req, res, ctx ) => {
            return res( ctx.status( 201 ), ctx.json( meetings[0] ) );
        }
    ),
    rest.get(
        `${apiBaseUrl}/api/meetings?period=all&search=`,
        ( req, res, ctx ) => {
            return res( ctx.json( meetings ) );
        }
    ),
    rest.post(
        `${apiBaseUrl}/api/teams`,
        ( req, res, ctx ) => {
            return res(
                ctx.status( 201 ),
                ctx.json( teams[0] )
            );
        }
    ),
    rest.get( `${apiBaseUrl}/api/teams`, ( req, res, ctx ) => {
        return res( ctx.json( teams ) );
    } ),
    rest.get( `${apiBaseUrl}/api/users`, ( req, res, ctx ) => {
        return res( ctx.json( users ) );
    } ),
    rest.patch( `${apiBaseUrl}/api/teams/631f07c79fcf940015bbde7e?action=remove_member`, ( req, res, ctx ) =>{
        return res(
            ctx.json( teams )
        );
    } )
    
];

export default handlers;
