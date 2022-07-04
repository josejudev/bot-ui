const caseContact = ["contacto", "direccion", "correo", "telefono"];
const caseReinscription = ["reinscripcion", "inscripcion", "inscripción" , "reinscripción"];
const caseCareer = ["ingenieria", "postgrado","licenciatura","maestria"];
const caseEstadia = ["estancia", "estadia", "estancia y estadia"];

var botui = new BotUI('bot-wendy'),

text = ''

init_welcome()

//mensaje de bienvenida
function init_welcome() {
  botui.message
    .bot({
      loading: true,
      delay: 500,
      content: 'Hola, soy Wendy 🤖, tu asistente virtual oficial de la universidad.'
    })
}


function init() {
  botui.message
    .bot({
      loading: true,
      delay: 800,
      content: '¿Te puedo ayudar en algo?'
    })
    .then(botOptions).then(function (res) {

      if (res.value == 'input') {
        searchInfo();

      }
      else if (res.value == 'yes') {
        yesValue();
      }  
      else if (res.value == 'no') {
        botui.message.bot({
          loading: true,
          delay: 800,
          content: ' En otro momento sera 🙂'
        }).then(reloadBot())
      }
      else {
        botui.message.bot({
          delay: 500,
          content: 'Error'
        }).then(init);
      }
    });
}

const searchInfo = function () {

  botui.message
    .bot({
      loading: true,
      delay: 800,
      content: 'Escribe la informacion que quieres consultar'
    })
    .then(function () {
      
      return botui.action.text({
        delay: 500,
        action: {
          size: 10,
          icon: 'keyboard-o',
          value: text, // show the current temperature as default
          sub_type: 'text',
          placeholder: 'Escribe algo...'
        }
      })
    }
    ).then(function (res) {

      if (res.value.toLowerCase().test1 = caseEstadia.some(iterant => res.value.includes(iterant))) {
        return estadiasEstancias();
      }
      else if (res.value.toLowerCase().test1 = caseContact.some(iterant => res.value.includes(iterant))) {
        return contactUs()
      }
      else if (res.value.toLowerCase().test1 = caseReinscription.some(iterant => res.value.includes(iterant))) {
        return reinscription()
      }
      else if (res.value.toLowerCase().test1 = caseCareer.some(iterant => res.value.includes(iterant))) {
        return study();
      }

      else {
        return botui.message
          .bot({
            delay: 800,
            //loading: true,
            content: '❌ Error sintaxis'
          }).then(init)

      }

    })
}

const botOptions = () => {
  return botui.action.button({
    delay: 500,
    action: [{
        text: 'Si, necesito ayuda',
        icon: 'thumbs-o-up',
        value: 'yes'
      },
      {
        text: 'Buscar informacion',
        icon: 'search',
        value: 'input'
      }, {
        text: 'No, solo estoy navegando',
        value: 'no'
      }
      
    ]
  })
}

const yesValue = () => {
  botui.message.bot({
    loading: true,
    delay: 800,
    content: 'Excelente, ¿En que te puedo ayudar?'
  }).then(
    function () {
      return botui.action.button({
        delay: 500,
        action: [{
            text: 'Estoy interesado en estudiar',
            icon: 'graduation-cap',
            value: 'study'
          },
          {
            text:'Estancias y Estadías',
            icon: 'file-text-o',
            value: 'estadias'
          },
          {
            text:'Proceso de inscripción y reinscripción',
            icon: 'file-o',
            value: 'reinscription'
          },{
            text:'Contactanos',
            icon: 'envelope-o',
            value: 'contact'

          },
          {
            text: 'Buscar informacion ',
            icon: 'search',
            value: 'input'
          },
        ]
        
      }) 
    }
  ).then(helpTips)
}
//Showing options to user to choose
const helpTips = (res) => {
  if (res.value == 'study') {
    study();
  }

  else if (res.value == 'estadias') {
    estadiasEstancias();
  }

  else if (res.value == 'reinscription') {
    reinscription();
  }
 
  else if (res.value == 'contact') {  
    contactUs()
  }
  
  else if (res.value == 'input') {
    searchInfo();

  }
}






//Info about the career
const study = () => {
  botui.message.bot({
    loading: true,
    delay: 900,
    content: 'Conoce nuestras ingenierias y postgrados! '
  }).then(function () {
    return botui.message.bot({
      loading : true,
      cssClass: 'botui-link',
      delay: 1000,
      content: '🌐 [Ing. de Software](https://example.com)^ <br>' +'🌐 [Ing. en Energia](https://example.com)^ <br> <br>' + '🧑‍🎓 Postgrados <br>' + '🌐 [Maestria en: ](https://example.com)^ <br>'+ '🌐 [Maestria en: ](https://example.com)^'
    })
  }).then(reloadBot())
}

//info about the estadias and estancias
const estadiasEstancias = () => {
  botui.message.bot({
    loading: true,
    delay: 800,
    content: 'Informacion de estadias y estancias'
  }).then(function () {
    return botui.message.bot({
      loading : true,
      cssClass: 'botui-link',
      delay: 1000,
      content: '🔗 [Documentacion y proceso de estancia](https://example.com)^ <br>' +'🔗 [Documentacion y proceso de estadia ](https://example.com)^ <br> <br>'
    })
  }
  ).then(reloadBot())
}

//info about the reinscription
const reinscription = () => {
  botui.message.bot({
    loading: true,
    delay: 800,
    content: 'Proceso de reinscripcion'
  }).then(function () {
    return botui.message.bot({
      loading:true,
      cssClass: 'botui-link',
      delay: 1000,
      content: '📝 Ingresa al link para ver mas información a cerca del [proceso de reinscripción](https://example.com)^ <br>'
    })
  }
  ).then(reloadBot())
}

//info about contact
const contactUs = () => {
  botui.message.bot({
    loading:true,
    delay: 800,
    content: 'Informacion de contacto'
  }).then(function () {
    return botui.message.bot({
      cssClass: 'botui-link',
      delay: 1000,
      content: '☎️ Teléfono <br> 📧 Mail <br>📍 Dirección <br> 🕠 Horario<br> '
    })
  }
  ).then(reloadBot())
}


//Reload bot function
const reloadBot = () => {
 botui.action.button({
        delay: 1800,
        action: [{
            text: 'Recargar bot',
            icon: 'refresh',
            value: 'yes'
          }
        ]
      }).then(function (res) {
        if (res.value == 'yes') {
          init();
    }})}
    


init();


