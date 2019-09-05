import React from 'react';

import './App.css';
import 'bulma';

import Chat from './components/Chat';
import SignInScreen from './components/SignInScreen';
import PasswordInput from './components/PasswordInput';
import ChatDecrypt from './ChatDecrypt.js';
import Firebase from './Firebase';
const firebase = Firebase.firebase;

class App extends React.Component {
    state = {
        isSignedIn: false, // Local signed-in state.
        encrypter: null,
        name: ''
    };
    constructor(props) {
        super(props);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.ChatDecrypt = new ChatDecrypt();
    }
    onPasswordChanged (encrypter) {
        this.setState({
            encrypter
        });
        this.ChatDecrypt.updateEncrypter(encrypter);
    }
    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                const name = !!user ? firebase.auth().currentUser.displayName : '';
                this.setState({ 
                    isSignedIn: !!user,
                    name
                })
            }
        );
    }
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }
    render () {
        return (
            <div className="App">
                <div className="App-Chat">
                    {
                        this.state.isSignedIn ? <Chat name={this.state.name} ChatDecrypt={this.ChatDecrypt} /> : <SignInScreen />
                    }
                </div>
                <div className="App-Key">
                    {
                        this.state.isSignedIn && 
                        <div>
                            <p>Welcome <span title={firebase.auth().currentUser.uid}>{firebase.auth().currentUser.displayName}</span>! You are now signed-in!</p>
                            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
                        </div>
                    }
                    <PasswordInput onPasswordChanged={this.onPasswordChanged} />
                    <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
                </div>
            </div>
        );
    }
}

export default App;
