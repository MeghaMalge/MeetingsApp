class ValidateTeamForm {
    // console.log(document.getElementById('#team-name'));
    teamName = ( document.getElementById( 'team-name' ) as HTMLInputElement ); 
    teamShortName = document.getElementById( 'team-short-name' ) as HTMLInputElement;
     
    validateName = () => {
        const nameError = this.teamName.nextElementSibling as HTMLDivElement;
        nameError.textContent = "";
        const teamNameStr = this.teamName.value.trim();
        if( !teamNameStr )  {
            nameError.textContent = "Team name should not be empty";
            return false;
        } else {
            nameError.textContent = "";
            return true;
        }
    }
    validateShortName = () => {
        const shortNameError = this.teamShortName.nextElementSibling as HTMLDivElement;

        if( this.teamShortName.value == null )  {
            shortNameError.textContent = "Team name should not be empty";
            
        } else {
            shortNameError.textContent = "";
            
        }

        if( /\s/g.test( this.teamShortName.value ) ) {
            shortNameError.textContent = "Team Short name should not contain spaces";
        }
        else {
            shortNameError.textContent = "";
        }

        if( shortNameError.textContent ) {
            return false;
        } else {
            return true;
        }
    }

    isvalid = () => {
        let valid =true;
        valid = this.validateName() && valid;
        valid = this.validateShortName() && valid;
        return valid;
    }

    eventListeners = ()=>{
        this.teamName.addEventListener( "input", this.validateName );
        this.teamName.addEventListener( "blur", this.validateName );
        this.teamShortName.addEventListener( "input", this.validateShortName );
        this.teamShortName.addEventListener( "blur", this.validateShortName );
    }
}

export default ValidateTeamForm;