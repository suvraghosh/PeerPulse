// Show and Hide Functionality for password

const showHide = document.getElementById("show-hide");
let showInput = document.getElementById("show-password");
showHide.addEventListener("click", () => {
    showHide.classList.toggle('show');

    if (showHide.classList.contains('show')) {
        showHide.classList.remove('fa-eye-slash');
        showHide.classList.add('fa-eye');
        showInput.setAttribute('type', 'text');
    } else {
        showHide.classList.remove('fa-eye');
        showHide.classList.add('fa-eye-slash');
        showInput.setAttribute('type', 'password');
    }
});