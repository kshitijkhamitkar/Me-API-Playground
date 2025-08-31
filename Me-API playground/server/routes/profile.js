import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({ returns: "200" });
});

// Get profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create/Update profile
router.post("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, req.body); // update all fields
      await profile.save();
    } else {
      profile = await Profile.create(req.body);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Query projects by skill
router.get("/projects", async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne({ "projects.skills": skill });
    res.json(profile ? profile.projects.filter(p => p.skills.includes(skill)) : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get top skills (most frequent across projects)
router.get("/skills/top", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.json([]);

    const skillCount = {};
    profile.projects.forEach(p => {
      p.skills.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillCount)
      .sort((a, b) => b[1] - a[1])
      .map(([skill]) => skill);

    res.json(topSkills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search across profile
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i");
    const profile = await Profile.findOne({
      $or: [
        { name: regex },
        { email: regex },
        { bio: regex },
        { skills: regex },
        { "projects.title": regex },
        { "projects.description": regex },
        { "work.company": regex },
        { "work.role": regex }
      ]
    });
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
