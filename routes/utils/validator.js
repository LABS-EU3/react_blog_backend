const isEmpty = string => {
  if (string.trim() === "") return true;
  return false;
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.trim() === "") return true;
  if (email.match(emailRegEx)) return true;
  return false;
};

exports.validateSignupData = async (req, res, next) => {
  let { username, email, password, confirmPassword } = req.body;
  let errors = {};

  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(password)) {
    errors.password = "Must not be empty";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords Must Match";
  }

  if (isEmpty(username)) {
    errors.username = "Must not be empty";
  }

  if (Object.keys(errors).length)
    return res.status(400).json({
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    });

  next();
};