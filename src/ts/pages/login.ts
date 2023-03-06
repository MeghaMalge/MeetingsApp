import { login } from "../services/auth";
import { loadPage } from "..";
import "../../scss/pages/login.scss";

class Login {
    loginForm: HTMLFormElement | null = null;

    addEventListeners() {
        ( this.loginForm as HTMLFormElement ).addEventListener(
            "submit",
            function ( event ) {
                event.preventDefault();

                const credentials = {
                    email: (
            document.getElementById( "email" ) as HTMLInputElement
                    ).value.trim(),
                    password: (
            document.getElementById( "password" ) as HTMLInputElement
                    ).value.trim()
                };

                login( credentials )
                    .then( function ( loginResponse ) {
                        console.log( loginResponse );
                        history.pushState( "", "", "/calendar.html" );
                        loadPage( location.pathname );
                    } )
                    .catch( function ( error ) {
                        if ( !error.response ) {
                            alert( "invalid Email or Password" );
                        } else {
                            alert( error.response );
                        }
                    } );
            }
        );
    }

    load = () => {
        this.loginForm = document.getElementById( "login-form" ) as HTMLFormElement;
        this.addEventListeners();
    };
}

export default Login;
