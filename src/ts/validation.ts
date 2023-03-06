class ValidateLogin {
    passwordEl = document.querySelector( "#password" ) as HTMLInputElement;
    confirmPasswordEl = document.querySelector(
        "#confirm-password"
    ) as HTMLInputElement;
    emailEl = document.querySelector( "#email" ) as HTMLInputElement;

    validatePassword = () => {
        const password = this.passwordEl.value.trim();
        const messageEl = this.passwordEl.nextElementSibling as HTMLElement;

        let error = "";

        if ( !password ) {
            error += "<div>Password cannot be empty</div>";
        } else {
            const uppercasePat = /[A-Z]/;
            if ( !uppercasePat.test( password ) ) {
                error += "<div>Password must have an uppercase character</div>";
            }
            const lowercasePat = /[a-z]/;
            if ( !lowercasePat.test( password ) ) {
                error += "<div>Password must have a lowercase character</div>";
            }
            const digitPat = /[0-9]/;
            if ( !digitPat.test( password ) ) {
                error += "<div>Password must have a digit</div>";
            }
            const specialPat = /[!@#$%^&*()]/;
            if ( !specialPat.test( password ) ) {
                error += "<div>Password must have a special character</div>";
            }
        }

        ( messageEl as HTMLElement ).innerHTML = error;

        return error === "";
    }

    validateConfirmPassword = () => {
        const password = this.passwordEl.value.trim();
        const confirmPassword = this.confirmPasswordEl.value.trim();
        
        const messageEl = this.confirmPasswordEl.nextElementSibling as HTMLElement;

        let error = "";

        if ( password !== confirmPassword ) {
            error += "Password and confirm password must match";
        }

        ( messageEl as HTMLElement ).innerHTML = error;

        return error === "";
    }

    validateEmail = () => {
        const email = this.emailEl.value.trim();
        
        const messageEl = this.emailEl.nextElementSibling as HTMLElement;

        let error = "";

        if ( !email ) {
            error += "<div>Email cannot be empty</div>";
        }

        ( messageEl as HTMLElement ).innerHTML = error;

        return error === "";
    };

    eventListeners = () => {
        this.emailEl.addEventListener( "blur", this.validateEmail );
        this.emailEl.addEventListener( "input", this.validateEmail );

        this.passwordEl.addEventListener( "blur", this.validatePassword );
        this.passwordEl.addEventListener( "input", this.validatePassword );

        this.passwordEl.addEventListener( "blur", this.validateConfirmPassword );
        this.passwordEl.addEventListener( "input", this.validateConfirmPassword );

        this.confirmPasswordEl.addEventListener(
            "blur",
            this.validateConfirmPassword
        );
        this.confirmPasswordEl.addEventListener(
            "input",
            this.validateConfirmPassword
        );
    };

    validate = () => {
        let isValid = true;

        isValid = this.validateEmail() && isValid;
        isValid = this.validatePassword() && isValid;
        isValid = this.validateConfirmPassword() && isValid;

        return isValid;
    };
}

export default ValidateLogin;
