function check(input) {
    if (input.value != document.querySelector('.password').value) {
        input.setCustomValidity('Both password should match.');
    } else {
        input.setCustomValidity('');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const password = document.querySelector('.register .password');
    const passwordConfirm = document.querySelector('.passwordConfirm');
    const profileImage = document.querySelector('.profileImage .edit');
    if (password) password.addEventListener('keyup', ev => {
        let warning = document.querySelector('.passwordRule');
        if (ev.target.value.length >= 8 || ev.target.value.length == 0) warning.style.display = 'none'
        else if (ev.target.value.length < 8) warning.style.display = 'block'
    })
    if (passwordConfirm) passwordConfirm.addEventListener('keyup', ev => {
        let warning = document.querySelector('.passwordRule2');
            if (ev.target.value === password.value) warning.style.display = 'none'
            if (ev.target.value !== password.value) warning.style.display = 'block'
    })
    if (profileImage) profileImage.addEventListener('click', ev => {
        document.querySelector('.hiddenInput').click()
    })
})