const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// @route    POST api/customers
// @desc     Add a customer
// @access   Public
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  try {
    let customer = await Customer.findOne({ email });

    if (customer) {
      return res.status(400).json({ msg: 'Customer already exists' });
    }

    customer = new Customer({
      name,
      email,
    });
    await customer.save();
    const {_id} = customer
    res.json({_id, email, name});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
