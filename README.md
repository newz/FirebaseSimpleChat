## Firebase Simple Chat

My React learning project, an encrypted chat hosted on firebase.
This script can be deployed to any static hosting like Netlify and hosted data encrypted on Firebase.
**Even though data on this project is "encrypted" do not store sensitive data in this project**

### To install this project

1. Clone this project. `git clone https://github.com/newz/FirebaseSimpleChat.git`
2. Create Firebase project by go to https://console.firebase.google.com/
3. Set-up environment variable, you can use .env file for example create .env on root of the project.
```
REACT_APP_FIREBASE_APIKEY=xxx // Get this from https://console.firebase.google.com/project/<firebase-project-id>/settings/general/
REACT_APP_FIREBASE_DATABASEURL=https://xx.firebaseio.com // xx is likey <firebase-project-id>
REACT_APP_FIREBASE_AUTHDOMAIN=xx.firebaseapp.com // xx is likey <firebase-project-id>
REACT_APP_FIREBASE_PROVIDER=FacebookAuthProvider,GoogleAuthProvider,PhoneAuthProvider,EmailAuthProvider
```
4. Set-up Firebase authentication by go to https://console.firebase.google.com/project/<firebase-project-id>/authentication/providers , providers login button can be edit
4. Run `npm start` and go to `http://localhost:3000` if your browser don't open up automatically.
5. Set your password and salt, click update, send your first message and your set up is now completed!
