module.exports = {
    testEmail: (username) => {
        return `
            <p>Hello ${username},</p>
            <p>Keep Yourself Safe</p>
        `;
    },

    forgotPassword: (username, resetPasswordLink) => {
        return `
            <p><i> For English, please scroll down </i></p>
            <p>Hallo ${username},</p>
            <p>Klik alsjeblieft <a href="${resetPasswordLink}">hier</a> om je wachtwoord te resetten.</p>
            <p>Als je dit niet hebt aangevraagd, negeer deze e-mail dan alsjeblieft en je wachtwoord blijft ongewijzigd.</p>
            <p>Met vriendelijke groet</p>
            <p>---------------------------------------------------------------------------------------------------------</p>
            <p>Hello ${username},</p>
            <p>Please click <a href="${resetPasswordLink}">here</a> to reset your password.</p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <p>Kind regards</p>
            

        `;
    },

    companyRegistration: (username, confirmRegistrationLink) => {
        return `
            <p><i> For English, please scroll down </i></p>
            <p>Hallo ${username},</p>
            <p>Klik alsjeblieft <a href="${confirmRegistrationLink}">hier</a> om de registratie van je bedrijf te starten.</p>
            <p>Als je dit niet hebt aangevraagd, negeer dan deze e-mail en je registratie blijft onbevestigd.</p>
            <p>Met vriendelijke groet</p>
            <p>---------------------------------------------------------------------------------------------------------</p>
            <p>Hello ${username},</p>
            <p>Please click <a href="${confirmRegistrationLink}">here</a> to start registering your company.</p>
            <p>If you did not request this, please ignore this email and your registration will remain unconfirmed.</p>
            <p>Kind Regards</p>
        `;
    },

    employeeInvitation: (firstName, lastName, /*activationKey*/) => {
        return `
            <p><i> For English, please scroll down </i></p>
            <p>Hallo ${firstName} ${lastName},</p>
            <p>Voer alsjeblieft deze activeringscode in de BuurtBoer mobiele app in om je account aan te maken:</p>
            <p>Als je dit niet hebt aangevraagd, negeer dan deze e-mail en je registratie blijft onbevestigd.</p>
            <p>Met vriendelijke groet</p>
            <p>---------------------------------------------------------------------------------------------------------</p>
            <p>Hello ${firstName} ${lastName},</p>
            <p>Please enter this activation code in the BuurtBoer mobile app to create your account: </p>
            <p>If you did not request this, please ignore this email and your registration will remain unconfirmed.</p>
            <p>Kind regards</p>
        `;
    },

    employeeSecurityKey: (activationKey) => {
        return `
            <p><i> For English, please scroll down </i></p>
            <p>Voer alsjeblieft deze activeringscode in de BuurtBoer mobiele app in om te bevestigen dat jij dit bent:</p>
            <h3>${activationKey}</h3>
            <p>Als je dit niet hebt aangevraagd, neem dan contact op met een supervisor!</p>
            <p>Met vriendelijke groet</p>
            <p>---------------------------------------------------------------------------------------------------------</p>
            <p>Hello,</p>
            <p>Please enter this activation code in the BuurtBoer mobile app to confirm that this is you: </p>
            <h3>${activationKey}</h3>
            <p>If you did not request this, please contact a supervisor!.</p>
            <p>Kind regards</p>
        `;
    },

    employeeReminder: (firstName, lastName) => {
        return `
            <p><i> For English, please scroll down </i></p>
            <p>Hallo ${firstName} ${lastName},</p>
            <p>Herinnering om alsjeblieft je wekelijkse schema in te vullen!</p>
            <p>Als je je schema al hebt ingevuld, gelieve deze e-mail te negeren.</p>
            <p>Met vriendelijke groet</p>
            <p>---------------------------------------------------------------------------------------------------------</p>
            <p>Hello ${firstName} ${lastName},</p>
            <p></Reminder to please fill in your weekly schedule!>
            <p>if you filled in your schedule, be so kind to ignore this email.</p>
            <p>Kind regards</p>
        `;
    }
};