import { register } from "../services/auth";
import ValidateLogin from "../validation";

import "../../scss/pages/login.scss";

class Register {
    registerForm: HTMLFormElement | null = null;
    validateUser = new ValidateLogin();
    addEventListeners =() => {
        
        this.validateUser.eventListeners();
        ( this.registerForm as HTMLFormElement ).addEventListener(
            "submit",
            ( event ) => {
                event.preventDefault();
                if ( this.validateUser.validate() ) {
                    const user = {
                        name: (
              document.getElementById( "name" ) as HTMLInputElement
                        ).value.trim(),
                        email: (
              document.getElementById( "email" ) as HTMLInputElement
                        ).value.trim(),
                        password: (
              document.getElementById( "password" ) as HTMLInputElement
                        ).value.trim()
                    };

                    register( user )
                        .then( registerResponse => {
                            alert( "Registered successfully" );
                            return registerResponse;
                        } )
                        .catch(  error => {
                            alert( error.response );
                        } );
                }
            }
        );
    }

    load = () => {
        this.registerForm = document.getElementById(
            "register-form"
        ) as HTMLFormElement;
        // this.validateUser.eventListeners();
        this.addEventListeners();
    };
}

export default Register;
