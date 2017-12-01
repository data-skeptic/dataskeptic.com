import express from "express";
import morgan from "morgan";
import config from "../../../config";
import bodyParser from "body-parser";

const app = express();

async function run() {
  app.use(morgan("combined"));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    next();
  });
  app.get('/', (req,res) => {res.send({status: 'OK'})})

  app.use("/blogs", require("./routes/blogs"));
  app.use("/episodes", require("./routes/episodes"));
  app.use("/homepage", require("./routes/homepage"));

  if (config.apiPort) {
    app.listen(config.apiPort, err => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
      }
      console.info("----\n==> 🌎  API is running on port %s", config.apiPort); // eslint-disable-line no-console
      console.info(
        "==> 💻  Send requests to http://%s:%s",
        config.apiHost,
        config.apiPort
      ); // eslint-disable-line no-console
    });
  } else {
    console.error(
      "==>     ERROR: No PORT environment variable has been specified"
    ); // eslint-disable-line no-console
    console.log("config", config);
  }
}

run();
