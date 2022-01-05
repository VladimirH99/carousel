function Carousel() {
    this.container = document.querySelector('#carousel');
    this.slides = this.container.querySelectorAll('.slide');
    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');

}

Carousel.prototype = {
    _initProps() {
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.CODE_SPACE = 'Space';
        this.SLIDES_COUNT = this.slides.length;
        this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fas fa-play-circle"></i>';

        this.currentSlide = 0;
        this.isPlaying = true;
        this.interval = 2000;
    },

    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
        document.addEventListener('keydown', this._pressKey.bind(this));
    },
    _gotoNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },
    _gotoNext() {
        this._gotoNth(this.currentSlide + 1)
    },
    _gotoPrev() {
        this._gotoNth(this.currentSlide - 1)
    },

    _pause() {
        if (this.isPlaying) {
            clearInterval(this.timerID);
            this.pauseBtn.innerHTML = this.FA_PLAY;
            this.isPlaying = false;
        }
    },
    _play() {
        this.timerID = setInterval(() => this._gotoNext(), this.interval);
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
    },

    _indicate(e) {
        this.target = e.target;
        if (this.target.classList.contains('indicator')) {
            this._pause();
            this._gotoNth(+this.target.dataset.slideTo);
        }
    },
    _pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },

    pausePlay() {
        this.isPlaying ? this._pause() : this._play()
    },

    init() {
        this._initProps();
        this._initListeners();
        this.timerID = setInterval(() => this._gotoNext(), this.interval);
    },
    next() {
        this._pause();
        this._gotoNext();
    },
    prev() {
        this._pause();
        this._gotoPrev();
    },
};

Carousel.prototype.constructor = Carousel;





