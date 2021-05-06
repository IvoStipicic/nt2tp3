new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },

        atacar: function () {
            var ataque = this.calcularHeridas(this.rangoAtaque[0],this.rangoAtaque[1]);
            this.saludMonstruo -= ataque;
            this.registrarEvento({esJugador: true, text: "El jugador le saco vida al moustro por: " + ataque});
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var ataque = this.calcularHeridas(this.rangoAtaqueEspecial[0],this.rangoAtaqueEspecial[1]);
            this.saludMonstruo -= ataque;
            this.registrarEvento({esJugador: true, text: "El jugador le saco vida al moustro por: " + ataque});
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if (this.saludJugador <= 90) {
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
            this.registrarEvento({esJugador: true, text: "El jugador se curo "});
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            this.turnos.push(evento);
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            var ataque = this.calcularHeridas(this.rangoAtaqueDelMonstruo[0],this.rangoAtaqueDelMonstruo[1]);
            this.saludJugador -= ataque;
            this.registrarEvento({esJugador: false, text: "El monstruo le saco vida al jugador por: " + ataque});
            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
                if (confirm("Ganaste, jugar de nuevo?")) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                } 
                return true;
            }
            else if (this.saludJugador <= 0) {
                if (confirm("Perdiste, jugar de nuevo?")) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                } 
                return true;
            }
            return false;
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});