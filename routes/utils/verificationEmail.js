const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const sendConfirmationEmail = async (userEmail, id) => {
  const mailGenerator = new MailGen({
    theme: "salted",
    product: {
      name: "Insight App",
      link: "http://localhost:3000"
    }
  });

  const email = {
    body: {
      name: "Buddy",
      intro: "Verify your email",
      action: {
        instructions: "Please click the button below to verify your account",
        button: {
          color: "#33b5e5",
          text: "Verify account",
          link: `http://localhost:3300/api/auth/verify/${id}`
        }
      }
    }
  };

  const emailTemplate = mailGenerator.generate(email);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  const msg = {
    to: userEmail,
    from: "notchera@gmail.com",
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
