## Firebase Simple Chat

My React learning project, an encrypted chat hosted on firebase.
This script can be deployed to any static hosting like Netlify and stored data encrypted on Firebase.

\* This project had many limitation due to limit of Firebase realtime database.

**Even though data on this project is "encrypted" do not store any sensitive data in this project**

### Create Firebase project

1. Go to https://console.firebase.google.com/
2. On newly created project, go to `Database` and create **Realtime Database** (Not Cloud Firestore)
3. Change your rules to only allow authentication user by click on tab `Rules`
```json
{
  "rules": {
    ".read": "auth !== null",
    ".write": false,
    "rows": {
      "$id": {
          ".write": "auth !== null && ((!data.exists() && newData.child('uid').val() == auth.uid ) || (data.child('uid').val() == auth.uid && newData.child('uid').val() == auth.uid))"
      }
    }
  }
}
```
4. Set-up authentication by go to `Authentication > Sign-in method` and add your domain to `Authorized domains`


### To install this project

1. Clone this project. `git clone https://github.com/newz/FirebaseSimpleChat.git`
2. Set-up environment variable, you can use .env file for example create .env on root of the project.
```
REACT_APP_FIREBASE_APIKEY=xxx // Get this from Project settings > general
REACT_APP_FIREBASE_DATABASEURL=https://xx.firebaseio.com // xx is likey <firebase-project-id>
REACT_APP_FIREBASE_AUTHDOMAIN=xx.firebaseapp.com // xx is likey <firebase-project-id>
REACT_APP_FIREBASE_PROVIDER=Anonymous,FacebookAuthProvider,PhoneAuthProvider
```
3. Run `npm start` and go to `http://localhost:3000` if your browser don't open up automatically.
4. Set your password and salt, click update, send your first message and your set up is now completed!


### Allow only you to access

You can only allow only you or some users to access by change your rules to
```json
{
  "rules": {
    ".read": "auth !== null && auth.uid == 'your_userid'",
    ".write": "auth !== null && auth.uid == 'your_userid'"
  }
}
```