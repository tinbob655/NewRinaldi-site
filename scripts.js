function init() {
    if (navigator.userAgentData.mobile == true) {      //mobile detection and redirection
        var HTMLfilename = document.location.href;
        var filename = HTMLfilename.substring(HTMLfilename.lastIndexOf('/') + 1);
        if (filename != '') {
            filename = 'mobile-'+filename;
        }
        else if (filename == '') {
            filename = 'mobile-index.html';
        };
        document.location = filename;
        return('');
    };
    const location = document.location.href.substring(document.location.href.lastIndexOf('/') +1);
    if (location == 'index.html') {         //introbox activation checker
        if (sessionStorage.getItem('first load') == 'false') {
            setTimeout(() => {
                document.getElementById('introbox').classList.add('cleared');
                setTimeout(() => {
                    document.getElementById('introbox').style.with = 0;
                    document.getElementById('introbox').style.height = 0;
                }, 1001);
            }, 1000);
        };
    };
    if ((location != 'index.html' || sessionStorage.getItem('first load') == 'false') && location != 'music.html') {  //audio activation
        setTimeout(()=> {
            first_track('not initial');
            audio_fadin();
        }, 1000);
    };
    sessionStorage.setItem('first load', 'false');
};

const gallery_images = ['images/Merch/black hoodie.webp',
                        'images/Merch/black long sleeve t-shirt.webp',
                        'images/Merch/Black t-shirt.webp',
                        'images/Merch/blue t-shirt.webp',
                        'images/Merch/Todd is bad at golf t-shirt.webp',
                        'images/Merch/tote bag.webp',
                        'images/Merch/White Hoodie.webp',
                        'images/Merch/white long sleeve t-shirt.webp',
                        'images/Merch/white t-shirt.webp',]

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

function clense_src_input(src) {
    src = src.substring(src.lastIndexOf('/')+1).replace('%', ' ').replace('20', '');
    return(src);
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

function gallery_refresh() {
    if (clense_src_input(document.getElementById('image1').src) != clense_src_input(gallery_images[0])) {
        gallery_change(gallery_images[0], gallery_images[1], gallery_images[2]);
        gallery_num = 1;
    };
}

function gallery_move() {
    gallery_change(gallery_images[is_in_bounds(0, 8, gallery_num%9)], gallery_images[is_in_bounds(0, 8, (gallery_num%9) +1)], gallery_images[is_in_bounds(0, 8, (gallery_num%9) +2)]);
    gallery_num++;
};

function next_track() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.volume = 1.0;
    if (clense_src_input(sessionStorage.getItem('current track')) == 'Jumping Around.mp3') {
        audio.src = 'Music/Skidaddle.mp3';
    }
    else {
        audio.src = 'Music/Jumping Around.mp3'   
    };
    sessionStorage.setItem('current track', audio.src);
    audio.currentTime = 0;
    audio.play();
};

function audio_fadin() {
    const audio = document.getElementById('audio');
    async function fadin() {
        const timer = milliseconds => new Promise (res => setTimeout(res, milliseconds));
        for (let e = 0; e < 100; e++) {
            audio.volume = e/100;
            await timer(50);
        };
    };
    fadin();
};

function first_track(initial) {
    const audio = document.getElementById('audio');
    audio.load();
    if (initial == 'initial') {
        var track = Math.floor(Math.random() *2);
        if (track == 0) {
            audio.src = 'Music/Jumping Around.mp3';
        }
        else {
            audio.src = 'Music/Skidaddle.mp3';
        }; 
        audio.play();     
    } 
    else if (initial == 'not initial') {
        audio.src = sessionStorage.getItem('current track');
        audio.currentTime = sessionStorage.getItem('audio duration');
        audio.play();
    };
    sessionStorage.setItem('current track', audio.src);
};

function introbox_cleared() {
    const introbox = document.getElementById('introbox');
    introbox.classList.add('cleared');
    setTimeout(() => {
        introbox.style.with = 0;
        introbox.style.height = 0;
    }, 1001);
    first_track('initial');
};

function change_page(page) {
    const audio = document.getElementById('audio');
    document.body.style.opacity = 0.0;
    async function mute_audio() {
        const timer = miliseconds => new Promise (res => setTimeout(res, miliseconds));
        for (let a = 0; a < 10; a++) {
            audio.volume = 1 - (a/10);
            await timer(100);
        };
        await timer(100);
        audio.volume = 0.0;
        sessionStorage.setItem('audio duration', audio.currentTime);
        audio.pause();
        document.location = page;
    };
    mute_audio();
};

gallery_num = 1;

window.onload = init();