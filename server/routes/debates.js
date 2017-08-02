const express = require('express');
const router = express.Router();

const ActiveDebate = require('../models/activeDebate');

router.post('/api/post', (req, res) => {

  debateId = req.body.debate || null;

  const newDebate = new ActiveDebate({
    debate: debateId,
    topic: req.body.topic,
  });

  ActiveDebate.addActiveDebate(newDebate, (err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: `Failed to add new debate: ${newDebate.topic}`
      });
    } else if (data) {
      res.json({
        success: true,
        msg: `New debate ${newDebate.topic} is added`
      });
    }
  });
});

router.get('/api/get', (req, res) => {

  ActiveDebate.getAllActiveDebates((err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: `Failed to get all debates`
      });
    } else if (data) {
      console.log('DEBATES / GET success! data:', data);
      res.json({
        success: true,
        msg: `Got all debates success!`,
        data: data
      });
    }
  });
});


module.exports = router;