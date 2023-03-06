function opentab( evt: Event, tab: string ) {
    let i;
    const tabcontent = document.getElementsByClassName(
        "tabcontent"
    ) as HTMLCollectionOf<HTMLElement>;
    for ( i = 0; i < tabcontent.length; i++ ) {
        tabcontent[i].style.setProperty( "display", "none" );
    }
    const tablinks = document.getElementsByClassName( "tablinks" );
    for ( i = 0; i < tablinks.length; i++ ) {
        tablinks[i].className = tablinks[i].className.replace( " active", "" );
    }
    ( document.getElementById( tab ) as HTMLElement ).style.display = "block";
    ( document.getElementById( tab ) as HTMLElement ).style.borderBottom = "block";
    ( evt.currentTarget as HTMLElement ).className += " active";
}
function defaultOpen() {
    ( document.getElementById( "default-open" ) as HTMLElement ).click();
}

export { defaultOpen, opentab };
