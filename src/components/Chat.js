import React from 'react';
import ChatRow from './ChatRow.js';
import './Chat.css';

// https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd

class Chat extends React.Component {
    constructor(props) {
        super(props);
        // https://reactjs.org/docs/state-and-lifecycle.html
        this.state = {
            rows: [],
            isLastedPage: true,
            decryptFailed: 0,
            encrypter: null,
            name: props.name,
            isScrolled: false,
            content: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.gotoBottom = this.gotoBottom.bind(this);
        this.chatZone = React.createRef();

        this.loadOlderChat = this.loadOlderChat.bind(this);
        this.loadCurrentChat = this.loadCurrentChat.bind(this);

        this.ChatDecrypt = props.ChatDecrypt;
    }
    componentDidMount() {
        this.ChatDecrypt.setChat(this);
        this.ChatDecrypt.fetch({});
    }
    addRowShow (newRow) {
        if(!this._lastedKey) {
            this._lastedKey = newRow.key;
        }
        this.setState((state, props) => {
            const newState = {
                rows: [...state.rows, newRow]
            }
            if(!newRow.decrypted) {
                newState.decryptFailed = state.decryptFailed + 1;
            }
            return newState;
        });
        if(!this.state.isScrolled) {
            this.gotoBottom();
        }
    }
    loadOlderChat () {
        this.setState({
            isLastedPage: false,
            rows: []
        });
        let endAt = this._lastedKey;
        this._lastedKey = null;
        this.ChatDecrypt.fetch({
            endAt
        });
    }
    loadCurrentChat () {
        this.setState({
            isLastedPage: true,
            rows: []
        });
        this._lastedKey = null;
        this.ChatDecrypt.fetch({});
    }
    handleScroll (e) {
        const t = e.target;
        const isScrolled = t.scrollTop + t.offsetHeight + 10 < t.scrollHeight;
        clearTimeout(this._scrollTimeout);
        this._scrollTimeout = setTimeout(() => {
            this.setState({
                isScrolled
            });
        }, 160);
    }
    gotoBottom(e) {
        const node = this.chatZone.current;
        node.scrollTop = node.scrollHeight;
    }
    // https://reactjs.org/docs/forms.html
    handleSubmit(e) {
        e.preventDefault();
        const { name, content } = this.state;
        this.ChatDecrypt.addRow({ 
            name, 
            content,
            time: Math.floor(new Date().getTime() / 1000)
         });
        this.setState({
            'content': ''
        });
        this.gotoBottom();
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div className="chat">
                <div className="chat-head">
                    <div className="field is-grouped">
                        <p className="control">
                            <input type="button" className="button" onClick={this.loadOlderChat} value="Older" />
                        </p>
                        {!this.state.isLastedPage && 
                        <p className="control"><input className="button" type="button" onClick={this.loadCurrentChat} value="Newest" /></p>
                        }
                    </div>
                </div>
                <div ref={this.chatZone} className="chat-list" onScroll={this.handleScroll}>
                    {this.state.rows.map((r) => {
                        return <ChatRow
                            key={r.key}
                            id={r.id}
                            content={r.content}
                            time={r.time}
                            name={r.name}
                            uid={r.uid}
                        />
                    }
                    )}
                </div>
                {this.state.encrypter && this.state.decryptFailed === 0 && 
                <form className="chat-input" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <div className="control">
                            <input type="text" className="input chat-content" name="content"
                                value={this.state.content}
                                placeholder="Send message to this room"
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <p className="control">
                            <input type="text" className="input chat-name" name="name"
                                value={this.state.name}
                                placeholder="Name"
                                onChange={this.handleInputChange} />
                        </p>
                        <p className="control">
                            <a className="button" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
                                Markdown Enabled
                            </a>
                        </p>
                        <p className="control">
                            <button type="submit" className="button is-info">Send</button>
                        </p>
                        {this.state.isScrolled && 
                        <p className="control">
                            <button type="button" className="button" onClick={this.gotoBottom}>
                                To Bottom
                            </button>
                        </p>}
                    </div>
                </form>}
                
            </div>
        );
    }
}


export default Chat;
