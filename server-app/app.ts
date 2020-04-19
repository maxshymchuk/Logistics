import * as express from 'express';
import * as session from 'express-session';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import initMongo from './initMongo';

import * as auth from './src/components/auth/auth.routes';
import * as location from './src/components/locations/locations.routes';
import * as order from './src/components/orders/orders.routes';
import * as time from './src/components/time/time.routes';
import * as user from './src/components/users/users.routes';
import * as vehicle from './src/components/vehicles/vehicles.routes';
import { userModel, UserMongo } from './src/models/user.models';

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("server-app:server");

export const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, content-type, Authorization, Accept"
  );
  next();
});

mongoose.connect(`mongodb://${process.env.MONGO || '127.0.0.1'}:27017/Logistics`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log('Error while connecting to mongo');
  } else {
    console.log('Successful connection to mongo');
  }
});

passport.use(
  new Strategy((username, password, done) => {
    userModel.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password != password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user: UserMongo, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  userModel.findOne({ _id }, (err, user) => {
    done(null, user);
  });
});

initMongo();

app.use("/", auth.router);
app.use("/orders", order.router);
app.use("/users", user.router);
app.use("/locations", location.router);
app.use("/vehicles", vehicle.router);
app.use("/time", time.router);

app.use((err: any, req: express.Request, res: express.Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
