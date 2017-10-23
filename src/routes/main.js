var express = require('express'),
    router = express.Router(),
    object = require('../bin/object');

router.post('/upload', (req,res) => {
  object.upload(req,res);
});

module.exports = router;
