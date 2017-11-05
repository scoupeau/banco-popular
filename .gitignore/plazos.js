var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    cuando:'¿Cuándo invertiste?',
    Support: 'Support'
};

module.exports = [
    // cuando compró las acciones / qué plazos tienes y cómo reclamar
    function (session) {
        //fecha, un año y un mes
        session.dialogData.time = {};
        builder.Prompts.time(session, "¿Cuándo compraste las acciones del Popular? ");
      },
        function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Demasiados intentos fallidos :( Pero no se preocupe, Vamos a intentar otra vez analizar tu caso concreto');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Fallo: %s', err.message);
            session.endDialog();
        });

          // continue on proper dialog
          if (session.dialogData.time= builder.EntityRecognizer.resolveTime([result.response])
            ) {
            session.endDialogWithResult({
                response: {time:session.dialogData.time}
            });
          } else {
                session.endDialogWithResult({
                    resumed: builder.ResumeReason.notCompleted
                });

          }
        
       
    }
    
];

