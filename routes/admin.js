var express = require('express');
var router = express.Router();

router.use('/*', function(req, res, next){
    if(!('a_logged' in req.session)){
      res.sendStatus(403);
      return;
    }
    next();
});

router.get('/changeName/:name', function(req, res, next){
    req.pool.getConnection(function(err, connection){
      if(err){
        res.sendStatus(500);
        return;
      }
      var name = req.params.name;
      var query = "UPDATE Admins SET username = ? WHERE username = ?";
      connection.query(query, [name, req.session.uName], function(err, result){
        connection.release();
        if(err){
          res.sendStatus(500);
          return;
        }
        req.session.uName = name;
        res.send();
      });
    });
});

router.get('/changePassword/:password', function(req, res, next){
    req.pool.getConnection(function(err, connection){
      if(err){
        res.sendStatus(500);
        return;
      }
      var pass = req.params.password;
      var query = "UPDATE Admins SET password = ? WHERE username = ?";
      connection.query(query, [pass, req.session.uName], function(err, result){
        connection.release();
        if(err){
          res.sendStatus(500);
          return;
        }
        res.send();
      });
    });
});

router.get('/testName/:name', function(req, res, next){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var name = req.params.name;
    var query = "SELECT username FROM Admins WHERE username = ?";
    connection.query(query, [name], function(err, rows, fields){
      connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.get('/testPass/:password', function(req, res, next){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var pass = req.params.password;
    var query = "SELECT username FROM Admins WHERE password = ? AND username = ?";
    connection.query(query, [pass, req.session.uName], function(err, rows, fields){
      connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.post('/addUser', function(req, res, next){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var pass = req.body.password;
    var username = req.body.username;

    var query = "INSERT INTO Admins VALUES (?, ?)";
    connection.query(query, [username, pass], function(err, result){
      connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.send();
    })
  });
});

router.get('/getEvents', function(req, res, next){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Events";
    connection.query(query, function(err, rows, fields){
      connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    })
  });
});

router.get('/getUsers', function(req, res, next){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM userData";
    connection.query(query, function(err, rows, fields){
      connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    })
  });
});

router.get('/delUser/:user', function(req, res, next){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var uid = req.params.user
    var query = "DELETE FROM userData WHERE UserId = ?";
    connection.query(query, [uid], function(err, result){
      connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.send();
    })
  });
});

router.get('/delEvent/:event', function(req, res, next){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var eId = req.params.event;
    var query = "DELETE FROM Events WHERE Event_Id = ?";
    connection.query(query, [eId], function(err, result){
      connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.send();
    })
  });
});



module.exports = router;