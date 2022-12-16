var express = require('express');
var router = express.Router();

var readyToAdd = false;

router.get('/stop', function (req, res, next) {
  var something;
  if ('use' in something);
});

router.get('/tst', function (req, res, next) {
  if ('logged' in req.session) {
    res.send(req.session.email);
  } else {
    res.send();
  }
});

//user
router.get('/initUser/:userId', function (req, res, next) {
  if (req.session.logged) {
    req.pool.getConnection(function (err, connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var id = req.params.userId;
      var query = "SELECT * FROM userData WHERE UserId = ?";
      connection.query(query, [id], function (err, rows, fields) {
        connection.release();
        if (err) {
          res.sendStatus(500);
          return;
        }
        req.session.Uid = rows[0].UserId;
        req.session.MailNot = rows[0].emailNotifi;
        req.session.email = rows[0].email;
        res.send();
      });
    });
  }
  else {
    res.sendStatus(403);
  }
});

router.post('/testUser', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var password = req.body.password;
    var email = req.body.email;
    var query = "SELECT UserId FROM userData WHERE email = ? AND password = ?";
    connection.query(query, [email, password], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      req.session.logged = true;
      res.json(rows);
    });
  });
});

router.post('/testEmail', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var email = req.body.email;
    var query = "SELECT email FROM userData WHERE email = ?";
    connection.query(query, [email], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (JSON.stringify(rows) == "[]") {
        readyToAdd = true;
      }
      res.json(rows);
    });
  });
});

router.post('/addUser', function (req, res, next) {
  if (readyToAdd) {
    req.pool.getConnection(function (err, connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var f_name = req.body.firstname;
      var l_name = req.body.lastname;
      var email = req.body.email;
      var emailNotifi = req.body.emailNotifi;
      var password = req.body.password;

      var query = "INSERT INTO userData (firstname, lastname, email, emailNotifi, password) VALUES (?, ?, ?, ?, ?)";
      connection.query(query, [f_name, l_name, email, emailNotifi, password], function (err, result) {
        connection.release();
        if (err) {
          res.sendStatus(500);
          return;
        }
        readyToAdd = false;
        res.send();
      });
    });
  }
  else {
    res.sendStatus(403);
  }
});

router.post('/a_login', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var email = req.body.email;
    var pass = req.body.password;
    var query = "SELECT username FROM Admins WHERE username = ? AND password = ?";
    connection.query(query, [email, pass], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return
      }
      if (JSON.stringify(rows) == "[]") {
        res.json(rows);
      }
      else {
        req.session.uName = rows[0].username;
        req.session.a_logged = true;
        res.json(rows);
      }
    });

  });
});

//invite
router.post('/clickAvailable', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var code = req.body.code
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var time_a_s = req.body.time_a_s
    var time_a_u = req.body.time_a_u
    var Time_availability = 1
    var query = "SELECT Event_Id,HostId FROM Events WHERE Code = ?";
    connection.query(query, [code], function (err, rows, fields) {
      if(err){
        res.sendStatus(500);
        return;
      }
      var Uid;
      if ('Uid' in req.session) {
        Uid = req.session.Uid;
      }
      else {
        Uid = NULL;
      }
      query = "INSERT INTO Participants (First_name,Last_name,Time_availability,Time_availability_Start,Time_availability_End,Event_Id,UserId) VALUES (?,?,?,?,?,?, ?)";
      connection.query(query, [firstname, lastname, Time_availability, time_a_s, time_a_u, rows[0]["Event_Id"], Uid], function (err, result) {
        connection.release();
        if (err) {
          res.sendStatus(500);
          return;
        }
        let data = {
          "code": 1,
          "msg": "success"
        }
        res.json(data);
      });
    })
  });
});

router.post('/clickUnavailable', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var code = req.body.code;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var time_a_s = req.body.time_a_s;
    var time_a_u = req.body.time_a_u;
    var Time_availability = 0;
    var query = "SELECT Event_Id FROM Events WHERE Code = ?";
    connection.query(query, [code], function (err, rows, fields) {
      var Uid;
      if ('Uid' in req.session) {
        Uid = req.session.Uid;
      }
      else {
        Uid = NULL;
      }
      query = "insert into Participants (First_name,Last_name,Time_availability,Time_availability_Start,Time_availability_End,Event_Id) values (?,?,?,?,?,?)";
      connection.query(query, [firstname, lastname, Time_availability, time_a_s, time_a_u, rows[0]["Event_Id"], Uid], function (err, result) {
        connection.release();
        if (err) {
          res.sendStatus(500);
          return;
        }
        let data = {
          "code": 1,
          "msg": "success"
        }
        res.json(data);
      });
    });

  });
});

router.post('/getCodeInfo', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var code = req.body.code
    var query = "SELECT * FROM Events WHERE Code = ?";
    connection.query(query, [code], function (err, rows, fields) {
      connection.release();

      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

//nodemailer
const nodemailer = require('nodemailer');

const CLIENT_ID = "271136599495-20om8338qmq2o4b65r9aij37lnrkro21.apps.googleusercontent.com"

const CLIENT_SECRET = "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";

router.post('/users/sendemailtojoiner', function (req, res, next) {
  if('logged' in req.session){
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var Code = req.body.code;
    var query = "SELECT * FROM Events WHERE Code = ?";
    connection.query(query, [Code], function (err, rows, fields) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var e_name = rows[0].Event_name;
      var s_time = rows[0].Starting_time_of_event;
      var e_time = rows[0].Ending_time_of_event;
      var query2 = "SELECT userData.email FROM userData INNER JOIN Participants WHERE Participants.Event_Id = ?"
      connection.query(query2, [rows[0].Event_Id], function (err, rows, fields) {
        connection.release();
        if (err) {
          res.sendStatus(500);
          return;
        }
        var email = rows[0].email;
        console.log(email);
        for (let i = 0; i < email.length; i++) {
          console.log("sending email");
          sendEmailTojoiner(e_name, s_time, e_time, email[i])
          .then((result) => {
            console.log("Email is sent" + result)
          })
          .catch((error) => {
            console.log("error is " + error.message)
          })
        }
        res.send();
      });
    });
  });
}
});

router.post('/sendemailtocreater', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var code = req.body.code;
    var query = "SELECT Event_Id, Event_name FROM Events WHERE Code = ?";
    connection.query(query, [code], function (err, rows, fields) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var Eid = rows[0].Event_Id;
      var e_name = rows[0].Event_name;
      var query2 = "SELECT * FROM Participants WHERE Event_Id = ? AND UserId IS NOT NULL";
      connection.query(query2, [Eid], function (err, rows, fields) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var s_time = rows[0].Time_availability_Start;
        var e_time = rows[0].Time_availability_End;
        var ava = rows[0].Time_availability;
        var F_name = rows[0].First_name;
        var L_name = rows[0].Last_name;

        var uid = rows[0].UserId;
        var query3 = "SELECT email FROM userData WHERE UserId = ?";
        connection.query(query3, [uid], function (err, rows, fields) {
          connection.release();
          if (err) {
            res.sendStatus(500);
            return;
          }
          var email = rows[0].email;
          sendEmailTocreater(F_name, L_name, ava, s_time, e_time, e_name, email)
          .then((result) => {
            console.log("Email is sent" + result)
          })
          .catch((error) => {
            console.log("error is " + error.message)
          })
          res.send();
        });
      });
    });
  });
});

async function sendEmailTocreater(F_name, L_name, ava, s_time, e_time, e_name, email) {
  try {

    var mail;
    if (ava) {
      mail = '<p>' + F_name + ' ' + L_name + ' has stated that they are available between ' + s_time + '~' + e_time + ' for your ' + e_name + ' event.</p>';
    }
    else {
      mail = '<p>' + F_name + ' ' + L_name + ' has stated that they are unavailable for your ' + e_name + ' event.</p>';
    }
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: "f272382205@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: "1//04Ay-v-ulZqtQCgYIARAAGAQSNwF-L9Irfn45LRtGErLgGxgCQC95DzCqug9PHxiHm2vmHl8UdH5rLwc8RVvsW5Xzk0_3M3BgvNA",
        accessToken: "ya29.a0ARrdaM8Ay4J8ws416I31HdjgoNoXm6amVWKHapNYNEVP6EjF7O6N8DMD1mKP5HvNmsYsKE-T7RmLm8RwlQguf0OseeQnkWsWXpT0eI8bdsxlpiLgiUnSiQsnry2tmdfDAnG5KyP5qxKklFQKO3pV7V35Ewaz",
      },
    });

    const mail1 = {
      from: 'f272382205@gmail.com',
      to: email, //creater email address
      subject: 'New availability',
      text: 'Availability email',
      html: mail
    }

    const result = await transport.sendMail(mail1)

    return result

  } catch (error) {
    return error
  }
}


async function sendEmailTojoiner(e_name, s_time, e_time, email) {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: "f272382205@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: "1//04Ay-v-ulZqtQCgYIARAAGAQSNwF-L9Irfn45LRtGErLgGxgCQC95DzCqug9PHxiHm2vmHl8UdH5rLwc8RVvsW5Xzk0_3M3BgvNA",
        accessToken: "ya29.a0ARrdaM8Ay4J8ws416I31HdjgoNoXm6amVWKHapNYNEVP6EjF7O6N8DMD1mKP5HvNmsYsKE-T7RmLm8RwlQguf0OseeQnkWsWXpT0eI8bdsxlpiLgiUnSiQsnry2tmdfDAnG5KyP5qxKklFQKO3pV7V35Ewaz",
      },
    });

    const mail1 = {
      from: 'f272382205@gmail.com',
      to: email, //joiner email address
      subject: 'Your joined event is finalised',
      text: 'finalised event',
      html: '<p>The event ' + e_name + ' that you stated available to is now finalised, the finalised time is ' + s_time + '~' + e_time + '</p>'
    }

    const result = await transport.sendMail(mail1);
    console.log(result);
    return result

  } catch (error) {
    return error
  }
}



module.exports = router;