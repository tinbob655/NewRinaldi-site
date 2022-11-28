function detectmobile() {
    const isMobile = navigator.userAgentData.mobile;
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    console.log("mobile-"+filename);
}

window.onload = detectmobile();