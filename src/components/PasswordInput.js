import React from 'react';
import Encrypter from '../Encrypter.js';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            salt: '',
            encrypter: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        setTimeout(() => {
            this.updateEncrypter();
        }, 100);
    }
    addRow(newRow) {
        this.setState((state, props) => {
            return {
                rows: [...state.rows, newRow]
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.updateEncrypter();
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    updateEncrypter() {
        const { password, salt } = this.state;
        let cachedPassword;
        if (password || salt) {
            if (password && salt) {
                cachedPassword = Encrypter.createCachedPassword({ password, salt })
                localStorage.setItem('__cachedpw', JSON.stringify(cachedPassword));
            } else {
                alert('Please set both password and salt.')
            }
        } else {
            cachedPassword = localStorage.getItem('__cachedpw');
            try {
                cachedPassword = JSON.parse(cachedPassword);
            } catch (e) {
                cachedPassword = null;
            }
        }
        if (cachedPassword) {
            const encrypter = new Encrypter({ cachedPassword });
            this.props.onPasswordChanged(encrypter);
            this.setState({
                password: '',
                salt: '',
                encrypter
            })
        }
    }
    render() {
        return (
            <div>
                <h2>Input Password</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Salt</label>
                        <div className="control">
                            <input className="input" type="text" name="salt"
                                value={this.state.salt}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="button is-info" type="submit" value="Update" />
                        </div>
                    </div>
                </form>
                {this.state.encrypter
                    ? <span>Encrypter Set!</span>
                    : <span>Please set encrypter</span>}
            </div>
        );
    }
}


export default Chat;
