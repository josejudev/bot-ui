//Social floating button
$('.main-btn').on('click', function () {
  $('.float-btn ul').toggleClass('toggled');
});
var botui = new BotUI('thermostat-bot'),
  temperature = 30;
text = ''

init_welcome()

function init_welcome() {
  botui.message
    .bot({
      //loading: true,
      delay: 500,
      content: 'Hola, soy Wendy <h1>🤖</h1>, tu asistente virtual oficial de la universidad.'
    })
}


function init() {
  botui.message
    .bot({
      //loading: true,
      delay: 500,
      content: 'Te puedo ayudar en algo?'
    })
    .then(bot_options).then(function (res) {

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
          content: 'Current temperature is: ' + temperature + ' degree'
        }).then(init);
      }
    });
}

var changeTemp = function () {
  botui.message
    .bot({
      delay: 500,
      content: 'Change the temperature to ...'
    })
    .then(function () {
      return botui.action.text({
        delay: 500,
        action: {
          size: 10,
          icon: 'thermometer-empty',
          value: temperature, // show the current temperature as default
          sub_type: 'number',
          placeholder: '26'
        }
      })
    }).then(function (res) {
      temperature = res.value; // save new value
      return botui.message
        .bot({
          delay: 1500,
          //loading: true, // pretend like we are doing something
          content: 'temperature set to ' + res.value
        });
    }).then(init); // loop to initial state
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
          placeholder: 'type'
        }
      })
    }).then(function (res) {
      if (res.value == 'Hola') {
        return botui.message
          .bot({
            delay: 1500,
            //loading: true, // pretend like we are doing something
            content: 'Showing info about ' + res.value
          });
      } else {
        return botui.message
          .bot({
            delay: 1500,
            //loading: true, // pretend like we are doing something
            content: 'Incorrect input'
          }).then(changeInput);

      } /// save new value

    }) // loop to initial state
}

const bot_options = () => {
  return botui.action.button({
    delay: 500,
    action: [{
        text: 'Si, necesito ayuda',
        icon: 'thumbs-o-up',
        value: 'yes'
      }, {
        text: 'No, solo estoy navegando',
        value: 'no'
      },
      {
        text: 'Buscar informacion',
        icon: 'search',
        value: 'input'
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
            text: 'Input',
            value: 'input'
          },
        ]
        
      }) 
    }
    
  ).then(function (res) {
    if (res.value == 'study') {
      botui.message.bot({
        delay: 500,
        content: 'showing info about study'
      }).then(function () {
        return botui.message.bot({
          delay: 500,

          content: 'degrees'
        })
      }).then(function () {
        return botui.message.bot({
          delay: 500,
          content: '🔗<a href="https://google.com">Option 1</a><br>🔗<a href="https://google.com">Option 2</a> '
        })
      }).then(function () {
        botui.action.text({
          addMessage: false,
          action: {
            placeholder: 'Your name'
          }
        }).then(function (res) { // will be called when a button is clicked.
          botui.message.add({
            human: true, // show it as right aligned to UI
            content: 'My name is ' + res.value
          });
        });
      })

    }
  })
}

const no_value = () => {
  botui.message.bot({
    //loading: true,
    delay: 500,
    content: 'En otro momento sera :('
  }).then(
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
  })
}


init();