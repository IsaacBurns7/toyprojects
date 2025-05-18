function togglePopup(button) {
    const popup = button.nextElementSibling;
    if(popup.style.display === "none"){
        popup.style.display = "block";
        button.textContent = "Hide Description";
    } else {
        popup.style.display = "none";
        button.textContent = "Show Description";
    }
}