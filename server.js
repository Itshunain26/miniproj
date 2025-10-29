
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Initialize Express App
const app = express();

// Middleware Setup
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));


const mongoURI =
  "mongodb+srv://<username>@cluster0.abcd1.mongodb.net/job_portal?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));


const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      default: "Full-time",
    },
    description: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Job = mongoose.model("Job", jobSchema);



// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API 🚀");
});

// CREATE a new Job
app.post("/api/jobs", async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json({
      success: true,
      message: "Job posted successfully!",
      job: savedJob,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// READ all Jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ datePosted: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ single Job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE a Job by ID
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedJob)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job updated", job: updatedJob });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE a Job by ID
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
