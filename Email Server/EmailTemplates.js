module.exports = {
    testEmail: (username) => {
        return `
            <p>Hello ${username},</p>
            <p>Keep Yourself Safe</p>
        `;
    },

    forgotPassword: (username, resetPasswordLink) => {
        return `
            <p>Hello ${username},</p>
            <p>Please click <a href="${resetPasswordLink}">here</a> to reset your password.</p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <p>Keep Yourself Safe</p>
        `;
    },
};