require('dotenv').config();

const config = {
    firebase: {
        apiKey: process.env.FIREBASE_APIKEY,
        databaseURL: process.env.FIREBASE_DATABASEURL,
        authDomain: process.env.FIREBASE_AUTHDOMAIN
    }
};

console.log(config)