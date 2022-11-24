const express = require("express");
const cors = require("cors");
const { db } = require("./config/db");

const userRouter = require("./routes/user.route");
const projectRouter = require("./routes/project.route");
const taskRouter = require("./routes/task.route");

const port = 3001;

const app = express();
app.use(express.static(__dirname + "/static"));
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter);

db()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((e) => console.error(e));
