
import config from './config.js';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


firebase.initializeApp(config.firebase);

const Firebase = {
    config: config.firebase,
    firebase
};

export default Firebase;