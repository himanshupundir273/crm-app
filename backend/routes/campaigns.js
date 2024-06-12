const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const Customer = require("../models/Customer");
const axios = require("axios");
const PubSub = require("pubsub-js");

// @route    POST api/campaigns
// @desc     Create a campaign
// @access   Public
router.post("/create", async (req, res) => {
  const { name, rules } = req.body;

  try {
    // Build the audience based on rules
    let query = {};

    rules.forEach((rule) => {
      if (rule.field === "totalSpends") {
        query.totalSpends = { $gt: rule.value };
      } else if (rule.field === "visits") {
        query.visits = { $lte: rule.value };
      } else if (rule.field === "lastVisit") {
        query.lastVisit = {
          $lte: new Date(
            new Date().setMonth(new Date().getMonth() - rule.value)
          ),
        };
      }
    });

    const audience = await Customer.find(query);
    const audienceSize = audience.length;

    const campaign = new Campaign({
      name,
      audienceSize,
    });

    await campaign.save();

    // Simulate sending messages
    audience.forEach((customer) => {
      const message = `Hi ${customer.name}, here is 10% off on your next order`;
      axios
        .post("http://localhost:5000/api/campaigns/delivery", {
          message,
          campaignId: campaign._id,
          customerId: customer._id,
        })
        .then((response) => {
          PubSub.publish("MESSAGE_SENT", response.data);
        })
        .catch((error) => {
          PubSub.publish("MESSAGE_FAILED", {
            campaignId: campaign._id,
            customerId: customer._id,
          });
        });
    });

    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post('/size', async (req, res) => {
  const { rules } = req.body;

  try {
    let query = {};

    rules.forEach(rule => {
      if (rule.field === 'totalSpends') {
        query.totalSpends = { $gt: rule.value };
      } else if (rule.field === 'visits') {
        query.visits = { $lte: rule.value };
      } else if (rule.field === 'lastVisit') {
        query.lastVisit = { $lte: new Date(new Date().setMonth(new Date().getMonth() - rule.value)) };
      }
    });

    const audience = await Customer.find(query);
    const audienceSize = audience.length;

    res.json({ size: audienceSize });
  } catch (error) {
    console.error('Error fetching audience size:', error);
    res.status(500).send('Server error');
  }
});

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
// @route    POST api/campaigns/delivery
// @desc     Simulate delivery receipt
// @access   Public
router.post("/delivery", async (req, res) => {
  const { message, campaignId, customerId } = req.body;
  const status = Math.random() < 0.9 ? "SENT" : "FAILED";

  try {
    const deliveryReceipt = {
      campaignId,
      customerId,
      status,
    };

    // Simulate async delivery update
    setTimeout(() => {
      PubSub.publish(
        status === "SENT" ? "DELIVERY_SUCCESS" : "DELIVERY_FAILURE",
        deliveryReceipt
      );
    }, 1000);

    res.json(deliveryReceipt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
