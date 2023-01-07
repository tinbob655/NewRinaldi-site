function init() {
    if (navigator.userAgentData.mobile == false) {
        var HTMLfilename = document.location.href;
        var filename = HTMLfilename.substring(HTMLfilename.lastIndexOf('/') + 1);
        if (filename != '') {
            filename = filename.replace('mobile-', '');
        }
        else if (filename == '') {
            filename = 'index.html';
        };
        document.location = filename;
    };
    const location = document.location.href.substring(document.location.href.lastIndexOf('/') +1);
    if (location != 'mobile-index.html' && location != 'mobile-music.html') {
        setTimeout(() => {
            next_track();
        }, 1000);
    };
};

function next_track() {
    const audio = document.getElementById('audio');
    audio.pause();
    if (track%2 == 0) {
        audio.src= 'Music/R4R theme.mp3';
    }
    else {
        audio.src = 'Music/March Of Leader Ransome.mp3';
    };
    track++;
    setTimeout(() => {
        audio.play();
    }, 500);
};

function introbox_cleared() {
    const introbox = document.getElementById('introbox');
    introbox.classList.add('cleared');
    setTimeout(() => {
        introbox.style.with = 0;
        introbox.style.height = 0;
        next_track();
    }, 1001);
};

function openNav() {
    document.getElementById("sidenav").style.width = "33%";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0%";
}

const gallery_images = ['images/Merch/black hoodie.webp',
                        'images/Merch/black long sleeve t-shirt.webp',
                        'images/Merch/Black t-shirt.webp',
                        'images/Merch/blue t-shirt.webp',
                        'images/Merch/Todd is bad at golf t-shirt.webp',
                        'images/Merch/tote bag.webp',
                        'images/Merch/White Hoodie.webp',
                        'images/Merch/white long sleeve t-shirt.webp',
                        'images/Merch/white t-shirt.webp']

function gallery_change(src1, src2, src3) {
    const gallery = document.getElementById('gallery');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');
    gallery.style.opacity = 0.0;
    setTimeout(() => {
        image1.src = src1;
        image2.src = src2;
        image3.src = src3;
        setTimeout(() => {
            gallery.style.opacity = 1.0;
        }, 500);
    }, 500);
};

function is_in_bounds(lower, upper, input) {
    if (input > upper) {
        var difference = input - upper -1;
        input = lower + difference;
    }
    else if (input < lower) {
        var difference = lower - input -1;
        input = upper - difference;
    };
    return(input);
};

function clense_srcinput(src) {
    src = src.substring(src.lastIndexOf('/')+1).replace('20', '').replace('%', ' ');
    return(src);
};

function gallery_refresh() {
    if (clense_srcinput(document.getElementById('image1').src) != clense_srcinput(gallery_images[0])) {
        gallery_change(gallery_images[0], gallery_images[1], gallery_images[2]);
        gallery_num = 1;
    };   
};

function gallery_move() {
    gallery_change(gallery_images[is_in_bounds(0, 8, gallery_num%9)], gallery_images[is_in_bounds(0, 8, (gallery_num%9) +1)], gallery_images[is_in_bounds(0, 8, (gallery_num%9) +2)]);
    gallery_num++;
};

var gallery_num = 1;
var track = Math.floor(Math.random() *2);

window.onload = init()