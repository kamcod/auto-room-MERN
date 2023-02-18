const Sib = require("sib-api-v3-sdk");


const sendMail = (recipient, body) => {
    const {subject, content} = body;
    const client = Sib.ApiClient.instance

    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY
    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: process.env.USER_MAIL,
        name: 'Auto Room',
    }

    const receivers = [
        {
            email: recipient,
        },
    ];
    tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject,
            htmlContent: content
        })
        .then(res=>console.log('email sent successfully', res))
        .catch(console.log)
};

module.exports = sendMail ;

