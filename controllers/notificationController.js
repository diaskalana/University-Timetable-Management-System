const Notification = require('../models/notification');
const nodemailer = require('nodemailer');

// Create a new notification
exports.createNotification = async (req, res) => {
    const { message, recipients } = req.body;

    try {
        const notification = await Notification.create({ message, recipients });
        res.status(201).json({ notification });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json({ notification });
    } catch (error) {
        console.error('Error fetching notification:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


// Send notification to user(s)
exports.sendNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findById(notificationId).populate('recipients');
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Send email notification to recipients
        const transporter = nodemailer.createTransport({
            // Configure your email service
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });

        const mailOptions = {
            from: 'testsubjects.one@gmail.com',
            to: notification.recipients.map(recipient => recipient.email).join(', '),
            // to: 'testdrivethenet@gmail.com',
            subject: 'New Notification',
            text: notification.message
        };

        await transporter.sendMail(mailOptions);

        // console.log(notification.recipients.map(recipient => recipient.email).join(', '))
        res.json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};