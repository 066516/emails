const fs = require("fs");
const nodemailer = require("nodemailer");
const csvParser = require("csv-parser");

async function sendStyledEmail(receiverEmail, fullName, discordID) {
  // Create transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  // Define email options
  let mailOptions = {
    from: "ghmamnbyl@gmail.com",
    to: receiverEmail,
    subject: "GCPC: logistics team",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GCPC: Logistics Team Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            text-align: center;
        }
        h2 {
            color: #333;
        }
        p {
            margin-bottom: 15px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>GCPC: Logistics Team Invitation 🚀</h2>
        <p>Dear ${fullName},</p>
        <p>I hope this email finds you well. I want to say <strong>y3tik sa7a</strong> for applying to be one of the GCPC Logistics Team members. Your motivation and commitment are what make us give our best each time! 💪</p>
        <p>Please note that we have a crucial meeting titled "<strong>GCPC: Simulation</strong>" online tomorrow at <strong>9 pm</strong>. Your attendance is essential and much appreciated, as we will be discussing important details, rules, and the code of conduct. Please make sure to be there on time.</p>
        <p>Additionally, please join our Discord server that is created for the GCPC organizers where we will upload necessary updates on the GDG event and participants using the following link:</p>
        <p><a class="button" href="https://discord.com/invite/Z6tPSFdp">Join Discord Server</a></p>
        <p><strong>PS:</strong> Make sure to be present at the time for the D-Day, and also make sure to install the Zello mobile application in case you don't have it. 📱</p>
        <p>Looking forward to meeting you!</p>
        <p><strong>GDG FOR ONCE GDG FOREVER</strong>&lt;&gt; 🌟</p>
        <p>Best regards,<br/>GCPC Team</p>
    </div>
    </body>
    </html>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${receiverEmail}`);
}

// Read data from CSV file and send emails
function sendEmailsFromCSV(filePath) {
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      const receiverEmail = row["Your email:"];
      const fullName = row["Your full name:"];
      const discordID = row["Your discord ID:"];
      console.log(`Sending email to ${receiverEmail}`);
      sendStyledEmail(receiverEmail, fullName, discordID);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}

// Example usage
const csvFilePath = "GCPC - Organizers.csv"; // Path to your CSV file
// sendEmailsFromCSV(csvFilePath);
sendStyledEmail("imadeddinefillaliusthb@gmail.com", "imad", "imad");
