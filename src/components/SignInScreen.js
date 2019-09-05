// https://github.com/firebase/firebaseui-web-react
// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from '../Firebase';

const firebase = Firebase.firebase;

class SignInScreen extends React.Component {
    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        //signInSuccessUrl: '/',
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false
        }
    };

    render() {
        return (
            <div>
                <p style={{textAlign: 'center'}}>Please sign-in</p>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
}

export default SignInScreen;
