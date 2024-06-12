const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const PubSub = require('pubsub-js');
const Campaign = require('./models/Campaign');
const cors = require('cors')

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
app.use(cors({
  origin: ["http://localhost:5173"]
}))

// Define Routes
app.use('/api/customers', require('./routes/customers'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/campaigns', require('./routes/campaigns'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// Handle message sent
PubSub.subscribe('MESSAGE_SENT', async (msg, data) => {
    try {
      const campaign = await Campaign.findById(data.campaignId);
      campaign.sent += 1;
      await campaign.save();
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Handle message failed
  PubSub.subscribe('MESSAGE_FAILED', async (msg, data) => {
    try {
      const campaign = await Campaign.findById(data.campaignId);
      campaign.failed += 1;
      await campaign.save();
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Handle delivery success
  PubSub.subscribe('DELIVERY_SUCCESS', async (msg, data) => {
    try {
      const campaign = await Campaign.findById(data.campaignId);
      campaign.sent += 1;
      await campaign.save();
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Handle delivery failure
  PubSub.subscribe('DELIVERY_FAILURE', async (msg, data) => {
    try {
      const campaign = await Campaign.findById(data.campaignId);
      campaign.failed += 1;
      await campaign.save();
    } catch (err) {
      console.error(err.message);
    }
  });
