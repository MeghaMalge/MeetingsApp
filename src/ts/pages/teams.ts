
import {
    getTeams,
    addTeam,
    addMember,
    excuseYourself
} from "../services/teams";
import { getUserID } from "../services/users";
import initNav from "../nav-menu";
import ValidateTeamForm from "../teams-validation";
import Meeting from "./meetings";
import IUsers from "../models/users";
import ITeams from "../models/team";
import "../../scss/pages/teams.scss";

let membersArray: IUsers[] = [];
const newMembersArray: string[] = [];

class Teams {

  
    membersArray: IUsers[] = [];
    newMembersArray: string[] = [];
    addTeamsList = document.querySelector( ".members" );
    allUsers: IUsers[] = [];
    infoMessage : HTMLElement | null = null;
    
    showLoadingMessage = () => {
        ( this.infoMessage as HTMLElement ).textContent = 'Loading Teams...Please wait...';
        ( this.infoMessage as HTMLElement ).classList.remove( 'hide' );
    }

    showTeams = ( teams: ITeams[] ) => {
        const teamsList = document.querySelector( ".card-collection" );
        const cards = ( teamsList as HTMLElement ).innerHTML;

        let teamsListStr = "";
        let allUsersOptionsStr = "";
        this.allUsers.forEach( function ( user ) {
            allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
        } );

        teams.forEach( ( team: ITeams, idx ) => {
            const teamMembers = team.members.map( function ( member ) {
                console.log( team );
                return member.email;
            } );
   
            teamsListStr += `
            <div class="card my">
                <div class="team-name">${team.name}</div>
                <div class="team-short-name">@${team.shortName}</div>
                <div>${team.description}</div>
                <div> 
                  <button type="button" 
                           id="${idx}"
                          class="excuse-yourself-btn"
                      >Excuse yourself
                  </button>
                </div>
                <div class ="member-list"><span style="font-weight:bold">Members:</span>${teamMembers}</div>
                <div>
                  <span>
                    <label for="add-member"></label>
                    <select id="add-member" class= "select-input"> <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
                  </span>
                  <button type="button" 
                          class="add-btn" 
                          
                      >Add
                  </button>
                </div>
              </div>
            </div>
            `;
        } );

        ( teamsList as HTMLDivElement ).innerHTML = teamsListStr + cards;

        teams.forEach( function ( team, idx ) {
            const excuseYourselfBtn =
      document.querySelectorAll( `.excuse-yourself-btn` );
            ( excuseYourselfBtn[idx] as HTMLButtonElement ).addEventListener(
                "click",
                () => {
                    excuseYourself( team._id ).then( function () {
                        (
            ( excuseYourselfBtn[idx] as HTMLButtonElement ).closest(
                ".card"
            ) as HTMLDivElement
                        ).remove();
                    } );
                }
            );

            const addMemberBtn = document.querySelectorAll( ".add-btn" );
            const selectInput = document.querySelectorAll( ".select-input" );
            const memberList = (
      ( selectInput[idx] as HTMLInputElement ).closest( "div" ) as HTMLDivElement
            ).previousElementSibling;
            let userID: string;
            ( selectInput[idx] as HTMLInputElement ).addEventListener(
                "input",
                function () {
                    userID = ( selectInput[idx] as HTMLInputElement ).value;
                }
            );

            ( addMemberBtn[idx] as HTMLButtonElement ).addEventListener( "click", () => {
                addMember( team._id, userID ).then( function () {
                    const memberNode = document.createTextNode( `,${userID}` );
                    ( memberList as HTMLElement ).appendChild( memberNode );
                } );
            } );
        } );

        this.addNewTeam();
        const addTeamForm = document.querySelector( ".team-form" );
        const formContent = ( addTeamForm as HTMLDivElement ).innerHTML;
        const addTeamBtn = document.querySelector( ".add-team" );

        ( addTeamBtn as HTMLButtonElement ).addEventListener( "click", () => {
            ( addTeamForm as HTMLDivElement ).classList.toggle( "hide" );
           
            const newTeamHolder = `
                <div class ="member-list"><span style="font-weight:bold">Members:</span></div>
                <div>
                
                    <label for="add-member"></label>
                    <select id="add-member" class= "select-input"> <option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
                
                  <button type="button" 
                          class="add-btn" 
                          
                      >Add
                  </button>
                  
                </div>
                <button type="submit" class="add-team-btn">Add Team</button>
    `;
   
            ( addTeamForm as HTMLFormElement ).innerHTML = formContent + newTeamHolder;
            const validateForm = new ValidateTeamForm;
            validateForm.eventListeners();
            const addMemberBtn = ( addTeamForm as HTMLElement ).querySelector(
                ".add-btn"
            );
            const selectInput = ( addTeamForm as HTMLElement ).querySelector(
                ".select-input"
            );
            const memberList = (
      ( selectInput as HTMLInputElement ).closest( "div" ) as HTMLDivElement
            ).previousElementSibling;
            let userID: string;

            ( addMemberBtn as HTMLButtonElement ).addEventListener( "click", () => {
                this.membersArray = [];

                userID = ( selectInput as HTMLInputElement ).value;
                const member: IUsers | undefined = this.allUsers.find( function (
                    user: IUsers
                ) {
                    return user.email === userID;
                } );
               
                if ( member ) {
                    membersArray.push( member );
                    const memberNode = document.createTextNode( `,${userID}` );
                    ( memberList as HTMLElement ).appendChild( memberNode );
                }
            } );
        } );
    };

    getAllUsers = () => {
        return getUserID()
            .then( ( response ) => {
                console.log( response );
                return response;
            } )
            .then( ( users ) => {
                this.allUsers = users;
            } );
    };

    addNewTeam = () => {
        const addTeamForm = document.querySelector( "#add-team" );
        
        ( addTeamForm as HTMLFormElement ).addEventListener( "submit", ( event ) => {
            event.preventDefault();
            const validate = new ValidateTeamForm();
            
            if ( validate.isvalid() ) {
                const team: ITeams = {
                    name: (
          document.getElementById( "team-name" ) as HTMLInputElement
                    ).value.trim(),
                    shortName: (
          document.getElementById( "team-short-name" ) as HTMLInputElement
                    ).value.trim(),
                    description: (
          document.getElementById( "team-description" ) as HTMLInputElement
                    ).value.trim(),
                    members: membersArray
                };

                let allUsersOptionsStr = "";
                this.allUsers.forEach( function ( user ) {
                    allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
                } );
                addTeam( team )
                    .then( ( addTeamResponse ) => {
                        const teamAdded = new Meeting;
                        teamAdded.successMessage();
                        return addTeamResponse;
                    } )
                    .then( ( addedTeam ) => {
                 
                        ( document.getElementById( "team-name" ) as HTMLInputElement ).value = "";
                        (
          document.getElementById( "team-short-name" ) as HTMLInputElement
                        ).value = "";
                        (
          document.getElementById( "team-description" ) as HTMLInputElement
                        ).value = "";
      
                        membersArray=[];

                        const newTeamMembers = addedTeam.members.map( function (
                            newMember: IUsers
                        ) {
                            return newMember.email;
                        } );

                        const addedNewTeam = document.createElement( "div" );
                        addedNewTeam.classList.add( "card" );
                        addedNewTeam.classList.add( "my" );

                        addedNewTeam.innerHTML = `
      
            <div class="team-name">${addedTeam.name}</div>
            <div class="team-short-name">@${addedTeam.shortName}</div>
            <div>${addedTeam.description}</div>
            <div> 
              <button type="button"  
                      class="excuse-yourself-btn"
                  >Excuse yourself
              </button>
            </div>
            <div><span style="font-weight:bold">Members:</span>${newTeamMembers}</div>
            <div>
              <span>
                <label for="add-member"></label>
                <select id="add-member" class= "select-input"><option style="color:#999;">Select member</option>${allUsersOptionsStr}</select>
              </span>
              <button type="button" 
                      class="add-btn" 
                     
                  >Add
              </button>
            </div>
          </div>
      
       
        `;

                        const parentNode = document.querySelector( ".card-collection" );

                        ( parentNode as HTMLDivElement ).insertBefore(
                            addedNewTeam,
                            document.getElementById( "add-team" )
                        );
      
                        ( document.getElementById( "add-team" ) as HTMLDivElement ).classList.add(
                            "hide"
                        );
                        const excuseYourselfBtn = addedNewTeam.querySelector(
                            ".excuse-yourself-btn"
                        );
     
                        ( excuseYourselfBtn as HTMLButtonElement ).addEventListener(
                            "click",
                            () => {
                                console.log( addedTeam._id );
                                excuseYourself( addedTeam._id ).then( function () {
                                    ( addedNewTeam as HTMLDivElement ).remove();
                                } );
                            }
                        );

                        const addMemberBtn = addedNewTeam.querySelector( ".add-btn" );
                        const selectInput = addedNewTeam.querySelector( ".select-input" );
                        const memberList = (
          ( selectInput as HTMLInputElement ).closest( "div" ) as HTMLDivElement
                        ).previousElementSibling;
                        let userID: string;

                        ( addMemberBtn as HTMLButtonElement ).addEventListener( "click", () => {
                            userID = ( selectInput as HTMLInputElement ).value;

                            addMember( addedTeam._id, userID ).then( function () {
                                newMembersArray.push( userID );
                                const memberNode = document.createTextNode( `,${userID}` );
                                ( memberList as HTMLElement ).appendChild( memberNode );
                            } );
                        } );
                    } );
            }
        } );
    };

    load = () => {
        const user = document.getElementById( "user" );
        this.infoMessage = document.querySelector( '.message-info' );
        this.showLoadingMessage();
        ( user as HTMLElement ).textContent = ` ${localStorage.getItem( "email" )}`;
        let allUsersOptionsStr = "";
        this.getAllUsers()
            .then( () => {
                getTeams()
                    .then( ( response ) => {
                        this.showTeams( response );
                    } )
                    .catch( ( error ) => {
                        alert( error.response );
                    } )
                    .finally( () => {
                        ( this.infoMessage as HTMLElement ).textContent = '';
                        ( this.infoMessage as HTMLElement ).classList.add( 'hide' );
                    } );
            } );

        this.allUsers.forEach( function ( user ) {
            allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
        } );
        this.addNewTeam();
        initNav();
    };
}

export default Teams;
console.log( newMembersArray );
