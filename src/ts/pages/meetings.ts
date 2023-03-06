import {
    addMeeting,
    addAttendee,
    filterMeetings,
    excuseYourself
} from "../services/meetings";
import { getUserID } from "../services/users";
import initNav from "../nav-menu";
import ValidateMeetingsForm from "../meeting-validation";
import { opentab, defaultOpen } from "../tab";
import IMeetings from "../models/meetings";
import IUsers from "../models/users";
import "../../scss/pages/Meetings.scss";
class Meeting {

    successMessage() {
        const msgSuccess = document.querySelector( '.msg-success' ) as HTMLDivElement;
        msgSuccess.classList.remove( 'hide' );
        msgSuccess.innerHTML = ` <div> 
                                                        Added Successfully
                                                        <button type="button"
                                                                >Ok</button>
                                                    </div>`;
        const okBtn = msgSuccess.querySelector( 'button' ) as HTMLButtonElement;
        ( msgSuccess.querySelector( 'div' ) as HTMLDivElement ).classList.add( 'dialog' );
        ( msgSuccess.querySelector( 'button' ) as HTMLButtonElement ).classList.add( 'msg-success-btn' );

        okBtn.addEventListener( 'click', () => {
            msgSuccess.classList.add( 'hide' );
                            
        } );
    }
    addEventListeners = () => {
        const validate = new ValidateMeetingsForm();
        const addMeetingForm = document.getElementById( "add-meeting-form" );
        ( addMeetingForm as HTMLFormElement ).addEventListener(
            "submit",
            ( event ) => {
                event.preventDefault();
                
                if ( validate.validateTime() ) {
                    const attendeeList = document.getElementById( "attendees" );
                    const attendeedata = ( attendeeList as HTMLInputElement ).value
                        .split( "," )
                        .map( function ( email ) {
                            return email.trim();
                        } );
                    const startTime = document.getElementById( "start-time" );
                    const endTime = document.getElementById( "end-time" );

                    const meeting: IMeetings = {
                        name: (
              document.getElementById( "meeting-name" ) as HTMLInputElement
                        ).value.trim(),
                        description: (
              document.getElementById( "description" ) as HTMLInputElement
                        ).value.trim(),
                        date: ( document.getElementById( "date" ) as HTMLInputElement ).value,
                        startTime: {
                            hours:
                ( startTime as HTMLInputElement ).value[0] +
                ( startTime as HTMLInputElement ).value[1],

                            minutes:
                ( startTime as HTMLInputElement ).value[3] +
                ( startTime as HTMLInputElement ).value[4]
                        },

                        endTime: {
                            hours:
                ( endTime as HTMLInputElement ).value[0] +
                ( endTime as HTMLInputElement ).value[1],

                            minutes:
                ( endTime as HTMLInputElement ).value[3] +
                ( endTime as HTMLInputElement ).value[4]
                        },
                        attendees: attendeedata
                    };

                    

                    addMeeting( meeting )
                        .then( ( addMeetingResponse ) => {
                            this.successMessage();
                            
                            return addMeetingResponse;
                        } )
                        .catch( function ( error ) {
                            if ( !error.response ) {
                                alert( "Enter meeting details" );
                            }
                        } )
                        .finally( function () {
                            (
                document.getElementById( "meeting-name" ) as HTMLInputElement
                            ).value = "";
                            (
                document.getElementById( "description" ) as HTMLInputElement
                            ).value = "";
                            ( document.getElementById( "date" ) as HTMLInputElement ).value = "";
                            ( startTime as HTMLInputElement ).value = "";
                            ( endTime as HTMLInputElement ).value = "";
                            ( attendeeList as HTMLInputElement ).value = "";
                        } );
                }
            }
        );
    };
    searchMeetingForm: HTMLFormElement | null = null;
    showMeetings = ( meetings: IMeetings[] ) => {
        const searchMeetingHeading = document.querySelector( ".meeting-card-container-heading" ) as HTMLElement;
        searchMeetingHeading.classList.remove( "hide" ); 
        const searchMeetingList = document.querySelector( ".meeting-card-container" );
        let allUsersOptionsStr = "";
        this.allUsers.forEach( function ( user ) {
            allUsersOptionsStr += `<option value="${user.email}">${user.email}</option> `;
        } );

        let searchMeetingListStr = "";
        meetings.forEach( function ( meeting: IMeetings, idx ) {
            const meetingAttendees = meeting.attendees.map( function ( attendee ) {
                return ( attendee as IUsers ).email;
            } );

            const year =
        meeting.date[0] + meeting.date[1] + meeting.date[2] + meeting.date[3];
            const day = meeting.date[8] + meeting.date[9];
            let month = meeting.date[5] + meeting.date[6];

            if ( month == "01" ) {
                month = `January`;
            } else if ( month == "02" ) {
                month = `February`;
            } else if ( month == "03" ) {
                month = `March`;
            } else if ( month == "04" ) {
                month = `April`;
            } else if ( month == "05" ) {
                month = `May`;
            } else if ( month == "06" ) {
                month = `June`;
            } else if ( month == "07" ) {
                month = `July`;
            } else if ( month == "08" ) {
                month = `August`;
            } else if ( month == "09" ) {
                month = `September`;
            } else if ( month == "10" ) {
                month = `October`;
            } else if ( month == "11" ) {
                month = `November`;
            } else if ( month == "12" ) {
                month = `December`;
            }

            searchMeetingListStr += `
        <div class="card">
          <div>
            <span class="date">${day} ${month} ${year}</span>
            <span class="duration">
              ${meeting.startTime.hours}:${meeting.startTime.minutes} - ${meeting.endTime.hours}:${meeting.endTime.minutes}
            </span>
          </div>
          <div class="meeting-name">${meeting.name}</div>
          <div>
          <button type="button" 
                             id="${idx}"
                            class="excuse-yourself-btn"
                        >Excuse yourself
                    </button>
          </div>
          <div><span style="font-weight:bold">Attendees:</span>${meetingAttendees}</div>
          <div>
            
              <label for="add-attendee"></label>
              <select id="add-attendee" class="select-input">
              <option>Select member</option>
              ${allUsersOptionsStr}
              </select>
        
            <button type="button" 
                          class="add-btn" 
                      >Add
                  </button>
          </div>
        </div>
         `;
        } );
        ( searchMeetingList as HTMLElement ).innerHTML = searchMeetingListStr;

        meetings.forEach( function ( meeting, idx ) {
            const excuseYourselfBtn =
        document.querySelectorAll( `.excuse-yourself-btn` );
            ( excuseYourselfBtn[idx] as HTMLButtonElement ).addEventListener(
                "click",
                () => {
                    excuseYourself( meeting._id ).then( function () {
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
                addAttendee( meeting._id, userID ).then( function () {
                    const memberNode = document.createTextNode( `,${userID}` );
                    ( memberList as HTMLElement ).appendChild( memberNode );
                } );
            } );
        } );
    };
    allUsers: IUsers[] = [];

    showSearchMeetings = () => {
        const searchMeetingForm = document.getElementById( "search-meeting-form" );
        ( searchMeetingForm as HTMLFormElement ).addEventListener(
            "submit",
            ( event ) => {
                const periodField = (
          document.getElementById( "period" ) as HTMLInputElement
                ).value;
                const searchEl = (
          document.getElementById( "search-for" ) as HTMLInputElement
                ).value;

                event.preventDefault();

                filterMeetings( periodField, searchEl )
                    .then( ( meetings ) => {
                        this.showMeetings( meetings );
                    } )
                    .catch( ( error ) => {
                        alert( error.message );
                    } );
            }
        );
    };

    getAllUsers = () => {
        getUserID()
            .then( ( response ) => {
                console.log( response );
                return response;
            } )
            .then( ( users ) => {
                this.allUsers = users;
            } );
    };

    load = () => {
        const tabLink1 = document.querySelector( "#default-open" );
        ( tabLink1 as HTMLElement ).addEventListener( "click", ( event ) => {
            opentab( event, "filter" );
            this.showSearchMeetings();
        } );
        const tabLink2 = document.querySelector( "#add-open" );
        ( tabLink2 as HTMLElement ).addEventListener( "click", ( event ) => {
            opentab( event, "add" );
            this.addEventListeners();
        } );
        const user = document.getElementById( "user" );
        ( user as HTMLElement ).textContent = ` ${localStorage.getItem( "email" )}`;
        defaultOpen();
        this.getAllUsers();
        initNav();
    };
}

export default Meeting;
