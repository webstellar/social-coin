
const axios = require('axios');
const sendAppNotification = async (recievers, messageBody) => {
    
    let notification = {
        'title' : 'Social Coin',
        'body' : messageBody
    }
    
    const serverKey = process.env.FIREBASE_SERVER_KEY; 
    
    const message = {
        data: {},
        notification: notification,
        registration_ids: recievers
    };
    const response = await axios.post('https://fcm.googleapis.com/fcm/send',
        message,
        {
            headers:{'Authorization':'key='+serverKey, 'Content-Type':'application/json'},
            redirect:'follow'
        })
    return response;
}

module.exports = {
    sendAppNotification
}