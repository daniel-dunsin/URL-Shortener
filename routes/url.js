/**
 * For adding the url
 */

require("dotenv").config();
const express = require("express");
const validator = require("is-valid");
const shortId = require("shortid");
const URL = require("../models/url");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url) {
      const error = new Error("Provide url");
      error.statusCode = StatusCodes.BAD_REQUEST;
      return next(error);
    }

    const isUrl = validator.isLink(url);

    if (!isUrl) {
      const error = new Error("This is not a valid url");
      error.statusCode = StatusCodes.BAD_REQUEST;
      return next(error);
    }

    const urlInDb = await URL.findOne({ longURL: url });

    if (urlInDb) {
      return res.status(StatusCodes.OK).send({ url: urlInDb });
    }

    const randomId = shortId.generate();

    const newShortURL = `${process.env.SERVER_LINK || ""}/${randomId}`;

    const newUrl = new URL({
      longURL: url,
      shortURL: newShortURL,
    });

    const result = await newUrl.save();

    res.status(StatusCodes.CREATED).send({ url: result });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
