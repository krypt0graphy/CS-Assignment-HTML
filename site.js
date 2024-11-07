function toggleDropdown() {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function showPostWindow() {
    document.getElementById("postWindow").style.display = "flex";
    closeDropdown(); // Close the dropdown after opening the post window
}

function closeDropdown() {
    document.getElementById("dropdownMenu").style.display = "none";
}

function closePostWindow() {
    document.getElementById("postWindow").style.display = "none";
}

function post() {
    //Blank for now until database integration
}
