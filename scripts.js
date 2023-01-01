function init() {
    if (navigator.userAgentData.mobile == true) {
        var HTMLfilename = document.location.href;
        var filename = HTMLfilename.substring(HTMLfilename.lastIndexOf('/') + 1);
        filename = 'mobile-'+filename;
        document.location = filename;
        console.log(filename)
    };
};

window.onload = init();