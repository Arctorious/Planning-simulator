
var express = require('express');
var router = express.Router();

router.use('/*', function (req, res, next) {
  if (!('logged' in req.session)) {
    res.sendStatus(403);
    return;
  }
  next();
});

router.post('/testName', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var query = "SELECT UserId FROM userData WHERE firstname = ? AND lastname = ? AND UserId = ?";
    connection.query(query, [fname, lname, req.session.Uid], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


router.post('/changeName', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var query = "UPDATE userData SET firstname = ?, lastname = ? WHERE UserId = ?";
    connection.query(query, [fname, lname, req.session.Uid], function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

router.post('/changeEmail', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var mail = req.body.email;
    var query = "UPDATE userData SET email = ? WHERE UserId = ?";
    connection.query(query, [mail, req.session.Uid], function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

router.post('/changePass', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var pass = req.body.password;
    var query = "UPDATE userData SET password = ? WHERE UserId = ?";
    connection.query(query, [pass, req.session.Uid], function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

router.post('/testPass', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var pass = req.body.password;
    var query = "SELECT UserId FROM userData WHERE password = ? AND UserId = ?";
    connection.query(query, [pass, req.session.Uid], function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

router.post('/testEmail', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var mail = req.body.email;
    var query = "SELECT UserId FROM userData WHERE email = ? AND UserId = ?";
    connection.query(query, [mail, req.session.Uid], function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

router.post('/testEmail', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var not = req.body.mailNot;
    var query = "UPDATE userData SET emailNotifi = ? WHERE UserId = ?";
    connection.query(query, [not, req.session.Uid], function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

router.post('/getEvent', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var Event_id = req.body.EventId;
    var query = "SELECT * FROM Events WHERE Event_id = ?";
    connection.query(query, [Event_id], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.post('/getAllEvent', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Events";
    connection.query(query, function (err, rows, fields) {
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


router.post('/getEventByToday', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var year = req.body.year1
    var mon = req.body.mon1
    var day = req.body.date1
    var query = "SELECT * FROM Events where Finalisation_status =1 and Year_of_event = ?  and Month_of_event=? and Day_of_event =?";
    connection.query(query, [year, mon, day], function (err, rows, fields) {
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

router.post('/getJoinInfo', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT Events.Event_name FROM Events INNER JOIN Participants on Events.Event_Id = Participants.Participant_Id WHERE Events.Finalisation_status = 1 AND Participants.Time_availability = 1;";
    connection.query(query, function (err, rows, fields) {
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

router.post('/finishEvent', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var Starting_time_of_event = req.body.time2;
    var Ending_time_of_event = req.body.time2To;
    var code = req.body.code;


    var query = "UPDATE Events SET Starting_time_of_event = ?,Ending_time_of_event=?,Finalisation_status=1 WHERE Code = ?";
    connection.query(query, [Starting_time_of_event, Ending_time_of_event, code], function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      let data = {
        "code": 1,
        "msg": "success"
      }
      req.session.finalise = true;
      res.json(data);
    });
  });
});


router.post('/addevent', function (req, res, next) {

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var Event_name = req.body.EventName;
    var Event_decription = req.body.EventDecription;
    var Year_of_event = req.body.Yearoftheevent;
    var Month_of_event = req.body.Monthoftheevent;
    var Day_of_event = req.body.Dayoftheevent;
    var Starting_time_of_event = req.body.time;
    var Ending_time_of_event = req.body.timeTo;
    var Finalisation_status = 0;
    var HostId = req.session.Uid;
    var Code = req.body.code;

    /*req.session.Uid*/
    var query = "INSERT INTO Events (Event_name, Event_decription, Year_of_event, Month_of_event, Day_of_event,Starting_time_of_event,Ending_time_of_event,Finalisation_status,HostId,Code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [Event_name, Event_decription, Year_of_event, Month_of_event, Day_of_event, Starting_time_of_event, Ending_time_of_event, Finalisation_status, HostId, Code], function (err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      query = "select * from Events";
      connection.query(query, function (err, rows, fields) {
        connection.release();
        let data = {//也可以是数组 数组也会转化为json
          url: "/invite.html?code=" + Code,
          code: Code,
          EventId: result['insertId'],
          form: Starting_time_of_event,
          formTo: Ending_time_of_event,
          data: rows
        }
        res.json(data);
      })

    });
  });
});


module.exports = router;
