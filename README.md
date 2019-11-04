## Firebase Simple Chat

My React learning project, an chat deployed to static hosting like Netlify and stored data encrypted on Firebase.

**This project is me testing React only. Do use this project to store any sensitive data**

[Demo](https://chat.necz.net) Password: 111222

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
          ".write": "auth !== null 
              && (
                    (!data.exists() && newData.child('uid').val() == auth.uid ) 
                    || (data.exists() 
                        && data.child('uid').val() == auth.uid 
                        && (newData.child('uid').val() == auth.uid || newData.child('uid').val() == null)
                    )
                    || (auth.uid === 'YourUserId')
              )"
      }
    }
  }
}
```
4. Set-up authentication by go to `Authentication > Sign-in method` select any authentication you want to use. and don't forget to add your domain in `Authorized domains`


### Install this project on your machine

1. Clone this project. `git clone https://github.com/newz/FirebaseSimpleChat.git`
2. Set-up environment variable, you can use .env file for example create .env on root of the project.
```
REACT_APP_FIREBASE_APIKEY=xxx // Get this from Project settings > general
REACT_APP_FIREBASE_DATABASEURL=https://xx.firebaseio.com // xx is likey <firebase-project-id>
REACT_APP_FIREBASE_AUTHDOMAIN=xx.firebaseapp.com // xx is likey <firebase-project-id>
REACT_APP_FIREBASE_PROVIDER=Anonymous,FacebookAuthProvider,PhoneAuthProvider
REACT_APP_SALT=XYZABC // optional salt
```
3. Run `npm start` and go to `http://localhost:3000` if your browser don't open up automatically.
4. Set your password (and salt if you didn't set in env), click update, send your first message then done!


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