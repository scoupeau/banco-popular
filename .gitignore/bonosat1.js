var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    cuando:'¿Cuándo invertiste?',
    plazos:'Plazos para reclamar',
    como:'Cómo reclamar eficazmente la devolución de mi inversión',
    Support: 'Support'
};

module.exports = [
    // cuando compró las acciones / qué plazos tienes y cómo reclamar
    function (session) {
        //fcaliente es ferromagneticoencaliente fhilofrio es ferromag. geom hilo o barra en frio
        // tenemos que preguntar cuando ha invertido, ver si corresponde a acciones despues de 26 de mayo de 2016 (si dice que antes entonces hay que volver a empezar y ver
        // si encaja en 2011) criterio (validar con Carlos) 1- si compraste acciones ver si fue despues de 5/2016. Tienes el resto (bonos, etc) no hay limite de fecha
        //fecha, un año y un mes
        session.dialogData.time = {};
        builder.Prompts.time(session, "¿Cuándo compraste las acciones del Popular? (MM/DD/AAAA) ");
        // builder.Prompts.choice(
        //     session,
        //     'Has elegido Reclamar judicialmente. No importa el tipo de inversor que seas. Recomendamos reclamación individual y por la via CIVIL. Dinos por favor cuándo invertiste?',
        //     [DialogLabels.cuando,DialogLabels.plazos, DialogLabels.como],
        //     {
        //         maxRetries: 3,
        //         retryPrompt: 'Opción no válida'
        //     });
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
            // Once triggered, will restart the dialog.
            // session.reloadAction('lo volvemos a intentar', 'Ok, reintentando...', {
            //     matches: /^¿Cuándo$/i  
            // });
            session.endDialog();
        });

          // continue on proper dialog

        if (session.dialogData.time= builder.EntityRecognizer.resolveTime([result.response])
            ) {
            // sabemos cuando ahora sacamos año y mes e informamos de como y plazos
            var fecha = session.dialogData.time;
            
            //fecha=date.now();
            var fecha_limite = new Date(2017,05,27);
            var AnyoLim = fecha_limite.getFullYear();
            var MesLim = fecha_limite.getMonth();
            var DiaLim = fecha_limite.getDay();
 
            var Anyo = fecha.getFullYear();
            var Mes = fecha.getMonth();
            var Dia = fecha.getDay();
            
            if (Anyo >= AnyoLim) { 
                if (Mes >= MesLim) {
                               
                    if (Dia >= DiaLim) {
                        // fecha valida para reclamar
                        session.send('Puedes reclamar al Banco para recuperar las acciones compradas en %s',fecha);
                        return session.beginDialog('como');
                    }}
            } else {
                session.send('Para la fecha que dices %s no va a ser posible reclamar al Banco',fecha);
                session.send('Tienes que haber comprado las acciones con posterioridad a %s',fecha_limite);
            }
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

