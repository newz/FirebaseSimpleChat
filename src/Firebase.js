
import config from './config.js';
import firebase from 'firebase';

firebase.initializeApp(config.firebase);

const Firebase = {
    config: config.firebase,
    firebase
};

export default Firebase;