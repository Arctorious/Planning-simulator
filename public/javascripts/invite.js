function ifLogged() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.response != "[]") {
          var profile = document.getElementById("user");
          profile.href = window.location.href + "/users/profile.html";
          profile.innerHTML = this.response;
          var placeholder = document.getElementById("placeholder");
          var logoutButton = document.createElement("button");
          logoutButton.id = "login";
          logoutButton.innerHTML = "logout";
          placeholder.parentNode.replaceChild(logoutButton, placeholder);
          logoutButton.onmouseup = function () {
            window.location.pathname = '/logout';
          }
        }
      }
    }
    xhttp.open("GET", '/tst', true);
    xhttp.send();
  }

  const params = new URLSearchParams(window.location.search);
  var p = params.get('code');


  const googleLog = document.getElementById("google");
  googleLog.onmouseover = function () {
    this.src = "/images/btn_google_signin_dark_focus_web@2x.png";
  }
  googleLog.onmouseleave = function () {
    this.src = "/images/btn_google_signin_dark_normal_web@2x.png";
  }
  googleLog.onmousedown = function () {
    this.src = "/images/btn_google_signin_dark_pressed_web@2x.png";
  }
  googleLog.onmouseup = function () {
    this.src = "/images/btn_google_signin_dark_focus_web@2x.png";
  }

  var year;
  var month;
  var day;

  $(function () {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }


    $.ajax({
      url: "/getCodeInfo",
      type: "post",
      data: { code: GetQueryString("code") },
      dataType: "json",
      async: false,
      success: function (data) {
        if (data[0]) {
          year = data[0].Year_of_event;
          month = data[0].Month_of_event;
          day = data[0].Day_of_event;
          $("#eve-nm").text(data[0]["Event_name"])
          $("#eve-dt").text(data[0]["Day_of_event"] + "/" + data[0]["Month_of_event"] + "/" + data[0]["Year_of_event"])
          $("#eve-dp").text(data[0]["Event_decription"])
        } else {
            alert("INVALID CODE");
          window.location.pathname = '/';
        }
      }

    })


    $("#ava1").click(function () {
      $.ajax({
        url: "/clickAvailable",
        type: "post",
        data: { code: GetQueryString("code"), firstname: $("#firstname").val(), lastname: $("#lastname").val(), time_a_s: $("#time_a_s").val(), time_a_u: $("#time_a_u").val() },
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.code == 0) {
            alert(data.msg)
          }
          var sendEmail = new XMLHttpRequest()
          sendEmail.open("POST", "/sendemailtocreater", true);
          sendEmail.setRequestHeader("Content-type", "application/json");
          sendEmail.send(JSON.stringify({code: p}));
        }

      })
    })

    $("#ava2").click(function () {
      $.ajax({
        url: "/clickUnavailable",
        type: "post",
        data: { code: GetQueryString("code"), firstname: $("#firstname").val(), lastname: $("#lastname").val(), time_a_s: $("#time_a_s").val(), time_a_u: $("#time_a_u").val() },
        dataType: "json",
        async: false,
        success: function (data) {
          if (data.code == 0) {
            alert(data.msg)
          }
          var sendEmail = new XMLHttpRequest()
          sendEmail.open("POST", "/sendemailtocreater", true);
          sendEmail.setRequestHeader("Content-type", "application/json");
          sendEmail.send(JSON.stringify({ code: p }));
        }

      })
    })
  })

  var buttons = document.getElementsByTagName("button");

  var siz = buttons.length;

  for (let i = 0; i < siz; i++) {
    buttons[i].onmouseover = function () {
      this.classList.add("lighter");
    };
    buttons[i].onmouseleave = function () {
      this.classList.remove("lighter");
    };
    buttons[i].onmousedown = function () {
      this.classList.add("darker");
    };
    buttons[i].onmouseup = function () {
      this.classList.remove("darker");
    };
  }

  var ava1 = document.getElementById("ava1");
  ava1.onmouseup = function () {

    this.classList.remove("darker");

    var msg = document.getElementById("errmsg");
    var paragraph = document.createElement("i");
    var failmsg = document.createElement("p");

    var time1 = document.getElementById("time_a_s").value;
    var time2 = document.getElementById("time_a_u").value;
    var F_name = document.getElementById("firstname").value;
    var L_name = document.getElementById("lastname").value;

    if (time1 && time2 && F_name && L_name) {
      msg.innerHTML = "";
      Redirecting = true;
      paragraph.innerHTML = "Receiving your availability informatiion...";
      failmsg.appendChild(paragraph);
      failmsg.classList.add("success-message");
      msg.appendChild(failmsg);
    }
    else {
      msg.innerHTML = "";
      paragraph.innerHTML = "Please do not leave your inputs empty!";
      failmsg.appendChild(paragraph);
      failmsg.classList.add("fail-message");
      msg.appendChild(failmsg);
    }
  };

  var ava2 = document.getElementById("ava2");
  ava2.onmouseup = function () {
    this.classList.remove("darker");

    var msg = document.getElementById("errmsg");
    var paragraph = document.createElement("i");
    var failmsg = document.createElement("p");

    var F_name = document.getElementById("firstname").value;
    var L_name = document.getElementById("lastname").value;

    if (!F_name && !L_name) {
      msg.innerHTML = "";
      paragraph.innerHTML = "Please do not leave your names empty!";
      failmsg.appendChild(paragraph);
      failmsg.classList.add("fail-message");
      msg.appendChild(failmsg);
    }
    else if (!Redirecting) {
      paragraph.innerHTML = "Receiving your availability informatiion...";
      failmsg.appendChild(paragraph);
      failmsg.classList.add("success-message");
      msg.appendChild(failmsg);
    }
  };
  var finished = false;
  googleLog.onmouseup = function () {
    this.src = "/images/btn_google_signin_dark_focus_web@2x.png";
    var msg = document.getElementById("errmsg");
    var paragraph = document.createElement("i");
    var failmsg = document.createElement("p");

    var time1 = document.getElementById("time_a_s").value;
    var time2 = document.getElementById("time_a_u").value;
    var F_name = document.getElementById("firstname").value;
    var L_name = document.getElementById("lastname").value;


    if (time1 && time2 && F_name && L_name) {
      msg.innerHTML = "";
      Redirecting = true;
      paragraph.innerHTML = "Receiving your availability informatiion...";
      failmsg.appendChild(paragraph);
      failmsg.classList.add("success-message");
      msg.appendChild(failmsg);
      handleAuthClick();
      while (finished == false);
      var ajax;
      window.setTimeout(checkFlag, 100);
      if (document.getElementById("ava1").name == "1") {
        ajax = "/clickAvailable";
      }
      else {
        ajax = "/clickUnavailable";
      }

      var gl = new XMLHttpRequest();
      gl.open("POST", ajax, true);
      gl.setRequestHeader("Content-type", "application/json");
      gl.send(JSON.stringify({
        code: p,
        firstname: F_name,
        lastname: L_name,
        time_a_s: time1,
        time_a_u: time2
      }));
    }
    else {
      msg.innerHTML = "";
      paragraph.innerHTML = "Please do not leave your inputs empty!";
      failmsg.appendChild(paragraph);
      failmsg.classList.add("fail-message");
      msg.appendChild(failmsg);
    }
  }

  //the below are the code from google's javascript quickstater
  //additionally, they are edited to fit the page.

  // TODO(developer): Set to client ID and API key from the Developer Console
  const CLIENT_ID = '878424167618-5asqg34nvf1f4i0oo1adirbfcp28rht7.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyB5WSHZak0aNjvwA7TMjab1BaaNb98XIME'
  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  /**
  * Callback after api.js is loaded.
  */
  function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
  }

  /**
  * Callback after the API client is loaded. Loads the
  * discovery doc to initialize the API.
  */
  async function intializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
  }

  /**
  * Callback after Google Identity Services are loaded.
  */
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
  }

  /**
  *  Sign in the user upon button click.
  */
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await listUpcomingEvents();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
    handleSignoutClick()
  }

  /**
  *  Sign out the user upon button click.
  */
  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
    }
  }

  /**
  * Print the summary and start datetime/date of the next ten events in
  * the authorized user's calendar. If no events are found an
  * appropriate message is printed.
  */

  async function listUpcomingEvents() {
    let response;
    try {
      var datMin = new Date(year, parseInt(month) - 1, parseInt(day) + 1, -15, 30, 0, 0);
      var datMax = new Date(year, parseInt(month) - 1, parseInt(day) + 2, -15, 29, 59, 0);
      const request = {
        'calendarId': 'primary',
        'timeMin': datMin.toISOString(),
        'timeMax': datMax.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      alert(err.message);
      return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
      document.getElementById("ava1").name = "1";
      alert("You are available for the event day!");
      finished = true;
      return;
    }
    else {
      document.getElementById("ava1").name = "0";
      alert("You are unavailable for the event day!");
      finished = true;
      return;
    }
  }
