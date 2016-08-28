
/**
 * script für die Anmeldungsmaske des FPraktikums
 * August 2016
 *
 * TODO: check input, farbige Markierung der freien Plätze, automatische Definiation der Institutwahl
 *       styling
 */
console.log('script is loaded');

function institutWahl(studiengang) {
  
  var target = document.getElementById('institut-wahl');  

  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        var response = JSON.parse(httpRequest.responseText);

        var text_haelfte1 = "";
        var text_haelfte2 = "";

        var data = response[studiengang];

        for (var institut in data) {
          if (data[institut]['1']) {
            text_haelfte1 += "<input type='radio' name='institut1' value='"+institut+"'>\
              "+institut+" - Frei: "+data[institut]['1']+"</span><br>";
          }
          if (data[institut]['2']) {
            text_haelfte2 += "<input type='radio' name='institut2' value='"+institut+"'>\
              "+institut+" - Frei: "+data[institut]['2']+"</span><br>";
          }          
        }

        target.innerHTML = "1. Semesterhälfte:<br>"+text_haelfte1
                          +"2.Semesterhälfte:<br>"+text_haelfte2;
      };
    }
    catch(e) {
      alert('Es ist ein Fehler beim Abrufen der freien Plätze aufgetreten: ' + e);
    }
  }

  httpRequest.open('GET', './Customizing/global/include/fpraktikum/fp-ajax-request.php?task=freePlaces');
  httpRequest.send();

  
  // switch (studiengang) {
  // 	case 'bachelor':
  // 	  target.innerHTML = "1. Semesterhälfte:<br>\
  //       <input type='radio' name='institut1' value='IAP'>IAP - Frei: <span id='IAP1-frei'></span><br>\
  //       <input type='radio' name='institut1' value='PI'>PI - Frei: <span id='PI1-frei'></span><br>\
  //       2.Semesterhälfte:<br>\
  //       <input type='radio' name='institut2' value='IAP'>IAP - Frei: <span id='IAP2-frei'></span><br>\
  //       <input type='radio' name='institut2' value='PI'>PI - Frei: <span id='PI2-frei'></span><br>";
  // 	  break;
  // 	case 'master':
  // 	  target.innerHTML = "1.Semesterhälfte:<br>\
  //       <input type='radio' name='institut1' value='IAP'>IAP - Frei: <span id='IAP1-frei'></span><br>\
  //       <input type='radio' name='institut1' value='PI'>PI - Frei: <span id='PI1-frei'></span><br>\
  //       <input type='radio' name='institut1' value='ITP'>ITP - Frei: <span id='ITP1-frei'></span><br>\
  //       2.Semesterhälfte:<br>\
  //       <input type='radio' name='institut2' value='IAP'>IAP - Frei: <span id='IAP2-frei'></span><br>\
  //       <input type='radio' name='institut2' value='PI'>PI - Frei: <span id='PI2-frei'></span><br>\
  //       <input type='radio' name='institut2' value='ITP'>ITP - Frei: <span id='ITP2-frei'></span><br>";
  //     break;
  //}
  
}

/**
 * if the cehckbox is checked include the partner-form
 */
function partnerWahl(element) {
  var target = document.getElementById('partnerWahl');
  if (element.checked) {
    target.innerHTML = "<div>\
      HRZ-Account: <input onblur='checkPartner()' id='partner-hrz' type='text' name='partner-hrz' placeholder='s1234567'>\
      Nachname: <input onblur='checkPartner()' id='partner-name' type='text' name='partner-name'><br>\
      <span id='partner-correct'></span>\
      </div><br>";
  } else {
    target.innerHTML = "";
  }
}

/**
 * ajax-call to determine if there is a registered user with this combination of hrz and last-name
 */
function checkPartner() {
  var hrz = document.getElementById('partner-hrz').value;
  var name = document.getElementById('partner-name').value;

  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        var response = JSON.parse(httpRequest.responseText);
        console.log(response);

        document.getElementById('partner-correct').innerHTML =
          (response) ? 'Gefunden!' : 'Nicht gefunden!';
      };
    }
    catch(e) {
      alert('Es ist ein Fehler beim Abrufen des Partners aufgetreten: ' + e);
    }
  }

  httpRequest.open('GET', './Customizing/global/include/fpraktikum/fp-ajax-request.php?task=partner&hrz='+hrz+'&name='+name);
  httpRequest.send();
}

/**
 * ajax-call to get the free places in each institute
 */
function freePlaces() {
  
}
