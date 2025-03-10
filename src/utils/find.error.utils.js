import ERRORS from "../../config/errors.js";

const findError = (code) => {
  return ERRORS.filter((err) => err.code == code);
}

export { findError }