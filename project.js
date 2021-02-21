const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardbody = document.getElementsByClassName("card-body")[1];
const clear = document.getElementById("clear-films");



// UI Initializing the Object
const ui = new UI();

// Produce Storage Item
const storage = new Storage();

// Loading all events
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);

    });

    cardbody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);

}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Error Catch 
        ui.displayMessages("Fill in all fields ...", "danger");

    } else {
        // New Film
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);
        ui.displayMessages("The movie was successfully added ...", "success");
    }

    ui.clearInputs(titleElement, urlElement, directorElement);
    e.preventDefault();
}

function deleteFilm(e) {

    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Deletion is successful ...", "success");

    }

}

function clearAllFilms() {

    if (confirm("Are You Sure ?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();

    }


}