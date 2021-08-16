exports.acceptPendingRegistrationEmailParams = (email, password) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email],
        },
        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<html>
                                <h1>Login Details for NITW Website Portal </h1> 
                                <p>Here is the password for your NITW Website Portal account: </p>
                                <p>${password}</p>
                                <p>Please reset this password after you login for the first time.</p>
                            </html>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "NITW Website Console Registration Approved",
            },
        },
    };
};

exports.rejectPendingRegistrationEmailParams = (email, reason) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email],
        },
        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<html>
                                <h1>Registration Request Rejected </h1> 
                                <p>Unfortunately, your registration request has been rejected. </p>
                                <p>Reason: ${reason}</p>
                                <p>If you think this is a mistake, please contact WSDC NITW</p>
                            </html>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "NITW Website Console Registration Rejected",
            },
        },
    };
}
