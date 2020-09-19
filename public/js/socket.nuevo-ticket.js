var socket = io();
var label = $('#lblNuevoTicket');



socket.on('connect', function() {
    

});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});

$('button').on('click', function () {    
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    });
})

