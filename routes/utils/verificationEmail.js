const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const config = require("../../config");

require("dotenv").config();

const sendConfirmationEmail = async (userEmail, token) => {
  const mailGenerator = new MailGen({
    theme: "salted",
    product: {
      name: "Insight App",
      link: `${config.CLIENT_URL}`
    }
  });

  const email = {
    body: {
      name: "Buddy",
      intro: "Verify your email",
      action: {
        instructions: "Please click the button below to verify your account",
        button: {
          color: "#6F85FD",
          text: "Verify account",
          link: `${config.CLIENT_URL}/profile/?vid=${token}`
        }
      }
    }
  };

  const emailTemplate = mailGenerator.generate(email);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  const msg = {
    to: userEmail,
    from: "no-reply@insightly.com",
    subject: "Email Verification",
    html: emailTemplate
  };

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendConfirmationEmail;
