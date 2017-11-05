var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    reclamaj:'reclamar judicialmente por la pérdida de la inversión en acciones del Popular',
	negociar:'negociar con el Banco Santander',
	Support: 'Support'
};

module.exports = [
    // reclamar o negociar choice
    function (session) {
        //builder.Prompts.time(session, '');
         // prompt for search option
         session.send('Puedes reclamar al Banco Popular (ahora Banco Santander) judicialmente o negociar ');
        builder.Prompts.choice(
            session,
            '¿Quieres Reclamar o Negociar?',
            [DialogLabels.reclamaj, DialogLabels.negociar],
            {
                maxRetries: 3,
                retryPrompt: 'Opción no válida'
            });
      },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Demasiados intentos fallidos :( Pero no se preocupe, ¡Vamos a intentar otra vez aclararnos con lo que hay que hacer!');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Fallo: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.reclamaj:
                return session.beginDialog('reclamaj');
            case DialogLabels.negociar:
                return session.beginDialog('negociar');
             
        }
    },

    
    
];


