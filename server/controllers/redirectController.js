const Link = require("../models/Link");
const ClickLog = require("../models/ClickLog");
const parseUserAgent = require("../utils/parseUserAgent");

exports.redirect = async (req, res) => {
  try {
    const { alias } = req.params;
    const link = await Link.findOne({ shortAlias: alias });

    if (!link) return res.status(404).send("Link not found");

    if (link.expirationDate && new Date(link.expirationDate) < new Date()) {
      return res.status(410).send("Link expired");
    }

    link.clickCount += 1;
    await link.save();

    const { device, browser } = parseUserAgent(req.headers["user-agent"]);

    setImmediate(async () => {
      await ClickLog.create({
        alias,
        ip: req.ip,
        device,
        browser
      });
    });

    res.redirect(link.longURL);
  } catch (err) {
    res.status(500).send("Redirection error");
  }
};
