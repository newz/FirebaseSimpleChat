import React from 'react';
import Encrypter from '../Encrypter.js';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            salt: '',
            lockedSalt: !!process.env.REACT_APP_SALT,
            encrypter: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteEncrypter = this.deleteEncrypter.bind(this);
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
    deleteEncrypter(e) {
        e.preventDefault();
        localStorage.removeItem('__cachedpw');
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
        let { password, salt } = this.state;
        let cachedPassword;
        if(process.env.REACT_APP_SALT) {
            salt = process.env.REACT_APP_SALT;
        }
        if (password) {
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
        } else {
            this.props.onPasswordChanged();
            this.setState({
                password: '',
                salt: '',
                encrypter: null
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
                                disabled={this.state.lockedSalt}
                                value={this.state.salt}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    {this.state.encrypter
                    ? <span></span>
                    : <div className="field">
                        <div className="control">
                            <input className="button is-info" type="submit" value="Update" />
                        </div>
                    </div>}
                    
                </form>
                {this.state.encrypter
                    ? <span>Encrypter Set! <a href="#" onClick={this.deleteEncrypter}>Remove Encrypter</a></span>
                    : <span>Please set an encrypter</span>}
            </div>
        );
    }
}


export default Chat;
