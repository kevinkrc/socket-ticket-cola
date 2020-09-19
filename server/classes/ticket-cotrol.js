const { json } = require('express');
const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio =escritorio;
    }

}

class TicketControl {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate();
        this.tickets =[];
        this.ultimos4 = [];

        let data = require('../data/data.json')

        if(data.hoy === this.data) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else {
            this.reiniciaConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();


        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimo4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift()

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift( atenderTicket ); // Se agrega el ticket a la primera posicion

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1); //  Borra el ultimo ticket del arreglo
        }

        console.log('ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

     reiniciaConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el conteo');

        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
    TicketControl
}