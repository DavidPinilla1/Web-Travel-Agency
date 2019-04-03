
function check(input) {
    if (input.value != document.querySelector('.password').value) {
        input.setCustomValidity('Both password should match.');
    } else {
        input.setCustomValidity('');
    }
}