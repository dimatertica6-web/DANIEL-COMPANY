class Component {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        console.log('Компонент инициализирован: ' + this.element.dataset.component);
    }
}

class Card extends Component {
    init() {
        super.init();
        var self = this;
        this.element.addEventListener('click', function() {
            self.element.classList.toggle('card--active');
        });
    }
}

class Modal extends Component {
    init() {
        super.init();
        var self = this;
        this.closeBtn = this.element.querySelector('.modal__close');
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', function() {
                self.close();
            });
        }
        this.element.addEventListener('click', function(e) {
            if (e.target === self.element) {
                self.close();
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && self.element.classList.contains('modal--open')) {
                self.close();
            }
        });
    }

    open() {
        this.element.classList.add('modal--open');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.element.classList.remove('modal--open');
        document.body.style.overflow = '';
    }
}

class Sidebar extends Component {
    init() {
        super.init();
        var self = this;
        this.links = this.element.querySelectorAll('a');
        this.links.forEach(function(link) {
            link.addEventListener('click', function() {
                self.links.forEach(function(l) {
                    l.classList.remove('active');
                });
                link.classList.add('active');
            });
        });
    }
}

var components = {
    card: Card,
    modal: Modal,
    sidebar: Sidebar
};

function initComponents() {
    document.querySelectorAll('[data-component]').forEach(function(el) {
        var type = el.dataset.component;
        if (components[type]) {
            new components[type](el);
        }
    });
}

window.initComponents = initComponents;
