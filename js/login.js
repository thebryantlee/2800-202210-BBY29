const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());
const fs = require("fs");
const mysql = require("mysql2");

// Large parts of this code was adapted from COMP 1537 Assignment 6 by Bryant Lee,
// and updated to fit the needs of our app for COMP 2800 and 2537.

app.use("/js", express.static("../js"));
app.use("/css", express.static("../css"));
app.use("/img", express.static("../img"));
app.use("/fonts", express.static("../fonts"));

app.use(
  session({
    secret: "CaleMakarIsCool",
    name: "2800BBY29",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", function (req, res) {
  if (req.session.loggedIn) {
    if (req.session.admin) {
      // redirect to admin page
      res.redirect(`/profile/${req.session.user_name}`);
      console.log("Logged In.");
    } else {
      res.redirect(`/profile/${req.session.user_name}`);
      console.log("Logged In.");
    }
  } else {
    let doc = fs.readFileSync("../index.html", "utf8");
    res.set("Server", "TechToTheMoon Engine");
    res.set("X-Powered-By", "MoonPC");
    res.send(doc);
  }
});

app.get("/profile/:user_name", function (req, res) {
  if (
    req.session.loggedIn &&
    req.session.admin &&
    req.session.user_name === req.params.user_name
  ) {
    // TODO: create admin html page
    // and then replace main with admin
    let doc = fs.readFileSync("../admin.html", "utf8");
    res.send(doc);
  } else if (
    req.session.loggedIn &&
    req.session.user_name === req.params.user_name
  ) {
    let doc = fs.readFileSync("../template.html", "utf8");
    res.send(doc);
  } else {
    res.redirect("/");
  }
});

app.post("/login", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const username = req.body.user_name;
  const pwd = req.body.password;
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "COMP2800",
    // Below is the hosting data for Bryant's MacBook
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: 'comp1537',
    // database: 'COMP2800'
  });
  connection.connect(function (err) {
    if (err) {
      return console.error("error: " + err);
    }
  });
  connection.execute(
    "SELECT * FROM BBY29_user WHERE BBY29_user.user_name = ? AND BBY29_user.password = ?",
    [username, pwd],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length === 1) {
          req.session.admin = results[0].admin;
          req.session.user_name = results[0].user_name;
          req.session.loggedIn = true;
          req.session.email = results[0].email;
          req.session.name = `${results[0].first_name} ${results[0].last_name}`;
          req.session.user_ID = results[0].ID;
          req.session.save(function (err) {
            console.log("Session saved.");
          });
          const resObj = {
            user_name: results[0].user_name,
            first_name: results[0].first_name,
            admin: results[0].admin,
          };
          res.send(resObj);
        } else {
          res.sendStatus(401);
        }
      }
      connection.end();
    }
  );
});

app.get("/users", function (req, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "COMP2800",
    // Below is the hosting data for Bryant's MacBook
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: 'comp1537',
    // database: 'COMP2800'
  });
  connection.connect(function (err) {
    if (err) {
      res.send(err);
      return console.error("error: " + err);
    }
  });
  connection.execute(
    "SELECT * FROM BBY29_user",
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length > 0) {
          res.send(results);
        } else {
          res.sendStatus(400);
        }
      }
      connection.end();
    }
  );
});

// Gabriel's code (start)
app.post("/logout", function (req, res) {
  if (req.session) {
    req.session.destroy(function (error) {
      if (error) {
        res.status(400).send("Unable to log out");
      } else {
        res.sendStatus(200);
      }
    });
  }
});

app.post("/add_user", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  console.log("userName", req.body.user_name);
  console.log("firstName", req.body.first_name);
  console.log("lastName", req.body.last_name);
  console.log("Email", req.body.email);
  console.log("phoneNumber", req.body.phone_number);
  console.log("Password", req.body.password);

  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "COMP2800",
    // Below is the hosting data for Bryant's MacBook
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: 'comp1537',
    // database: 'COMP2800'
  });
  connection.connect();

  // TO DO: Work in progress, to be completed in sprint 3.

  // TO PREVENT SQL INJECTION, DO THIS:
  // (FROM https://www.npmjs.com/package/mysql#escaping-query-values)
  connection.query(
    "INSERT INTO BBY29_user (user_name, first_name, last_name, email, phone_number, admin, password) values (?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.user_name,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone_number,
      0,
      req.body.password,
    ],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      //console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Record added.",
      });
    }
  );
  connection.end();
});
// Gabriel's code (end)

// Jacob's code (Beginning)
app.post("/passwordCheck", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const user = req.session.user_name;
  const pass = req.body.password;
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "COMP2800",
    // Below is the hosting data for Bryant's MacBook
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: 'comp1537',
    // database: 'COMP2800'
  });
  connection.connect(function (err) {
    if (err) {
      return console.error("error: " + err);
    }
  });
  connection.execute(
    "SELECT * FROM BBY29_user WHERE BBY29_user.user_name = ? AND BBY29_user.password = ?",
    [user, pass],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length === 1) {
          res.send(results);
        } else {
          res.sendStatus(400);
        }
      }
      connection.end();
    }
  );
});

app.post("/updateData", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const username = req.body.user_name;
  const fName = req.body.first_name;
  const lName = req.body.last_name;
  const em = req.body.email;
  const pNum = req.body.phone_number;
  const pass = req.body.password;

  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "COMP2800",
    // Below is the hosting data for Bryant's MacBook
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: 'comp1537',
    // database: 'COMP2800'
  });
  connection.connect(function (err) {
    if (err) {
      return console.error("error: " + err);
    }
  });
  //With password
  if (pass) {
    connection.execute(
      "UPDATE BBY29_user SET user_name = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?, password = ? WHERE ID = ?",
      [username, fName, lName, em, pNum, pass, req.session.user_ID],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else {
          req.session.user_name = username;
          req.session.email = em;
          req.session.name = fName + " " + lName;
          req.session.save(function (err) {
            console.log("Session saved.");
          });
          const resObj = {
            user_name: username,
          };
          res.send(resObj);
        }
        connection.end();
      }
    );
  } else {
    connection.execute(
      "UPDATE BBY29_user SET user_name = ?, first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE ID = ?",
      [username, fName, lName, em, pNum, req.session.user_ID],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else {
          req.session.user_name = username;
          req.session.email = em;
          req.session.name = fName + " " + lName;
          req.session.save(function (err) {
            console.log("Session saved.");
          });
          const resObj = {
            user_name: username,
          };
          res.send(resObj);
        }
        connection.end();
      }
    );
  }
});

app.get("/account", function (req, res) {
  if (req.session.loggedIn) {
    // Redirect to account page
    res.redirect(`/account/${req.session.user_name}`);
    console.log("Redirected to account page.");
  } else {
    res.redirect("/");
  }
});

app.get("/account/:user_name", function (req, res) {
  if (req.session.loggedIn && req.session.user_name === req.params.user_name) {
    let doc = fs.readFileSync("../account.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/account");
  } else {
    res.redirect("/");
  }
});

app.get("/current_user", function (req, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "COMP2800",
    // Below is the hosting data for Bryant's MacBook
    // host: '127.0.0.1',
    // port: 3306,
    // user: 'root',
    // password: 'comp1537',
    // database: 'COMP2800'
  });
  connection.connect(function (err) {
    if (err) {
      res.send(err);
      return console.error("error: " + err);
    }
  });
  connection.execute(
    "SELECT * FROM BBY29_user WHERE BBY29_user.user_name = ?",
    [req.session.user_name],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length === 1) {
          res.send(results);
        } else {
          res.sendStatus(400);
        }
      }
      connection.end();
    }
  );
});

// Jacob's code (end)

let port = 8000;
app.listen(port, function () {
  console.log("This project is served on port " + port + ".");
});
