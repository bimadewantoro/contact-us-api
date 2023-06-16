const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const emailController = require('../controllers/contactUs.controller');

// Contact form route with input validation
router.post(
    '/contact',
    [
        body('name').notEmpty().trim().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
        body('message').notEmpty().trim().withMessage('Message is required')
    ],
    emailController.sendEmail
);

module.exports = router;
