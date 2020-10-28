const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// reading file
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/dev-data/data/tours-simple.json")
);

// callbacks
const getAllTours = function (req, res) {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
  res.end();
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);
  fs.writeFile(
    __dirname + "/dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTours,
        },
      });
    }
  );
};

const getTour = function (req, res) {
  // console.log(req.params.id);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
  res.end();
};

const updateTour = function (req, res) {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      tour: null,
    },
  });
  res.end();
};

const getAllUsers = function (req, res) {
  res.status(500).json({
    status: "error",
    message: "function yet not defined",
  });
};
const createUser = function (req, res) {
  res.status(500).json({
    status: "error",
    message: "function yet not defined",
  });
};
const getUser = function (req, res) {
  res.status(500).json({
    status: "error",
    message: "function yet not defined",
  });
};
const updateUser = function (req, res) {
  res.status(500).json({
    status: "error",
    message: "function yet not defined",
  });
};
const deleteUser = function (req, res) {
  res.status(500).json({
    status: "error",
    message: "function yet not defined",
  });
};

// routing in express
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour);
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Server
const port = 8080;
app.listen(port, () => {
  console.log("App is listening on port " + port);
});
