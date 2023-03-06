import { getMeetings } from "../services/meetings";
import initNav from "../nav-menu";
import IMeetings from "../models/meetings";
import IUsers from "../models/users";
import "../../scss/pages/calendar.scss";

class Calendar {
    showMeetings( meetings: IMeetings[] ) {
        const meetingsList = document.querySelector( ".meetings-container" );

        let meetingsListStr = "";
        meetings.forEach( ( meeting: IMeetings ) => {
            const meetingAttendees = meeting.attendees.map( ( attendee ) => {
                return ( attendee as IUsers ).email;
            } );

            const duration =
        parseInt( `${meeting.endTime.hours}` ) * 60 +
        parseInt( `${meeting.endTime.minutes}` ) -
        ( parseInt( `${meeting.startTime.hours}` ) * 60 +
          parseInt( `${meeting.startTime.minutes}` ) ) +
        ( parseInt( `${meeting.endTime.hours}` ) -
          parseInt( `${meeting.startTime.hours}` ) ) *
          10;
            const topHeight =
        parseInt( `${meeting.startTime.hours}` ) * 60 +
        parseInt( `${meeting.startTime.minutes}` ) +
        parseInt( `${meeting.startTime.hours}` ) * 10;

            meetingsListStr += `
      <div  class = "meeting" style="top:${topHeight}px;
         
      height:${duration}px;">
        <div>
          <div>${meeting.name}</div>    
          <div class="display-meeting">${meetingAttendees}</div>    
        </div>
      </div>
       `;
        } );
        ( meetingsList as HTMLDivElement ).innerHTML = meetingsListStr;
    }

    fetchMeetings = ( fetchDate: string ) => {
        getMeetings( fetchDate ).then( ( meetings: IMeetings[] ) => {
            this.showMeetings( meetings );
        } );
    };

    load = () => {
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const today = new Date();
        let date =
      today.getFullYear() +
      "-" +
      ( today.getMonth() + 1 ) +
      "-" +
      today.getDate();

        const todaysDate = document.getElementById( "today-date" );
        ( todaysDate as HTMLElement ).textContent = `${today.getDate()} ${
            month[today.getMonth()]
        } ${today.getFullYear()}`;

        this.fetchMeetings( date );

        const selectDate = document.getElementById( "select-date" );
        ( selectDate as HTMLInputElement ).addEventListener( "input", () => {
            const searchDate = ( selectDate as HTMLInputElement ).value;
            date = ( selectDate as HTMLInputElement ).value;
            const monthIndex = parseInt( date[6] + date[7] ) - 1;
            (
        todaysDate as HTMLElement
            ).textContent = `${date[8]}${date[9]} ${month[monthIndex]} ${date[0]}${date[1]}${date[2]}${date[3]}`;
            this.fetchMeetings( searchDate );
        } );
        initNav();
    };
}

export default Calendar;
