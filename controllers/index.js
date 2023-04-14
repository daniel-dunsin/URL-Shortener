/**
 * For acessing the URL that has been added
 */

require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const URL = require("../models/url");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const url = await URL.findOne({
      shortURL: { $regex: id },
    });

    if (!url) {
      const error = new Error("URL not found");
      error.statusCode = StatusCodes.NOT_FOUND;
      return next(error);
    }

    return res.redirect(url.longURL);
  } catch (error) {
    return next(error);
  }
};
