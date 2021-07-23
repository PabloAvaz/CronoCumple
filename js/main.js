const log = (...params) => console.log({...params });

window.addEventListener("load", function() {
    const FORMATO_FECHA = new RegExp(/^\d{4}\/\d{2}\/\d{2}$/);
    const MILIS_YEAR = 366 * 24 * 3600 * 1000;

    var personas = [
        new Persona("Delafuente", "01 12 2001", ["marasecta"]),
        new Persona("Byraa", "01 30 2001", "baloteli"),
        new Persona("zHaaldz", "04 05 2002", "baloteli"),
        new Persona("Juan", "04 26 1999", "marasecta"),
        new Persona("Godkuanchi", "06 03 2003", "marasecta"),
        new Persona("Rbg", "06 30 2001", "baloteli"),
        new Persona("Adolfo", "07 09 2001", "marasecta"),
        new Persona("Woki", "07 17 2001", "baloteli"),
        new Persona("Dominchi", "08 12 2001", "marasecta"),
        new Persona("Cesx", "10 01 2003", "baloteli"),
        new Persona("Bugallo", "10 02 2001", "marasecta"),
        new Persona("Roma", "10 28 2001", "marasecta"),
        new Persona("Trabis", "03 08 2004", "baloteli")
    ];

    const config = {
        contador: {
            ano: $("#anho span"),
            mes: $("#mes span"),
            dia: $("#dia span"),
            hor: $("#hora span"),
            min: $("#minuto span"),
            seg: $("#segundo span")
        },
        footer: {
            nombre: $("#nombre"),
            proximoCumple: $("#proximoCumple")
        },
        elementos: {
            items: personas,
            filters: [],
            findActivos: function() {
                return this.items.filter(item => this.filters.length == 0 || this.filters.includes(item.filters));
            },
            addFilter: function(filtro) {
                if (!this.filters.includes(filtro)) {
                    this.filters.push(filtro);
                }
            },
            removeFilter: function(filtro) {
                if (this.filters.includes(filtro)) {
                    this.filters.remove(filtro);
                }
            },
            sort: function() {
                this.items.sort((p1, p2) => p1.proximoCumple.compareTo(p2.proximoCumple));
            }
        }
    }

    const contador = new Contador(config)

    $("#buscador").on("input", (e) => {
        personas.filter(p => (p.nombre) == e.target.value).forEach(contador.setTarget)
        contador.actualizar();
    });

    $("#nxt").on("click", () => contador.personaSiguiente(personas));
    $("#lst").on("click", () => contador.personaAnterior(personas));


    $("#filtros").on("click", () => {
        $(".filters-form").toggle();
    })
    $("input[name=filtro]").on("change", (e) => {
        const personas = $("datalist#personas option");

        if (e.target.checked) {
            contador.elementos.addFilter(e.target.value)
        } else {
            contador.elementos.removeFilter(e.target.value)
        }

        personas.each(persona => {
            if (contador.elementos.filters.length == 0 || contador.elementos.filters.includes(persona.data("filter"))) {
                persona.enable();
            } else {
                persona.disable();
            };
        });
    })



})