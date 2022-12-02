let toggle = 0;
function toggle_dropdown_menu() {
    if (toggle %2 == 0) {
        document.getElementById('menu-dropdown').classList.add('show-dropdown');
        document.getElementById('menu-dropdown').classList.remove('hide-dropdown');
        toggle++;
    }
    else if (toggle %2 == 1) {
        document.getElementById('menu-dropdown').classList.add('hide-dropdown');
        document.getElementById('menu-dropdown').classList.remove('show-dropdown');
        toggle++;
    }
}