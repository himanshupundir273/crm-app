const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

// @route    POST api/orders
// @desc     Add an order
// @access   Public
router.post('/', async (req, res) => {
  const { customerId, amount } = req.body;

  try {
    const order = new Order({
      customerId,
      amount,
    });

    await order.save();

    // Update customer spends and visits
    const customer = await Customer.findById(customerId);
    customer.totalSpends += amount;
    customer.visits += 1;
    customer.lastVisit = new Date();

    await customer.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
