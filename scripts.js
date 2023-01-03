function init() {
    if (navigator.userAgentData.mobile == true) {
        var HTMLfilename = document.location.href;
        var filename = HTMLfilename.substring(HTMLfilename.lastIndexOf('/') + 1);
        if (filename != '') {
            filename = 'mobile-'+filename;
        }
        else if (filename == '') {
            filename = 'mobile-index.html';
        };
        document.location = filename;
    };
};

window.onload = init();