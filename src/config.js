require('dotenv').config();

const config = {
    firebase: {
        apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
        authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN
    }
};

export default config;