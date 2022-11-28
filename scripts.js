function detectmobile() {
    const isMobile = navigator.userAgentData.mobile;
    var path = window.location.pathname;
    console.log(path);
    var page = path.split("/").pop();
    console.log( page );
}

window.onload = detectmobile();