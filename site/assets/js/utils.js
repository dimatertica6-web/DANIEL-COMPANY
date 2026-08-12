var Utils = {
    debounce: function(func, wait) {
        var timeout;
        return function executedFunction() {
            var context = this;
            var args = arguments;
            var later = function() {
                clearTimeout(timeout);
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: function(func, limit) {
        var inThrottle;
        return function() {
            var context = this;
            var args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    },

    formatDate: function(date) {
        var d = new Date(date);
        return d.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatNumber: function(num) {
        return new Intl.NumberFormat('ru-RU').format(num);
    },

    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },

    getQueryParam: function(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    setQueryParam: function(param, value) {
        var url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    deepClone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    isEmpty: function(obj) {
        if (Array.isArray(obj)) return obj.length === 0;
        if (typeof obj === 'object' && obj !== null) return Object.keys(obj).length === 0;
        return !obj;
    },

    capitalize: function(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    truncate: function(str, length) {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.slice(0, length) + '...';
    },

    slugify: function(str) {
        return str.toLowerCase()
            .replace(/[^\\w\\s-]/g, '')
            .replace(/[\\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    getElement: function(selector) {
        return document.querySelector(selector);
    },

    getElements: function(selector) {
        return document.querySelectorAll(selector);
    },

    addClass: function(el, className) {
        if (el) el.classList.add(className);
    },

    removeClass: function(el, className) {
        if (el) el.classList.remove(className);
    },

    toggleClass: function(el, className) {
        if (el) el.classList.toggle(className);
    },

    hasClass: function(el, className) {
        if (el) return el.classList.contains(className);
        return false;
    },

    setText: function(el, text) {
        if (el) el.textContent = text;
    },

    setHTML: function(el, html) {
        if (el) el.innerHTML = html;
    },

    appendHTML: function(el, html) {
        if (el) el.insertAdjacentHTML('beforeend', html);
    },

    prependHTML: function(el, html) {
        if (el) el.insertAdjacentHTML('afterbegin', html);
    },

    removeElement: function(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
    },

    createElement: function(tag, className, attributes) {
        var el = document.createElement(tag);
        if (className) el.className = className;
        if (attributes) {
            Object.keys(attributes).forEach(function(key) {
                el.setAttribute(key, attributes[key]);
            });
        }
        return el;
    },

    getData: function(url) {
        return fetch(url)
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP error! status: ' + res.status);
                return res.json();
            })
            .catch(function(err) {
                console.error('Fetch error:', err);
                return null;
            });
    },

    postData: function(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(res) {
            if (!res.ok) throw new Error('HTTP error! status: ' + res.status);
            return res.json();
        })
        .catch(function(err) {
            console.error('Fetch error:', err);
            return null;
        });
    }
};

window.Utils = Utils;
