$(function(){
    gallery();
    kakaoUi.init();
    popUi();
    copyUi();

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
    
});


const playerButton = document.querySelector('.player-button'),
      audio = document.querySelector('audio'),
      timeline = document.querySelector('.timeline'),
      soundButton = document.querySelector('.sound-button'),
      playIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
  </svg>
      `,
      pauseIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
      `,
      soundIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
</svg>`,
      muteIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg>`;

function toggleAudio () {
  if (audio.paused) {
    audio.play();
    playerButton.innerHTML = pauseIcon;
  } else {
    audio.pause();
    playerButton.innerHTML = playIcon;
  }
}

playerButton.addEventListener('click', toggleAudio);

function changeTimelinePosition () {
  const percentagePosition = (100*audio.currentTime) / audio.duration;
  timeline.style.backgroundSize = `${percentagePosition}% 100%`;
  timeline.value = percentagePosition;
}

audio.ontimeupdate = changeTimelinePosition;

function audioEnded () {
  playerButton.innerHTML = playIcon;
}

audio.onended = audioEnded;

function changeSeek () {
  const time = (timeline.value * audio.duration) / 100;
  audio.currentTime = time;
}

timeline.addEventListener('change', changeSeek);

function toggleSound () {
  audio.muted = !audio.muted;
  soundButton.innerHTML = audio.muted ? muteIcon : soundIcon;
}

soundButton.addEventListener('click', toggleSound);

var copyUi = function(){
    var $btnCopy = $('.btn_copy');
    $btnCopy.each(function(){
        var $this = $(this),
            $numTit = $this.siblings('.account_num').attr('title');

        $this.on('click',function(){
            alert('계좌번호를 복사하였습니다');
            copyToClipboard($numTit);
        });
    })

    function copyToClipboard(val) {
        var t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    }
}

var gallery = function(){
    
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
    
}
var $popSpeed = 300,
	$popOpenBtn = '';
var popUi = function(){
    var $popBtn = $('.ui-pop-open');

    $popBtn.each(function(){
        var $this = $(this);
        $this.on('click',function(){
            var $thHref = $this.attr('href');

            $($thHref).addClass('is_visible');
            $('body').css('overflow','hidden');
        });
    });

    var $popClose = $('.pop_close');

    $popClose.on('click',function(){
        $(this).parents('.pop_wrap').removeClass('is_visible');
        $('body').removeAttr('style');
    });
}

var kakaoUi = {
    init : function(){
        kakaoUi.map();
        kakaoUi.link();
    },
    map : function(){
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
    },
    link : function(){
        Kakao.init('0e98cc5dddc715cc4db771a02017b856');
        Kakao.Link.createScrapButton({
            container: '#kakao-link-btn',
            requestUrl: 'https://ggozi.github.io',
            templateId : 85055
        });
    }

}