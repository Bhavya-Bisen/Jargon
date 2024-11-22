import pool from "../config/postgres.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const saltRounds = 10;

passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      try {
        const result = await pool.query("SELECT u.*, r.role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.username = $1; ", [
          username,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            }
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false, { message: "Incorrect password." });
            }
          });

          if (!user.isActive) {
            return done(null, false, { message: 'Account inactive.' });
          }
          
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await pool.query(
      "SELECT u.*, r.role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1",
      [id]
    );
    const user = result.rows[0];
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

const loginRoute=async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // Handle error
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" }); // Send error if user is not found or invalid credentials
    }

    // Successfully authenticated, send back custom data
    req.login(user, (err) => {
      if (err) {
        return next(err); // Handle error during login
      }
      // Send custom data, for example, user info or success message
      return res.status(200).json({
        message: "Authentication successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role_id,
          role_name:user.role_name
        },
        // You can also send a token here if you're using JWT for authentication
      });
    });
  })(req, res, next); // Call the passport authenticate function
};

const registerRoute =async(req,res) => {
  const { email, password, username } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("All fields are required.");
  }{
  try {
    const checkResult = await pool.query("SELECT * FROM users WHERE username = $1", [username,]);

    if (checkResult.rows.length > 0) {
      res.status(400).json({ message: "Username already exists." });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          res.status(500).json({ error: "Error hashing password" });
        } else {
          const result = await pool.query(
            "INSERT INTO users (username,email,password,role_id) VALUES ($1, $2, $3, 2) RETURNING *",
            [username,email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              return next(err);
            }
            res.status(201).json({ message: "User registered successfully!", user });
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}
};

// authMiddleware.js

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role_name; // Assuming role_name is available in req.user
    if (allowedRoles.includes(userRole)) {
      return next();
    } else {
      res.status(403).json({ message: "Forbidden: You don't have enough privileges",userRole:userRole});
    }
  };
};

export { loginRoute, registerRoute };