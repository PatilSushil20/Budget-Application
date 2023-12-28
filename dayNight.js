const body = document.querySelector("body")
const btn = document.getElementById("toggleBtn")
const mode = localStorage.getItem('mode');

if (mode) {
    applyMode(mode);
}

// ------------------------- Toggle Day and Night Mode -------------------------
function toggleDayNight() {
    if (body.classList.contains('active')) {
        body.classList.remove('active');
        btn.innerHTML = "Night"
        btn.style.backgroundColor = "black";
        btn.style.color = "white";
    }
    else {
        body.classList.add('active');
        btn.innerHTML = "Day"
        btn.style.backgroundColor = "white";
        btn.style.color = "black";
    }

    
    // ------------------------- store mode in localstotage -------------------------
    localStorage.setItem("mode", body.classList.contains('active') ? 'night' : 'day');
}


// ------------------------- this is function that apply class active -------------------------
function applyMode(mode) {
    if (mode === 'night') {
        body.classList.add('active');
        btn.innerHTML = "Day"
        btn.style.backgroundColor = "white";
        btn.style.color = "black";
    }
    else {
        body.classList.remove('active');
        btn.innerHTML = "Night"
        btn.style.backgroundColor = "black";
        btn.style.color = "white";
    }

}
