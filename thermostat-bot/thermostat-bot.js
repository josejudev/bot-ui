//Social floating button
console.log(2)
$('.main-btn').on('click', function () {
  $('.float-btn ul').toggleClass('toggled');
});

var botui = new BotUI('thermostat-bot'),

text = ''

init_welcome()

function init_welcome() {
  botui.message
    .bot({
      //loading: true,
      delay: 500,
      content: 'Hola, soy Wendy 🤖, tu asistente virtual oficial de la universidad.'
    })
}


function init() {
  botui.message
    .bot({
      //loading: true,
      delay: 500,
      content: '¿Te puedo ayudar en algo?'
    })
    .then(botOptions).then(function (res) {

      if (res.value == 'change') {
        changeTemp();

      } else if (res.value == 'input') {
        changeInput();

      } else if (res.value == 'no') {
        no_value();

      } else if (res.value == 'yes') {
        yes_value();

      } else {
        botui.message.bot({
          delay: 500,
          content: 'Error'
        }).then(init);
      }
    });
}

const changeInput = function () {
  botui.message
    .bot({
      delay: 500,
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

      if (res.value.includes('estadia')) {
        return botui.message
          .bot({
            delay: 1500,
            //loading: true, // pretend like we are doing something
            content: 'Mostrando todos los resultados con la busqueda ' + res.value
            
          }
          ).then(
            function () {
              return botui.action.button({
                delay: 500,
                action: [{
                    text: 'Recargar bot',
                    icon: 'refresh',
                    value: 'yes'
                  }
                ]
              })
            }
          ).then(function (res) {
            if (res.value == 'yes') {
              init();
            }
          }
          );
      } else {
        return botui.message
          .bot({
            delay: 1500,
            //loading: true, // pretend like we are doing something
            content: '!(external-link) Error sintaxis'
          }).then(changeInput);

      } /// save new value

    }) // loop to initial state
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

const yes_value = () => {
  botui.message.bot({
    //loading: true,
    delay: 500,
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
            text:'Proceso de reinscripción',
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
    
  ).then(function (res) {
    if (res.value == 'study') {
      botui.message.bot({
        delay: 500,
        content: 'Conoce nuestras ingenierias!'
      }).then(function () {
        return botui.message.bot({
          cssClass: 'botui-link',
          delay: 500,
          content: '🌐 [Ing. de Software](https://example.com)^ <br>' +'🌐 [Ing. en Energia](https://example.com)^ <br>'
        })
      }).then(function () {

      })

    }
  })
}

const no_value = () => {
  botui.message.bot({
    //loading: true,
    delay: 500,
    content: '!(frown-o) En otro momento sera :('
  }).then(
    function () {
      return botui.action.button({
        delay: 20000,
        action: [{
            text: 'Recargar bot',
            icon: 'refresh',
            value: 'yes'
          }
        ]
      })
    }
  ).then(function (res) {
    if (res.value == 'yes') {
      init();
    }
  })
}


init();