class ColeccionElementos extends Array {
    on = (evt, cb) => {
        this.forEach((elem) => elem.addEventListener(evt, cb));
    };
    text = (texto) => {
        this.forEach(elem => elem.textContent = texto);
    }
    removeClass = (clase) => {
        this.forEach((elem) => elem.classList.remove(clase));
    };
    addClass = (clase) => {
        this.forEach((elem) => elem.classList.add(clase));
    };
    toggleClass = (clase) => {
        this.forEach((elem) => elem.classList.contains(clase) ? this.removeClass(clase) : this.addClass(clase));
    }
    get = (index) => {
        return $(this[index]);
    };
    each = (call) => {
        this.forEach((elem) => call($(elem)));
    };
    show = () => {
        this.removeClass("oculto");
    };
    hide = () => {
        this.addClass("oculto");
    };
    toggle = () => {
        this.toggleClass("oculto");
    };
    enable = () => {
        this.forEach(elem => elem.disabled = false)
    }
    disable = () => {
        this.forEach(elem => elem.disabled = true)
    }
    data = function(attr, val = null) {
        if (val == null) {
            return this.length >= 1 ? this[0].dataset[attr] : null;
        } else {
            this.forEach(elem => elem.dataset[attr] = val);
        }
    }
}

const $ = (dir) =>
    typeof dir === "string" ?
    new ColeccionElementos(...document.querySelectorAll(dir)) :
    new ColeccionElementos(dir);