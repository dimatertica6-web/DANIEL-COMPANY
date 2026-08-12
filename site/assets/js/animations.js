class AnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    if (entry.target.classList.contains('fade-up')) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                }
            });
        }, { threshold: 0.1 });

        this.observeElements();
    }

    observeElements() {
        var elements = document.querySelectorAll('.fade-up, .slide-in, .scale-in, .card, .mini-stat');
        var self = this;
        elements.forEach(function(el) {
            if (!el.classList.contains('animated')) {
                self.observer.observe(el);
            }
        });
    }

    addAnimation(element, animationClass) {
        element.classList.add(animationClass);
        this.observer.observe(element);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

function initAnimations() {
    var animManager = new AnimationManager();
    window.animManager = animManager;

    setTimeout(function() {
        document.querySelectorAll('.fade-up').forEach(function(el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
}

window.initAnimations = initAnimations;
