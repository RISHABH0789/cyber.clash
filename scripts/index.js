function nxt_page(btn){
    character_value = btn.value;
    localStorage.setItem("value",character_value);
    window.location.href = "game.html";
}
