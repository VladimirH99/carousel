function Carousel() {
    this.container = document.querySelector('#carousel');
    this.slides = this.container.querySelectorAll('.slide');
    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');

    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.SLIDES_COUNT = this.slides.length;
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';

    this.currentSlide = 0;
    this.isPlaying = true;
    this.timerID = null;
    this.interval = 2000;
    this.swipeStartX = null;
    this.swipeEndX = null;
}

Carousel.prototype = {
    gotoNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },
    gotoNext() {
        this.gotoNth(this.currentSlide + 1)
    },
    gotoPrev() {
        this.gotoNth(this.currentSlide - 1)
    },

    pause() {
        if (this.isPlaying) {
            clearInterval(this.timerID);
            this.pauseBtn.innerHTML = this.FA_PLAY;
            this.isPlaying = false;
        }
    },
    play() {
        this.timerID = setInterval(this.gotoNext, this.interval);
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
    },

    pausePlay() {
        this.isPlaying ? this.pause() : this.play()
    },

    next() {
        this.pause();
        this.gotoNext();
    },
    prev() {
        this.pause();
        this.gotoPrev();
    },
    indicate(e) {
        this.target = e.target;
        if (this.target.classList.contains('indicator')) {
            this.pause();
            this.gotoNth(+this.target.dataset.slideTo);
        }
    },
    pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },
    swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    },

    swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        this.swipeStartX - this.swipeEndX > 100 && this.next();
        this.swipeStartX - this.swipeEndX < -100 && this.prev();
    },

    initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay);
        this.prevBtn.addEventListener('click', this.prev);
        this.nextBtn.addEventListener('click', this.next);
        this.indicatorsContainer.addEventListener('click', this.indicate);
        document.addEventListener('keydown', this.pressKey);
        this.container.addEventListener('touchstart', this.swipeStart);
        this.container.addEventListener('touchend', this.swipeEnd);
    },
    init() {
        this.initListeners();
        this.timerID = setInterval(this.gotoNext, this.interval);
    }
};





