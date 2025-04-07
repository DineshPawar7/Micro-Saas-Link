const Link = require("../models/Link");
const ClickLog = require("../models/ClickLog");
const generateAlias = require("../utils/generateAlias");

exports.createLink = async (req, res) => {
  try {
    const { longURL, customAlias, expirationDate } = req.body;
    const userId = req.user.id;

    const alias = customAlias || generateAlias();

    const existing = await Link.findOne({ shortAlias: alias });
    if (existing) return res.status(400).json({ message: "Alias already taken" });

    const link = await Link.create({
      longURL,
      shortAlias: alias,
      userId,
      expirationDate
    });

    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/x/${alias}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserLinks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const links = await Link.find({ userId })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Link.countDocuments({ userId });

    res.json({ links, total });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch links" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const { alias } = req.params;

    const logs = await ClickLog.find({ alias });

    const clicksPerDay = {};
    const deviceCount = {};
    const browserCount = {};

    logs.forEach(log => {
      const day = new Date(log.timestamp).toISOString().split('T')[0];

      clicksPerDay[day] = (clicksPerDay[day] || 0) + 1;
      deviceCount[log.device] = (deviceCount[log.device] || 0) + 1;
      browserCount[log.browser] = (browserCount[log.browser] || 0) + 1;
    });

    res.json({
      totalClicks: logs.length,
      clicksPerDay,
      deviceCount,
      browserCount
    });
  } catch (err) {
    res.status(500).json({ message: "Analytics error" });
  }
};
