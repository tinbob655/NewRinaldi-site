function detectmobile() {
    const isMobile = navigator.userAgentData.mobile;
    var url = window.location.pathname;
    var filename = url.toLowerCase.substring(url.lastIndexOf('/')+1);
}

window.onload = detectmobile();