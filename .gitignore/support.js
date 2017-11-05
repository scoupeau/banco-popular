module.exports = function (session) {
    // Generate ticket
    var tickerNumber = Math.ceil(Math.random() * 20000);

    // Reply and return to parent dialog
    session.send('hemos recibido tu mensaje \'%s\' . En cuanto lo resolvamos te lo haremos saber.', session.message.text);
    
    session.send('Gracias por ponerte en contacto con el equipo de soporte. Tu nº de ticket es %s.', tickerNumber);

    session.endDialogWithResult({
        response: tickerNumber
    });
};