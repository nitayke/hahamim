export function showLoader() {
    show('loader');
    show('dark-screen');
}

export function hideLoader() {
    hide('loader');
    hide('dark-screen');
}

export function hide(id) {
    document.getElementById(id).hidden = true;
}

export function show(id) {
    document.getElementById(id).hidden = false;
}

export function addError(errorPlace, errorText) {
    errorPlace.previousElementSibling.classList.add("make-it-red");
    errorPlace.innerHTML = errorText;
}