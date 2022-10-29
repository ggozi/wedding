$(function(){
    var swiper = new Swiper(".swiperThumb", {
        loop: true,
        spaceBetween: 5,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".swiperTop", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".sw_btn.next",
            prevEl: ".sw_btn.prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });
});

$(document).ready(function(){
    $(document).snowfall({
        image : "./images/snmow_flower.png",
        minSize: 5,
        maxSize:15,
        flakeColor: '#ffd1f7',
        round:true,
        minSpeed:1,
        maxSpeed:2
     });

    $(document).find('html').stop().animate({
        fontSize: ($(window).innerWidth()) * 10 / 360
        },0);
    $(window).resize(function(){
        $(document).find('html').stop().animate({
            fontSize: ($(window).innerWidth()) * 10 / 360
        },300);
    });



    var mapContainer = document.getElementById('weddingMap'), // 지도를 표시할 div

    mapOption = { 
        center: new kakao.maps.LatLng(37.52927123820142, 126.92503755059506), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    var imageSrc = './images/ico_marker.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(32, 45), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(16, 50)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(37.52927123820142, 126.92503755059506); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition, 
        image: markerImage // 마커이미지 설정 
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map); 


});

document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
         event.preventDefault(); 
       } 
   }, false);

var lastTouchEnd = 0; 

document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
         event.preventDefault(); 
       } lastTouchEnd = now; 
   }, false);
