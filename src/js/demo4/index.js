import {preloadImages, preloadFonts, clamp, map, randomNumber} from '../utils';
import Cursor from '../cursor';
import LocomotiveScroll from 'locomotive-scroll';


const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal'
});

// let's rotate the elements when scrolling.
const elems = [...document.querySelectorAll('.gallery__item')]
const rotationsArr = Array.from({length: elems.length}, () => randomNumber(-30,30));
const translationArr = Array.from({length: elems.length}, () => randomNumber(-100,100));
lscroll.on('scroll', (obj) => {
    for (const key of Object.keys(obj.currentElements)) {
        const el = obj.currentElements[key].el;
        const idx = elems.indexOf(el);
        if ( obj.currentElements[key].el.classList.contains('gallery__item') ) {
            let progress = obj.currentElements[key].progress;
            //const scaleVal = progress < 0.5 ? clamp(map(progress,0,0.5,1.2,0.5),0.5,1.2) : clamp(map(progress,0.5,1,0.5,1.2),0.5,1.2);
            const rotationVal = progress > 0.6 ? clamp(map(progress,0.6,1,0,rotationsArr[idx]), Math.min(0,rotationsArr[idx]), Math.max(0,rotationsArr[idx])) : 0;
            const translationVal = progress > 0.6 ? clamp(map(progress,0.6,1,0,translationArr[idx]), Math.min(0,translationArr[idx]), Math.max(0,translationArr[idx])) : 0;
            //obj.currentElements[key].el.style.transform = `scale(${scaleVal})`
            obj.currentElements[key].el.style.transform = `translateY(${translationVal}%) rotate(${rotationVal}deg)`
        }
    }
});
lscroll.update();

// Preload images and fonts
Promise.all([preloadImages('.gallery__item-imginner'), preloadFonts('vxy2fer')]).then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');

    // Initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // Mouse effects on all links and others
    [...document.querySelectorAll('a,.gallery__item-img,.gallery__item-number,#cercle')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});

let acceuil = document.getElementById("acceuil");
let menu = document.getElementById("menu");
let btn_menu_open = document.getElementById("btn_menu_open");
let bars = document.getElementById("bars");
let close = document.getElementById("close");
let arrow = document.getElementById("arrow");
let count=1;
let overlay = document.getElementById("overlay");
let cache = document.getElementById("cache");

btn_menu_open.addEventListener("click", () => {
        menu.style.display = "block";
        acceuil.style.display = "none";
        btn_menu_open.style.display = "none";
        btn_menu_close.style.display= "block";
  })

  btn_menu_close.addEventListener("click", () => {
        menu.style.display = "none";
        acceuil.style.display = "block";
        btn_menu_open.style.display = "block";
        btn_menu_close.style.display= "none";
  })

var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
var textWrapper2 = document.querySelector('.ml3');
textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    function onReady(callback) {
        var intervalId = window.setInterval(function() {
          if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
          }
        }, 1000);
      }
    
  onReady(function() {
    cache.style.visibility = "visible";
    anime.timeline({loop: false})
    .add({
        targets: '.ml2 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i,
    }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 2000
      });
    anime.timeline({loop: false})
    .add({
        targets: '.ml3 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i+1000 ,
    }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });

      setTimeout(function(){
        overlay.style.display = "none";
        btn_menu_open.style.display = "block"
      },5000)
  });


   