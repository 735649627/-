var ul = document.getElementsByTagName('ul')[0];
var key, keys, len = 0,
    velocity = 5,
    lock = true,
    direction = 10,
    stime, ltime = new Date().getTime(),
    interval = 5000,
    loc = 0,
    distance = 1000;
var d1 = document.getElementsByClassName('d1')[0],
    d2 = document.getElementsByClassName('d2')[0],
    d3 = document.getElementsByClassName('d3')[0],
    d4 = document.getElementsByClassName('d4')[0];
var play = function () {
    ul.style.right = parseInt(window.getComputedStyle(ul, null).right) + direction + 'px';
    len += direction;
    if (window.getComputedStyle(ul, null).right == "4000px") {
        ul.style.right = "0px";
    }
    if (len == distance || len == -distance) {
        if (direction < 0) direction = -1 * direction;
        loc = parseInt(window.getComputedStyle(ul, null).right);
        d1.classList.remove("you") || d2.classList.remove("you") || d3.classList.remove("you") || d4.classList.remove("you");
        switch (loc) {
            case 0:
                d1.classList.add("you");
                break;
            case 1000:
                d2.classList.add("you");
                break;
            case 2000:
                d3.classList.add("you");
                break;
            case 3000:
                d4.classList.add("you");
                break;
            case 4000:
                d1.classList.add("you");
                break;
        }
        clearInterval(key);
        len = 0;
        lock = true;
        distance = 1000;
    }
}
var playInterval = function () {
    keys = setInterval(function () {
        key = setInterval(play, velocity);
    }, interval);
}
playInterval();
var btl = document.getElementsByClassName("btl")[0],
    btr = document.getElementsByClassName("btr")[0];
btl.addEventListener("click", function () {
    stime = new Date().getTime();
    if (stime - ltime >= 1000 && len == 0) {
        if (window.getComputedStyle(ul, null).right == "0px") {
            ul.style.right = "4000px";
        }
        clearInterval(keys);
        direction = -1 * direction;
        key = setInterval(play, velocity);
        playInterval();
    } else stime = ltime;
    ltime = stime;
}, false);
btr.addEventListener("click", function () {
    if (window.getComputedStyle(ul, null).right == "4000px") {
        ul.style.right = "0px";
    }
    stime = new Date().getTime();
    if (stime - ltime >= 1000 && len == 0) {
        clearInterval(keys);
        key = setInterval(play, velocity);
        playInterval();
    } else stime = ltime;
    ltime = stime;
}, false);
var tiaozhuan = function (n) {
    if (lock == true) {
        lock = false;
        now = parseInt(window.getComputedStyle(ul, null).right);
        if (now >= 3000 && now <= 4000 && n < 2000) now -= 4000;
        if (now > n) {
            clearInterval(keys);
            clearInterval(key);
            len = 0;
            direction = -1 * direction;
            distance = now - n;
            key = setInterval(play, velocity);
            playInterval();
        } else if (now < n) {
            clearInterval(keys);
            clearInterval(key);
            len = 0;
            distance = n - now;
            key = setInterval(play, velocity);
            playInterval();
        }
    }
}
d1.addEventListener("click", function () {
    tiaozhuan(0);
}, false);
d2.addEventListener("click", function () {
    tiaozhuan(1000);
}, false);
d3.addEventListener("click", function () {
    tiaozhuan(2000);
}, false);
d4.addEventListener("click", function () {
    tiaozhuan(3000);
}, false);