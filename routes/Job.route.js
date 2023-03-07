const express = require("express");
const { JobModel } = require("../models/jobs.model");
const jobRouter = express.Router();
jobRouter.get("/", async (req, res) => {
  try {
    let data = await JobModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


jobRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new JobModel(payload);
    await new_note.save();
    res.send("created new job");
  } catch (error) {
    console.log(error);
    res, send({ msg: "something went wrong" });
  }
});

jobRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await JobModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorised" });
    } else {
      await JobModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("updated the job");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

jobRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await JobModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorised" });
    } else {
      await JobModel.findByIdAndDelete({ _id: id });
      res.send("deleted the note");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

module.exports = { jobRouter };
