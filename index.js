const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());
const fs = require("fs");
const mysql = require("mysql2");
const crypto = require("crypto");

// Typically salt should be added by process.env but for purpose of application
// we have hard coded it
const salt = "VEhJU0lTU0FMVA==";
// Large parts of this code was adapted from COMP 1537 Assignment 6 by Bryant Lee,
// and updated to fit the needs of our app for COMP 2800 and 2537.

app.use("/js", express.static("./js"));
app.use("/css", express.static("./css"));
app.use("/img", express.static("./img"));
app.use("/fonts", express.static("./fonts"));

const connection = mysql.createPool({
  host: "qz8si2yulh3i7gl3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "x5jik86tot8uvxxj",
  password: "i00fx64bxpqn6c86",
  database: "m83arv6eoap3s9bs",
  multipleStatements: false,
});

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
    } else {
      res.redirect(`/profile/${req.session.user_name}`);
    }
  } else {
    let doc = fs.readFileSync("./index.html", "utf8");
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
    let doc = fs.readFileSync("./admin.html", "utf8");
    res.send(doc);
  } else if (
    req.session.loggedIn &&
    req.session.user_name === req.params.user_name
  ) {
    let doc = fs.readFileSync("./template.html", "utf8");
    res.send(doc);
  } else {
    res.redirect("/");
  }
});

app.post("/login", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const username = req.body.user_name;
  // Note: User passwords must be created through sign up
  const pwd = hash(req.body.password + salt);

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
    }
  );
});

app.get("/users", function (req, res) {
  connection.execute(
    "SELECT * FROM BBY29_user WHERE ID <> " + req.session.user_ID,
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

  // Bryant - password hashing
  const pwhash = hash(req.body.password + salt);

  // TO PREVENT SQL INJECTION, DO THIS:
  // (FROM https://www.npmjs.com/package/mysql#escaping-query-values)
  connection.query(
    "INSERT INTO BBY29_user (user_name, first_name, last_name, email, phone_number, admin, password, avatar_path) values (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.user_name,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone_number,
      0,
      pwhash,
      0,
    ],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      res.send({
        status: "success",
        msg: "Record added.",
      });
    }
  );
});

app.post("/update-user", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const column = req.body.column;
  const value = req.body.value;
  const id = req.body.id;
  //With password
  connection.execute(
    "UPDATE BBY29_user SET " + column + " = ? WHERE ID = ?",
    [value, id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send({
          status: "success",
          msg: "Record added.",
        });
      }
    }
  );
});

app.post("/delete_user", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const id = req.body.id;

  connection.execute(
    "DELETE FROM BBY29_user WHERE ID = ?",
    [id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send({
          status: "success",
          msg: "Record added.",
        });
      }
    }
  );
});
// Gabriel's code (end)

function hash(pw) {
  // implement hashing
  return crypto.createHash("md5").update(pw).digest("base64");
}

// Jacob's code (Beginning)
app.post("/passwordCheck", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const user = req.session.user_name;
  const pass = hash(req.body.password + salt);

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
  const avatar = req.body.avatar_path;
  const pass = req.body.password;

  //With password
  if (pass) {
    connection.execute(
      "UPDATE BBY29_user SET user_name = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?, password = ?, avatar_path = ? WHERE ID = ?",
      [username, fName, lName, em, pNum, pass, avatar, req.session.user_ID],
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
          res.send({
            status: "success",
            msg: "Record added.",
          });
        }
      }
    );
  } else {
    connection.execute(
      "UPDATE BBY29_user SET user_name = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?, avatar_path = ? WHERE ID = ?",
      [username, fName, lName, em, pNum, avatar, req.session.user_ID],
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
          res.send({
            status: "success",
            msg: "Record added.",
          });
        }
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
    let doc = fs.readFileSync("./account.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/account");
  } else {
    res.redirect("/");
  }
});

app.get("/current_user", function (req, res) {

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
    }
  );
});

// Jacob's code (end)
// Heroku Dynamically assigns port via process.env.PORT.
// When running locally process.env.PORT is undefined so runs on port 8000
app.listen(process.env.PORT || 8000);