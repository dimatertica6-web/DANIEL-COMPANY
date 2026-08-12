class EventManager {
    constructor() {
        this.events = {};
        this.init();
    }

    init() {
        this.bindGlobalEvents();
    }

    bindGlobalEvents() {
        var self = this;
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                self.emit('escape');
            }
        });

        document.addEventListener('click', function(e) {
            var target = e.target.closest('[data-event]');
            if (target) {
                var eventName = target.dataset.event;
                self.emit(eventName, target);
            }
        });

        document.addEventListener('scroll', function() {
            self.emit('scroll', window.scrollY);
        });

        window.addEventListener('resize', function() {
            self.emit('resize', {
                width: window.innerWidth,
                height: window.innerHeight
            });
        });
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(function(cb) {
            return cb !== callback;
        });
    }

    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(function(callback) {
            callback(data);
        });
    }

    once(event, callback) {
        var self = this;
        var wrapper = function(data) {
            callback(data);
            self.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}

function initEventListeners() {
    var eventManager = new EventManager();
    window.eventManager = eventManager;

    eventManager.on('escape', function() {
        document.querySelectorAll('.modal--open').forEach(function(modal) {
            modal.classList.remove('modal--open');
        });
        document.body.style.overflow = '';
    });

    eventManager.on('scroll', function(scrollY) {
        var header = document.querySelector('.navbar');
        if (header) {
            if (scrollY > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    });
}

window.initEventListeners = initEventListeners;
