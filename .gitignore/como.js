var builder = require('botbuilder');
var Store = require('./store');


module.exports = [
    

    function (session) {
      
     var msg = new builder.Message(session)
    .addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            type: "AdaptiveCard",
            version: "1.0",
            speak: "<s>Cómo puedes reclamar más eficazmente\"<break strength='weak'/> </s>",
               body: [
                    {
                        "type": "Image",
                        "text": "Reclamar con éxito",
                        "url":  "http://segundaoportunidad.es/wp-content/uploads/2017/01/logo-nuevo.png"
                    },
                    {
                        "type": "TextBlock",
                        "text": "¿Reclamación civil o penal?",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "la via Civil es la más eficaz, más rápida."
                    },
                    {
                        "type": "TextBlock",
                        "text": "¿Individual o en Grupo?",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Reclamación Individual"
                    },
                    {
                        "type": "TextBlock",
                        "text": "¿Qué acciones vais a ejercitar?",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Depende de cada caso. En general acciones de \"nulidad, resolución contractual y/o daños y perjuicios"
                    },
                    {
                        "type": "TextBlock",
                        "text": "¿Qué plazo tengo? ",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Depende de las acciones ejercitadas:3, 4 ó 5 años para reclamar"
                    },
                    {
                        "type": "TextBlock",
                        "text": "¿Cuánto se tarda en tener sentencia? ",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Depende de la cuantía: 3 a 5 meses para < 6.000€ y \" entre 6 y 8 meses para que te devuelvan más de 6.000€."
                    },
                    {
                        "type": "TextBlock",
                        "text": "¿Cuánto se reclama?",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Todo el dinero invertido + intereses legales."
                    },
                    
                ],
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "method": "POST",
                        "url": "http://segundaoportunidad.es/posibles-resultados-la-reclamacion-al-banco-popular/",
                        "body": "Resultados posibles de las acciones legales",
                        "title": "¿Qué ocurre después del juicio?"
                    },
                    {
                        "type": "Action.OpenUrl",
                        "method": "POST",
                        "url": "http://segundaoportunidad.es/gastos-supone-demandar-al-popular/",
                        "body": "¿Qué gastos hay que afrontar?",
                        "title": "Qué incluyen los gastos"
                    }
                    ,
                    {
                        "type": "Action.OpenUrl",
                        "method": "POST",
                        "url": "http://segundaoportunidad.es/posibles-resultados-la-reclamacion-al-banco-popular/",
                        "body": "¿Cómo me puedo informar más?",
                        "title": "Quiero más información"
                    }
                ]
        }
    });

            session.send(msg);
 // create the card based on selection
    //var selectedCardName = session.response.entity;
/*    var card = createCard('CardImage', session);
    var imagen = card.url('http://segundaoportunidad.es/wp-content/uploads/2017/01/logo-nuevo.png');
            session.send(imagen);


    // attach the card to the reply message
    var mensaje = new builder.Message(session).addAttachment(card);
    session.send(mensaje);
*/

                // End
                session.endDialog();
   
    }
 
];
