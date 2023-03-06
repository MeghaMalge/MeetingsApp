class ValidateMeetingsForm {
    start = document.querySelector( "#start-time" ) as HTMLInputElement;
    end = document.querySelector( "#end-time" ) as HTMLInputElement;
    timeError = document.querySelector( ".message" ) as HTMLDivElement;
    endTime = "";
    startTime = "";

    validateTime = () => {
        this.startTime = this.start.value;
        if ( parseInt( this.startTime ) > parseInt( this.endTime ) ) {
            this.timeError.textContent = "End time should be greater than start time";
        } else {
            this.timeError.textContent = "";
        }

        this.endTime = this.end.value;
        if ( parseInt( this.startTime ) > parseInt( this.endTime ) ) {
            this.timeError.textContent = "End time should be greater than start time";
        } else {
            this.timeError.textContent = "";
        }

        if ( this.timeError.textContent == "" ) {
            return true;
        } else {
            return false;
        }
    };
}

export default ValidateMeetingsForm;
