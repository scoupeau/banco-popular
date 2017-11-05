//LDVM
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "0b89989c-8067-46ae-8c75-059fe3f3c0e3",
    appPassword: "djpvMIS60~vjeAQIM844^~@"
    // appId: process.env.MICROSOFT_APP_ID,
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());



var DialogLabels = {
    acciones2016: 'Acciones de la ampliación de capital de 2016',
    bonosAT1: 'Bonos del Banco Popular AT1',
    bonosconvertibles:'Bonos necesariamente convertibles en acciones',
	deudasubordinada:'Deuda subordinada de la emisión de 2011',
	tipoinversor:'inversor de bolsa minorista, inversor mayorista e informado',
	plazos:'3 años acciones nulidad, 4 años resolución contractural, 5 años para daños y perjuicios',
	
};



// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {

    //digo algo
    session.send('Hola!. Soy el asistente de Vidau Abogados - APDEF. ¿Qué tal?');


        // prompt for search option
        builder.Prompts.choice(
            session,
            'Disculpa que te tutee. ¿Estás afectado por la quiebra del Banco Popular? (Pulsa un nº del 1 al 4)',
            [DialogLabels.acciones2016, DialogLabels.bonosAT1,DialogLabels.bonosconvertibles, DialogLabels.deudasubordinada],
            
            {
                maxRetries: 3,
                retryPrompt: 'Opción no válida'
            });
    },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Demasiados intentos fallidos :( Pero no te preocupes, vamos a empezar de nuevo');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Error: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.acciones2016:
                return session.beginDialog('acciones2016');  //FerroMag
            case DialogLabels.bonosAT1:
                return session.beginDialog('bonosAT1');
            case DialogLabels.bonosconvertibles:
                return session.beginDialog('bonosconvertibles');
            case DialogLabels.deudasubordinada:
                return session.beginDialog('deudasubordinada');
            /*case DialogLabels.bonosAT1:
                return session.beginDialog('acciones2016');
            case DialogLabels.bonosconvertibles:
                return session.beginDialog('acciones2016');
            case DialogLabels.deudasubordinada:
                return session.beginDialog('acciones2016');*/
        }
    }
]);

bot.dialog('acciones2016', require('./acciones2016'));
bot.dialog('bonosAT1', require('./bonosat1'));
bot.dialog('bonosconvertibles', require('./bonosconvertibles'));
bot.dialog('deudasubordinada', require('./deudasubordinada'));
bot.dialog('reclamaj', require('./reclamaj'));
bot.dialog('negociar', require('./negociar'));
bot.dialog('cuando', require('./cuando'));
bot.dialog('plazos', require('./plazos'));
bot.dialog('como', require('./como'));
bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /soporte/i, /problema/i]
    });

//Event handler
bot.on('conversationUpdate', function (message) {
    console.log('conversationUpdate');
    console.dir(message);
    bot.send(new builder.Message()
        .address(message.address)
        .text('¡Hola!', message.address.user.name));
       // .text('Hola %s!', message.address.user.name));
});

bot.on('contactRelationUpdate', function (message) {
    console.log('contactRelationUpdate');
    console.dir(message);
    if (message.action == 'add') {
        bot.send(new builder.Message()
            .address(message.address)
            .text('El asistente ha sido añadido a la lista de contactos. Gracias'));
 
        bot.send(new builder.Message()
            .address(message.address)
            .text('Hola %s! Action %s', message.address.user.name, message.action));
    }
    else{
        //The user stops to use your bot snif
    }
});
 

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('Se ha producido un error', e);
});