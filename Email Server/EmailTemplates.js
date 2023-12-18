
module.exports = {
    testEmail: (username) => {
        return `Hello ${username},\nKeep Yourself Safe`;
    },

    forgotPassword: (username, resetPasswordLink) => {
        return `Hello ${username},\n\nPlease click on the following link ${resetPasswordLink} to reset your password. \n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nKeep Yourself Safe`;
    },
};