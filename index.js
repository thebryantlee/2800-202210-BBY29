const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const session = require("express-session");
const app = express();
app.use(express.json());
const fs = require("fs");
const mysql = require("mysql2");
const crypto = require("crypto");
const formatMessage = require("./js/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./js/users");
const server = http.createServer(app);
const io = socketio(server);

const puppeteer = require("puppeteer");
require("dotenv").config();

// Typically salt should be added by process.env but for purpose of application
// we have hard coded it
const salt = "VEhJU0lTU0FMVA==";
// Large parts of this code was adapted from COMP 1537 Assignment 6 by Bryant Lee,
// and updated to fit the needs of our app for COMP 2800 and 2537.

app.use("/js", express.static("./js"));
app.use("/css", express.static("./css"));
app.use("/img", express.static("./img"));
app.use("/fonts", express.static("./fonts"));

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
  host: "ebh2y8tqym512wqs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "rb7c537onneq71ia",
  password: "v7fagfy6agqcwws4",
  database: "bb8meh36r7vba1dz",
  multipleStatements: false,
};

const dbConfigLocal = {
  host: "localhost",
  user: "root",
  password: "",
  database: "COMP2800",
  multipleStatements: false,
};

if (is_heroku) {
  var connection = mysql.createPool(dbConfigHeroku);
} else {
  var connection = mysql.createPool(dbConfigLocal);
}

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
    let doc = fs.readFileSync("./landing.html", "utf8");
    res.set("Server", "TechToTheMoon Engine");
    res.set("X-Powered-By", "MoonPC");
    res.send(doc);
  }
});

app.get("/about", function (req, res) {
  let doc = fs.readFileSync("./about.html", "utf8");
  res.set("Server", "TechToTheMoon Engine");
  res.set("X-Powered-By", "MoonPC");
  res.send(doc);
});

app.get("/signin", function (req, res) {
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

app.post("/add_item", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const user = req.session.user_ID;
  const title = req.body.modelName;
  const amazon_url = req.body.amazonUrl;
  const bestbuy_url = req.body.bestBuyUrl;
  const newegg_url = req.body.neweggUrl;
  console.log(user);

  connection.execute(
    "INSERT INTO BBY29_item_tracker (user_ID, title, urlAmazon, urlBestBuy, urlNewEgg, priceAmazon, priceBestBuy, priceNewEgg, imgUrl) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [user, title, amazon_url, bestbuy_url, newegg_url, null, null, null, null],
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

app.get("/get_items", function (req, res) {
  connection.execute(
    "SELECT * FROM BBY29_item_tracker WHERE user_ID = " + req.session.user_ID,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length >= 0) {
          res.send(results);
        } else {
          res.sendStatus(500);
        }
      }
    }
  );
});

app.post("/get_item_details_amazon", async function (req, res) {
  const item_url = req.body.url;
  var priceStr;
  var imgUrl;
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    try {
      await page.goto(item_url, {
        waitUntil: "networkidle2",
      });
    } catch (e) {
      if (e instanceof puppeteer.errors.TimeoutError) {
        console.log("Puppeteer took too long to load the page!");
      }
    }

    const result = await page.evaluate(() => {
      return [
        JSON.stringify(
          document.querySelector('div[id="imgTagWrapperId"] > img').src
        ),
        JSON.parse(
          document
          .querySelector('span[class="a-offscreen"]')
          .innerText.substring(1)
          .replace(/,/g, "")
        ),
      ];
    });
    [priceStr] = [JSON.parse(result[1])];
    [imgUrl] = [JSON.parse(result[0])];
    console.log({
      priceStr,
    });
    console.log({
      imgUrl,
    });
    browser.close();
  } catch (error) {
    console.log(error);
    browser.close();
  }

  if (priceStr && imgUrl) {
    connection.execute(
      "UPDATE BBY29_item_tracker SET priceAmazon = ?, imgUrl = ? WHERE ID = " +
      req.body.id,
      [priceStr, imgUrl],
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
  } else {
    res.sendStatus(400);
  }
});

app.post("/get_item_details_bestbuy", async function (req, res) {
  const item_url = req.body.url;
  var priceStr;
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    try {
      await page.goto(item_url, {
        waitUntil: "networkidle0",
      });
    } catch (e) {
      if (e instanceof puppeteer.errors.TimeoutError) {
        console.log("Puppeteer took too long to load the page!");
      }
    }
    const result = await page.evaluate(() => {
      return [
        JSON.parse(
          document
          .querySelector('span[class="screenReaderOnly_2mubv large_3uSI_"]')
          .innerText.substring(1)
        ),
      ];
    });
    [priceStr] = [JSON.parse(result[0])];
    console.log({
      priceStr,
    });

    browser.close();
  } catch (error) {
    console.log(error);
  }

  if (priceStr) {
    connection.execute(
      "UPDATE BBY29_item_tracker SET priceBestBuy = ? WHERE ID = " +
      req.body.id,
      [priceStr],
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
  } else {
    res.sendStatus(400);
  }
});

app.post("/get_item_details_newegg", async function (req, res) {
  const item_url = req.body.url;
  var priceStr;
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    try {
      await page.goto(item_url, {
        waitUntil: "networkidle0",
      });
    } catch (e) {
      if (e instanceof puppeteer.errors.TimeoutError) {
        console.log("Puppeteer took too long to load the page!");
      }
    }

    const result = await page.evaluate(() => {
      return [
        JSON.parse(
          document
          .querySelector('div[class="product-offer"]')
          .children[1].innerText.substring(1)
          .replace(/,/g, "")
        ),
      ];
    });
    [priceStr] = [JSON.parse(result[0])];
    console.log({
      priceStr,
    });
    browser.close();
  } catch (error) {
    console.log(error);
  }

  if (priceStr) {
    connection.execute(
      "UPDATE BBY29_item_tracker SET priceNewEgg = ? WHERE ID = " + req.body.id,
      [priceStr],
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
  } else {
    res.sendStatus(400);
  }
});

app.post("/delete_item", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const item_id = req.body.id;

  connection.execute(
    "DELETE FROM BBY29_item_tracker WHERE ID = ?",
    [item_id],
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
  const pass = hash(req.body.password + salt);

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

app.get("/tracker", function (req, res) {
  if (req.session.loggedIn) {
    // Redirect to account page
    res.redirect(`/tracker/${req.session.user_name}`);
    console.log("Redirected to tracking page.");
  } else {
    res.redirect("/");
  }
});

app.get("/tracker/:user_name", function (req, res) {
  if (req.session.loggedIn && req.session.user_name === req.params.user_name) {
    let doc = fs.readFileSync("./tracker.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/tracker");
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

app.post("/uploadNews", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const user = req.session.user_ID;
  const title = req.body.title;
  const datetime = req.body.post_datetime;
  const categ = req.body.category;
  const article = req.body.full_article;

  //With password
  connection.execute(
    "INSERT INTO news_post (user_id, title, post_datetime, category, full_article) values (?, ?, ?, ?, ?)",
    [user, title, datetime, categ, article],
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

app.get("/news", function (req, res) {
  if (req.session.loggedIn) {
    // Redirect to account page
    res.redirect(`/news/${req.session.user_name}`);
    console.log("Redirected to news page.");
  } else {
    res.redirect("/");
  }
});

app.get("/news/:user_name", function (req, res) {
  if (req.session.loggedIn && req.session.user_name === req.params.user_name) {
    let doc = fs.readFileSync("./news.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/news");
  } else {
    res.redirect("/");
  }
});

app.get("/getNews", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.execute(
    "SELECT * FROM news_post ORDER BY post_datetime DESC",
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

app.get("/article/:articleID", function (req, res) {
  connection.execute(
    "SELECT * FROM news_post WHERE news_post.ID = " + req.params.articleID,
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

app.get("/get_user/:userID", function (req, res) {
  connection.execute(
    "SELECT * FROM BBY29_user WHERE BBY29_user.ID = " + req.params.userID,
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

app.post("/delete_news", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const id = req.body.id;

  connection.execute(
    "DELETE FROM news_post WHERE ID = ?",
    [id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send({
          status: "success",
          msg: "Record deleted.",
        });
      }
    }
  );
});

app.get("/recent_news", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.execute(
    "SELECT * FROM news_post ORDER BY post_datetime DESC LIMIT 3",
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

app.get("/getShoppingSessionItems", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.execute(
    "SELECT * FROM shopping_cart_item WHERE userID = " + req.session.user_ID,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length >= 0) {
          res.send(results);
        } else {
          res.sendStatus(400);
        }
      }
    }
  );
});

app.post("/addCartItem", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const user = req.session.user_ID;
  const itemID = req.body.itemID;
  const quantity = req.body.quantity;

  connection.execute(
    "INSERT INTO shopping_cart_item (userID, productID, quantity) values (?, ?, ?)",
    [user, itemID, quantity],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send({
          status: "success",
          msg: "Cart Item added.",
        });
      }
    }
  );
});

app.post("/delete_cart_item", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  const user = req.session.user_ID;
  const itemID = req.body.itemID;

  connection.execute(
    "DELETE FROM shopping_cart_item WHERE ID = ? AND userID = ?",
    [itemID, user],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send({
          status: "success",
          msg: "Cart item deleted.",
        });
      }
    }
  );
});

app.get("/delete_cart", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.execute(
    "DELETE FROM shopping_cart_item WHERE userID = " + req.session.user_ID,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send({
          status: "success",
          msg: "All cart items deleted.",
        });
      }
    }
  );
});

app.get("/getShoppingQuantities", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.execute(
    "SELECT productID, SUM(quantity) as count FROM shopping_cart_item WHERE userID = ? GROUP BY productID",
    [req.session.user_ID],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/upload_cart", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.query(
    "INSERT INTO shopping_order_history (userID, quantityPopSocket, quantityBottle, quantityShirt, quantityCase, quantityMug, quantityHat, total, purchaseDate) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.session.user_ID,
      req.body.quantityPopSocket,
      req.body.quantityBottle,
      req.body.quantityShirt,
      req.body.quantityCase,
      req.body.quantityMug,
      req.body.quantityHat,
      req.body.total,
      req.body.purchaseDate,
    ],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send({
          status: "success",
          msg: "Purchase added to history.",
        });
      }
    }
  );
});

app.get("/get_purchase_history", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.execute(
    "SELECT * FROM shopping_order_history WHERE userID = ?",
    [req.session.user_ID],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/get_stock_samples", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  connection.execute(
    "SELECT * FROM bby29_item_tracker WHERE user_ID = ? LIMIT 3;",
    [req.session.user_ID],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    }
  );
});
// Jacob's code (end)

// Heroku Dynamically assigns port via process.env.PORT.

app.get("/shop", function (req, res) {
  if (req.session.loggedIn) {
    let doc = fs.readFileSync("shop.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/account");
  } else {
    res.redirect("/");
  }
});

app.get("/summary", function (req, res) {
  if (req.session.loggedIn) {
    let doc = fs.readFileSync("shop-summary.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/account");
  } else {
    res.redirect("/");
  }
});

app.get("/shop-confirm", function (req, res) {
  if (req.session.loggedIn) {
    let doc = fs.readFileSync("shop-confirm.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/account");
  } else {
    res.redirect("/");
  }
});

app.get("/checkout", function (req, res) {
  if (req.session.loggedIn) {
    let doc = fs.readFileSync("shop-confirm.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/account");
  } else {
    res.redirect("/");
  }
});

app.get("/chatroom", function (req, res) {
  if (req.session.loggedIn) {
    let doc = fs.readFileSync("chatroom.html", "utf8");
    res.send(doc);
  } else if (req.session.loggedIn) {
    res.redirect("/account");
  } else {
    res.redirect("/");
  }
});

app.get("/contact", function (req, res) {
  if (req.session.loggedIn) {
    let doc = fs.readFileSync("contact.html", "utf8");
    res.send(doc);
  } else {
    res.redirect("/");
  }
});

// Set static folder
app.use(express.static(path.join(__dirname, "../2800-202210-BBY29")));

const botName = "Tech to the Moon Bot";

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({
    username,
    room
  }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit(
      "message",
      formatMessage(botName, "Welcome to Tech to the Moon chat!")
    );

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

var PORT = process.env.PORT || 8000;
server.listen(PORT);