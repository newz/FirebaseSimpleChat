// https://github.com/firebase/firebaseui-web-react
// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Firebase from '../Firebase';

const firebase = Firebase.firebase;

class SignInScreen extends React.Component {
    // Configure FirebaseUI.
    constructor(props) {
        super(props);
        let allowAnonymous = false;
        const providers = process.env.REACT_APP_FIREBASE_PROVIDER || 'Anonymous';
        const signInOptions = [];
        providers.split(',').forEach(provider => {
            if(provider === 'Anonymous') {
                allowAnonymous = true;
            } else if(firebase.auth[provider]) {
                signInOptions.push(firebase.auth[provider].PROVIDER_ID);
            }
        })
        this.uiConfig = {
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
            // We will display Google and Facebook as auth providers.
            signInOptions,
            //signInSuccessUrl: '/',
            callbacks: {
                // Avoid redirects after sign-in.
                signInSuccessWithAuthResult: () => false
            }
        };
        this.state = {
            allowAnonymous
        }

        this.signinAnonymously = this.signinAnonymously.bind(this);
    }

    signinAnonymously() {
        firebase.auth().signInAnonymously().catch((error) => {
            alert(`Sign-in Error\n${error.message}`);
        });
    }

    render() {
        return (
            <div>
                <p style={{textAlign: 'center'}}>Please sign-in</p>
                {this.state.allowAnonymous && 
                <p style={{textAlign: 'center'}}><a href="#" onClick={this.signinAnonymously}>Sign-in Anonymously</a></p>}
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
}

export default SignInScreen;
