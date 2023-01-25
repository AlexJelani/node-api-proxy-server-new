const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");

//env
// const API_BASE_URL = process.env.API_BASE_URL;
// const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//init cache
let cache = apicache.middleware

router.get("/", cache('2 minutes'), async (req, res) => {
  try {

    const word = req.query.word;
    const options = {
      headers: {
        Authorization: `Token ${API_KEY_VALUE}`,
      },
    };
    const apiRes = await needle(
      "get",
      `https://owlbot.info/api/v4/dictionary/${word}`,
      options
    );
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
