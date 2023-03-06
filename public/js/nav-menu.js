const menuToggler = document.querySelector( '.menu-toggler' );
const nav = document.querySelector( '.navbar' );
const logoutBtn = document.querySelector( '#btn-logout' )



menuToggler.addEventListener( 'click', function() {
    nav.classList.toggle( 'd-sm-none' );
});

logoutBtn.addEventListener( 'click', function() {
    localStorage.clear();
    window.location = './login.html';
});