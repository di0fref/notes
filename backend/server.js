const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
let cors = require("cors");
let moment = require('moment');

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(function (req, res, next) {
    if (req.headers.origin) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "X-Requested-With,Content-Type,Authorization"
        );
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    }
    next();
});
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

const listener = app.listen(process.env.PORT || 4000, () => {
    console.log("App is listening on port " + listener.address().port);
});

const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins
};

app.use(cors(options));

const getDateModified = () => {
	return moment().format("YYYY-MM-DD HH:mm:ss");
}

app.get("/folders/count", (req, res) => {
    db.query("SELECT count(*) as count from categories", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/folders/p/:id", (req, res) => {
	db.query(
		"SELECT parent_id, name as label, concat('folder') as type from folders where id = ?",
		req.params.id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});
app.get("/folders/parent/:parent_id", (req, res) => {
	db.query(
		"SELECT id, name as label, concat('folder') as type from folders where parent_id = ?",
		req.params.parent_id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.get("/folder/:id", (req, res) => {
    db.query(
        "SELECT * FROM folders where id = ?",
        req.params.id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/folders", (req, res) => {
    db.query(
        "SELECT * from folders",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.post("/folder/create", (req, res) => {
    db.query(
        "INSERT into categories (name) VALUES (?)",
        [req.body.name],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/notes/count/:folder_id", (req, res) => {
	db.query(
		"SELECT id, folder_id, count(*) as count from notes where folder_id = ?",
        req.params.folder_id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.get("/notes", (req, res) => {
	db.query(
		"SELECT n.* , f.name as folde_name FROM notes n left join folders f on n.folder_id = f.id where deleted = 0 order by date_modified desc",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.get("/notes/folder/:id", (req, res) => {
    db.query(
        "SELECT *, name as label, concat('note') as type from notes where folder_id = ?",
        req.params.id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/note/:id", (req, res) => {
	db.query(
		"SELECT *, name as label, concat('note')  FROM notes where id = ? and deleted = 0",
		req.params.id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.put("/note/update/folder/:id", (req, res) => {
	db.query(
		"UPDATE notes set folder_id = ? where id = ?",
		[req.body.folder_id, req.params.id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.put("/note/bookmark/:id", (req, res) => {
	db.query(
		"UPDATE notes set bookmark = ? where id = ?",
		[req.body.bookmark, req.params.id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.put("/note/name/:id", (req, res) => {
	db.query(
		"UPDATE notes set name = ? where id = ?",
		[req.body.name, req.params.id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.put("/note/update/:id", (req, res) => {
	console.log(req)
	db.query(
		"UPDATE notes set name = ?, text = ?, date_modified = ? where id = ?",
		[req.body.name, req.body.text, getDateModified(),  req.params.id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.put("/note/bookmark/:id",(req, res) => {
	db.query("update notes set bookmark = ? where id = ?",
		[req.body.bookmark, res.params.id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		})
})

app.get("/notes/bookmarks", (req, res) => {
    db.query(
        "SELECT *, name as label, concat('note') as type from notes where bookmark = 1",
        req.params.id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/notes/search", (req, res) => {
    db.query(
        "SELECT *, name as label, concat('note') as type from notes where folder_id = ?",
        req.params.id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.put("/note/update/folder/:id", (req, res) => {
	db.query(
		"UPDATE notes set folder_id = ? where id = ?",
		[req.body.folder_id, req.params.id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.put("/folder/update/folder/:id", (req, res) => {
	db.query(
		"UPDATE folders set parent_id = ? where id = ?",
		[req.body.folder_id, req.params.id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

//
// app.delete("/notes/delete/:id", (req, res) => {
// 	db.query(
// 		"UPDATE notes set deleted = 1 where id = ?",
// 		[req.params.id],
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.send(result);
// 			}
// 		}
// 	);
// });
//


app.post("/note/create", (req, res) => {
	db.query(
		"INSERT into notes (id, name, text, date_modified, folder_id) values (?,?,?,?,?)",
		[
			req.body.id,
			req.body.name,
			req.body.text,
            getDateModified(),
			req.body.folder_id,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

