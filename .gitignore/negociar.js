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
            speak: "<s>Cómo puedes negociar más eficazmente\"<break strength='weak'/> </s>",
               body: [
                    {
                        "type": "Image",
                        "text": "Reclamar con éxito",
                        "url":  "http://segundaoportunidad.es/wp-content/uploads/2017/01/logo-nuevo.png"
                    },
                    {
                        "type": "TextBlock",
                        "text": "¿Qué ofrece el Banco Santander?",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Bonos de fidelización = Obligaciones Perpetuas"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Posibilidad de amortización a los 7 años"
                        
                    },
                    {
                        "type": "TextBlock",
                        "text": "Rentabilidad del 1% anual No Garantizada"
                    },
                    {
                        "type": "TextBlock",
                        "text": "El valor real es el 70% de tu inversión perdida"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Tienes que renunciar a acciones legales"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Los nuevos bonos tienen repercusiones fiscales"
                      
                    },
                   
                    
                ],
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "method": "POST",
                        "url": "http://segundaoportunidad.es/posibles-resultados-la-reclamacion-al-banco-popular/",
                        "body": "Resultados posibles de las acciones legales",
                        "title": "¿Y qué ocurre si reclamo judicialmente?"
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
