function init() {
    if (navigator.userAgentData.mobile == false) {
        var HTMLfilename = document.location.href;
        var filename = HTMLfilename.substring(HTMLfilename.lastIndexOf('/') + 1);
        filename = filename.replace('mobile-', '');
        document.location = filename;
        console.log(filename)
    };
};

function openNav() {
    document.getElementById("sidenav").style.width = "33%";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0%";
}

window.onload = init()