(function () {
    const container = document.querySelector('#carousel');
    const slides = container.querySelectorAll('.slide');
    const indicatorsContainer = container.querySelector('.indicators');
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    const pauseBtn = container.querySelector('#pause-btn');
    const prevBtn = container.querySelector('#prev-btn');
    const nextBtn = container.querySelector('#next-btn');
    const CODE_LEFT_ARROW = 'ArrowLeft';
    const CODE_RIGHT_ARROW = 'ArrowRight';
    const CODE_SPACE = 'Space';
    const SLIDES_COUNT = slides.length;
    const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    const FA_PLAY = '<i class="fas fa-play-circle"></i>';

    let currentSlide = 0;
    let isPlaying = true;
    let timerID = null;
    let interval = 2000;
    let swipeStartX = null;
    let swipeEndX = null;

    function gotoNth(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    };

    const gotoNext = () => gotoNth(currentSlide + 1);
    const gotoPrev = () => gotoNth(currentSlide - 1);

    function pause() {
        if (isPlaying) {
            clearInterval(timerID);
            pauseBtn.innerHTML = FA_PLAY;
            isPlaying = false;
        }
    }
    function play() {
        timerID = setInterval(gotoNext, interval);
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaying = true;
    }

    const pausePlay = () => isPlaying ? pause() : play();

    function next() {
        pause();
        gotoNext();
    }
    function prev() {
        pause();
        gotoPrev();
    }
    function indicate(e) {
        const target = e.target;

        if (target.classList.contains('indicator')) {
            pause();
            gotoNth(+target.dataset.slideTo);
        }
    }
    function pressKey(e) {
        if (e.code === CODE_LEFT_ARROW) prev();
        if (e.code === CODE_RIGHT_ARROW) next();
        if (e.code === CODE_SPACE) pausePlay();
    }
    const swipeStart = (e) => swipeStartX = e.changedTouches[0].pageX;

    function swipeEnd(e) {
        swipeEndX = e.changedTouches[0].pageX;
        swipeStartX - swipeEndX > 100 && next();
        swipeStartX - swipeEndX < -100 && prev();
    }

    function initListeners() {
        pauseBtn.addEventListener('click', pausePlay);
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
        indicatorsContainer.addEventListener('click', indicate);
        document.addEventListener('keydown', pressKey);
        container.addEventListener('touchstart', swipeStart);
        container.addEventListener('touchend', swipeEnd);
    };
    function init() {
        initListeners()
        timerID = setInterval(gotoNext, interval);
    };
    init();

})();




