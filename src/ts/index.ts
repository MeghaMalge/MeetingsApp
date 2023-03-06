import '../scss/common.scss';

import Login from "./pages/login";
import Register from "./pages/register";
import Calendar from "./pages/calendar";
import Teams from "./pages/teams";
import Meetings from "./pages/meetings";
import { isAuthenticated } from "./services/auth";



interface Constructable<T> {
  new ( ...args: any ): T;
}

interface Routes<T> {
  [key: string]: {
    template: string;
    Controller: Constructable<any> | null;
    auth: boolean;
  };
}

const routes: Routes<any> = {
    "/login.html": {
        template: "login",
        Controller: Login,
        auth: false
    },
    "/register.html": {
        template: "register",
        Controller: Register,
        auth: false
    },
    "/meetings.html": {
        template: "meetings",
        Controller: Meetings,
        auth: true
    },
    "/teams.html": {
        template: "teams",
        Controller: Teams,
        auth: true
    },
    "/calendar.html": {
        template: "calendar",
        Controller: Calendar,
        auth: true
    },
    "*": {
        template: "page-not-found",
        Controller: null,
        auth: false
    }
};

const setupLinks = () => {
    const links = document.querySelectorAll( "a" );
    links.forEach( ( link ) => {
        link.addEventListener( "click", function ( event ) {
            event.preventDefault();
            const nextPageUrl = link.getAttribute( "href" );
            history.pushState( "", "", nextPageUrl );
            loadPage( location.pathname );
        } );
    } );
};

const loadPage = ( pathname: string ) => {
    let route;

    if ( pathname in routes ) {
        route = routes[pathname];
    } else {
        route = routes["*"];
    }

    if ( route?.auth === true ) {
        if ( isAuthenticated() === false ) {
            window.history.pushState( "", "", "/login.html" );
            loadPage( "/login.html" );
            return;
        }
    }

    if ( route?.template ) {
        const root = document.getElementById( "root" ) as HTMLElement;
        const tpl = ( document.getElementById( route.template ) as HTMLTemplateElement )
            .innerHTML;
        root.innerHTML = tpl;
    }

    if ( route?.Controller ) {
        new route.Controller().load();
        setupLinks();
    }
};

window.addEventListener( "popstate", function () {
    loadPage( location.pathname );
} );

loadPage( location.pathname );

export { loadPage };
