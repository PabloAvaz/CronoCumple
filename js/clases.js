Number.prototype.pad = function(size = 2) {
    var s = String(this);
    while (s.length < size) { s = "0" + s; }
    return s;
}

Array.prototype.remove = function(valor) {
    var index = this.indexOf(valor);
    if (index !== -1) {
        this.splice(index, 1);
    }
}

class Fecha extends Date {
    static now = () => new Fecha();
    addYears = (cantidad) => this.setFullYear(this.getFullYear() + cantidad);
    addMonths = (cantidad) => this.setMonth(this.getMonth() + cantidad);
    addDays = (cantidad) => this.getDate(this.getDate() + cantidad);

    clone = () => new Fecha(this)

    static resta = (fecha1, fecha2) => {
        let fechaFinal = fecha1.clone();
        fechaFinal.setFullYear(fecha1.getFullYear() - fecha2.getFullYear());
        fechaFinal.setMonth(fecha1.getMonth() - fecha2.getMonth());
        fechaFinal.setDate(fecha1.getDate() - fecha2.getDate());
        fechaFinal.setHours(fecha1.getHours() - fecha2.getHours());
        fechaFinal.setMinutes(fecha1.getMinutes() - fecha2.getMinutes());
        fechaFinal.setSeconds(fecha1.getSeconds() - fecha2.getSeconds());
        return fechaFinal;
    }

    compareTo = (fecha) => this.getTime() < fecha.getTime() ? -1 : this.getTime() > fecha.getTime() ? 1 : 0;
}

class Persona {
    constructor(nombre, fechaNacimiento, filters) {
        this.nombre = nombre;
        this.fechaNacimiento = new Fecha(fechaNacimiento);
        this.filters = filters;
        this.actualizar();
    }

    actualizar = () => {
        this.actualizarEdad()
        this.calcularProximoCumple();
    }

    actualizarEdad = () => this.edad = Fecha.resta(Fecha.now(), this.fechaNacimiento).getFullYear();

    calcularProximoCumple = () => {
        this.proximoCumple = this.fechaNacimiento.clone();
        this.proximoCumple.addYears(this.edad + 1)
    }
}

class Contador {
    constructor({ contador, footer, elementos }) {
        this.contador = contador;
        this.datos = footer;
        this.setElementos(elementos);
        this.setTarget(elementos.items[0]);
        this.intervalo = setInterval(this.actualizar, 1000);
    }

    setFechaFin = (fecha) => this.fechaFin = fecha;

    setTarget = (target) => {
        target.actualizar();
        this.target = target;
        this.setFechaFin(target.proximoCumple); //TODO GENERICO
        this.datos.nombre.text(target.nombre);
        this.datos.proximoCumple.text(target.proximoCumple.toLocaleDateString("es")); //TODO formatear mejor
    }

    setElementos = (elementos) => {
        elementos.sort();
        this.elementos = elementos;
    }

    actualizar = () => {
        this.actualizarContador();
    }


    actualizarContador = () => {
        let tiempoRestante = this.calcularTiempoRestante();
        this.contador.ano.text(tiempoRestante.ano.pad(2));
        this.contador.mes.text(tiempoRestante.mes.pad(2));
        this.contador.dia.text(tiempoRestante.dia.pad(2));
        this.contador.hor.text(tiempoRestante.hor.pad(2));
        this.contador.min.text(tiempoRestante.min.pad(2));
        this.contador.seg.text(tiempoRestante.seg.pad(2));
    }

    calcularTiempoRestante = () => {
        if (this.fechaFin > Fecha.now()) {
            let fin = Fecha.resta(this.fechaFin, Fecha.now());
            return {
                ano: fin.getFullYear(),
                mes: fin.getMonth(),
                dia: fin.getDate(),
                hor: fin.getHours(),
                min: fin.getMinutes(),
                seg: fin.getSeconds()
            }
        } else {
            return {
                ano: 0,
                mes: 0,
                dia: 0,
                hor: 0,
                min: 0,
                seg: 0
            }
        }
    }

    personaSiguiente = () => { //TODO REFACTORIZAR
        this.elementos.sort();
        let elementos = this.elementos.findActivos();
        if (elementos.length > 0) {
            let index = elementos.lastIndexOf(this.target);
            let siguiente = index + 1 < elementos.length ? elementos[index + 1] : elementos[0];
            this.setTarget(siguiente);
            this.actualizar();
        }
    }

    personaAnterior = () => { //TODO REFACTORIZAR
        this.elementos.sort();
        let elementos = this.elementos.findActivos();
        if (elementos.length > 0) {
            let index = elementos.lastIndexOf(this.target);
            let anterior = index > 0 ? elementos[index - 1] : elementos[elementos.length - 1];
            this.setTarget(anterior);
            this.actualizar();
        }
    }
}