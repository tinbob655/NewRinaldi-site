function init() {
    if (window.mobileCheck == false || navigator.userAgentData == false) { //desktop detection and redirection
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
    if (location == 'mobile-index.html') {      //introbox activation checker
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
    if ((location != 'mobile-index.html' || sessionStorage.getItem('first load') == 'false') && location != 'mobile-music.html') {       //audio activaiton
        setTimeout(() => {
            first_track('not initial');
            audio_fadin();
        }, 1000);
    };
    sessionStorage.setItem('first load', 'false');
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

function audio_fadin() {
    const audio = document.getElementById('audio');
    async function fadin() {
        const timer = ms => new Promise (res => setTimeout(res, ms));
        for (let e = 0; e < 10; e++) {
            audio.volume = e/10;
            await timer(100);
        };
    };
    fadin();
}

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

function openNav() {
    document.getElementById("sidenav").style.width = "33%";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0%";
}

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

function clense_src_input(src) {
    src = src.substring(src.lastIndexOf('/')+1).replace('20', '').replace('%', ' ');
    return(src);
};

function gallery_refresh() {
    if (clense_src_input(document.getElementById('image1').src) != clense_src_input(gallery_images[0])) {
        gallery_change(gallery_images[0], gallery_images[1], gallery_images[2]);
        gallery_num = 1;
    };   
};

function gallery_move() {
    gallery_change(gallery_images[is_in_bounds(0, 8, gallery_num%9)], gallery_images[is_in_bounds(0, 8, (gallery_num%9) +1)], gallery_images[is_in_bounds(0, 8, (gallery_num%9) +2)]);
    gallery_num++;
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

var gallery_num = 1;
const gallery_images = ['images/Merch/black hoodie.webp',
                        'images/Merch/black long sleeve t-shirt.webp',
                        'images/Merch/Black t-shirt.webp',
                        'images/Merch/blue t-shirt.webp',
                        'images/Merch/Todd is bad at golf t-shirt.webp',
                        'images/Merch/tote bag.webp',
                        'images/Merch/White Hoodie.webp',
                        'images/Merch/white long sleeve t-shirt.webp',
                        'images/Merch/white t-shirt.webp']

window.onload = init()

window.mobileCheck = function() {   //mobile detection
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};