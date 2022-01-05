function SwipeCarousel() {
    Carousel.apply(this, arguments)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._swipeStart = function (e) {
    this.swipeStartX = e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEnd = function (e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
};
SwipeCarousel.prototype._initListeners = function () {
    Carousel.prototype._initListeners.apply(this);
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
};
