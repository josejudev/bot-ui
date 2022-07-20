

//Speech Mode
const add_speech_mode = () => {
  localStorage.setItem('token_6', 'on');
  $('.key-speech')[0].checked = true;
  (function() {
    "use strict"; // For the sake of practice.
  
    if (typeof speechSynthesis === 'undefined')
      return;
  
    // Some config stuffs... 
    var voiceSelect = document.getElementById("voice");
    var myPhrase = 'Talback activado';
    var voices = [];
    
    // This is essentially similar to jQuery's $.ready.
    var ready = function(callback) { 
      var d = document, s = d.readyState;
  
      // DOMContentLoaded was fired
      if (s == "complete" || s == "loaded" || s == "interactive") {
        callback();
      } else {
        if (d.addEventListener) {
          d.addEventListener("DOMContentLoaded", callback, false);
        } else {
          d.attachEvent("onDOMContentLoaded", callback);
        }
      }
    };
  
    // This is a function to display all possible voice options. 
    function populateVoiceList() {
      voices = speechSynthesis.getVoices();
      for (var i = 0; i < voices.length; i++) {
       }
     }
    // This is the handler for when the select tag is changed. 
    function handler() {
      var utterThis = new SpeechSynthesisUtterance(myPhrase);
      var selectedOption = arguments;
  
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      speechSynthesis.speak(utterThis);
    };
    // This is your code to get the selected text.
    function getSelectionText() {
      var text = "";
      if (window.getSelection) {
        text = window.getSelection().toString();
        // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
      }
      return text;
    }
  
    // This is the on mouse up event, no need for jQuery to do this. 
    document.onmouseup = function(e) {
      setTimeout(function() {
        speechSynthesis.cancel();
        myPhrase = getSelectionText();
        handler();
      }, 1);
    };
  
    // Some place for the application to start. 
    function start() {
      populateVoiceList();
      if (speechSynthesis.onvoiceschanged !== undefined)
        

      voiceSelect.onchange = handler;
      setTimeout(handler, 75);
    }
  
    // Run the start function. 
    ready(start);
    speechSynthesis.cancel();
  })();
}

const remove_speech_mode = () => {
  localStorage.setItem('token_6', 'off');
  
}


if (localStorage.getItem('token_6') == 'on') {
  add_speech_mode();
} else if (localStorage.getItem('token_6') == 'off') {
  remove_speech_mode();
}
//Text speech mode
document.getElementById("textSpeech").addEventListener("click", function (e) {
  if (document.getElementById('textSpeech').checked) {
    add_speech_mode();
      }
      else {
    remove_speech_mode();
      }
    });



//Dark Mode
const add_dark_mode = () => {
  $('body').addClass("darkMode");
  $('div').addClass("darkMode");
  $('.key-dark')[0].checked = true;
  localStorage.setItem('token_1', 'on');
}

const remove_dark_mode = () => {
  $('body').removeClass("darkMode");
  $('div').removeClass("darkMode");


  localStorage.setItem('token_1', 'off');
}

//Bold Mode
const add_bold_mode = () => {
  $('body').addClass("boldText");
  $('div').addClass("boldText");
  $('.key-bold')[0].checked = true;
  localStorage.setItem('token_2', 'on')
}
const remove_bold_mode = () => {
  $('body').removeClass("boldText");
  $('div').removeClass("boldText");
  localStorage.setItem('token_2', 'off')
}

//Black and white mode
const add_bw_mode = () => {
  document.getElementsByTagName("html")[0].style.filter = "grayscale(100%)";
  $('.key-bw')[0].checked = true;
  localStorage.setItem('token_3', 'on')
}
const remove_bw_mode = () => {
  document.getElementsByTagName("html")[0].style.filter = "grayscale(0%)";
  localStorage.setItem('token_3', 'off')

}



if (localStorage.getItem('token_1') == 'on') {
  add_dark_mode();
} else if (localStorage.getItem('token_1') == 'off') {
  remove_dark_mode();
}
if (localStorage.getItem('token_2') == 'on') {
  add_bold_mode();
} else if (localStorage.getItem('token_2') == 'off') {
  remove_bold_mode();
}
if (localStorage.getItem('token_3') == 'on') {
  add_bw_mode();
} else if (localStorage.getItem('token_3') == 'off') {
  remove_bw_mode();
}



if (localStorage.getItem('token_5') == 'on') {
  $('.key-links')[0].checked = true;
  let link_resalt = document.getElementsByTagName("a");
  for (let i = 0; i < link_resalt.length; i++) {
    link_resalt[i].style.textDecoration = "underline 2px";
  }
} else if (localStorage.getItem('token_5') == 'off') {
  let link_resalt = document.getElementsByTagName("a");
  for (let i = 0; i < link_resalt.length; i++) {
    link_resalt[i].style.textDecoration = "none";
  }

}

//Dark mode
document.getElementById("darkMode").addEventListener("click", function (e) {
  if (document.getElementById('darkMode').checked) {
    add_dark_mode();
  } else {
    remove_dark_mode();
  }
});
//Bold mode
document.getElementById("textBold").addEventListener("click", function (e) {
  if (document.getElementById('textBold').checked) {
    add_bold_mode();
  } else {
    remove_bold_mode();
  }
});
//BlackWhite mode
document.getElementById("blackWhite").addEventListener("click", function (e) {
  if (document.getElementById('blackWhite').checked) {
    add_bw_mode();
  } else {
    remove_bw_mode();
  }
});

//Link underline mode
document.getElementById("lineLinks").addEventListener("click", function (e) {
  if (document.getElementById('lineLinks').checked) {
    let link_resalt = document.getElementsByTagName("a");
    for (let i = 0; i < link_resalt.length; i++) {
      link_resalt[i].style.textDecoration = "underline 2px";
    }

    localStorage.setItem('token_5', 'on');
  } else {
    let link_resalt = document.getElementsByTagName("a");
    for (let i = 0; i < link_resalt.length; i++) {
      link_resalt[i].style.textDecoration = "none";
    }
    localStorage.setItem('token_5', 'off');
  }
});

document.getElementById("reload").addEventListener("click", function (e) {
  localStorage.removeItem('token_1');
  localStorage.removeItem('token_2');
  localStorage.removeItem('token_3');
  localStorage.removeItem('token_4');
  localStorage.removeItem('token_5');
  
  $('.key-bold')[0].checked = false;
  remove_bold_mode();

  $('.key-dark')[0].checked = false;
  remove_dark_mode();

  $('.key-bw')[0].checked = false;
  remove_bw_mode();

  $('.key-links')[0].checked = false;
  let link_resalt = document.getElementsByTagName("a");
  for (let i = 0; i < link_resalt.length; i++) {
    link_resalt[i].style.textDecoration = "none";
  }
  
  localStorage.removeItem('token_6');
  ($('.key-speech')[0].checked = false);
  remove_speech_mode();
  

});
