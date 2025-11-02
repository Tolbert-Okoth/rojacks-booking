const nodemailer = require('nodemailer');

// 1. Create the Nodemailer "Transporter"
// This is the service that will send the emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // We are using Gmail
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your App Password from .env
  },
});

// 2. Create the function that sends the email
const sendBookingConfirmation = async (booking) => {
  try {
    // 3. Define the email content
    const mailOptions = {
      from: `"Rojacks Restaurant" <${process.env.EMAIL_USER}>`, // Sender address
      to: booking.email, // Recipient address (from the form)
      subject: 'Your Booking is Confirmed at Rojacks!',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Hi ${booking.customerName},</p>
        <p>Thank you for booking with Rojacks Restaurant!</p>
        <p><strong>Your booking details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${booking.time}</li>
          <li><strong>Guests:</strong> ${booking.people}</li>
        </ul>
        <p>We look forward to seeing you!</p>
        <p><strong>Location:</strong> Migori County, Sub Rongo</p>
      `,
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${booking.email}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    // We don't want to fail the whole booking if the email fails
    // So we just log the error
  }
};

module.exports = { sendBookingConfirmation };