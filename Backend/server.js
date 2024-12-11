import env from "dotenv";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import { loginRoute, registerRoute,ensureAuthenticated, authorizeRoles } from "./auth/auth.js";
import {locatepostoffice} from "./services/locatePO.js";
import { dashboard_data } from "./services/dashboard.js";
import { StatePO } from "./services/statePO.js";
import { DistrictPO } from "./services/districtPO.js";


env.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors(
));

app.use(express.json());
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time in milliseconds (e.g., 1 day)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('Backend is running');
  res.send('Backend is running');
});

// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/login", loginRoute);
app.post("/register", registerRoute);
app.post("/locatepostoffice",locatepostoffice);
app.post("/districtPO",DistrictPO)
app.post("/locatePO",)

app.get("/user/profile",
  ensureAuthenticated,
  authorizeRoles("admin", "authenticated"),
  (req, res) => {
    res.send("Welcome to your profile");
  }
);

app.get("/dashboard",dashboard_data);
app.get("/statePO",StatePO);