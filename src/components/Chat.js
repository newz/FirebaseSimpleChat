import React from 'react';
import ChatRow from './ChatRow.js';
import History from '../History.js';
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
            name: localStorage.getItem('__cname') || props.name,
            isScrolled: false,
            content: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.gotoBottom = this.gotoBottom.bind(this);
        this.chatZone = React.createRef();

        this.loadOlderChat = this.loadOlderChat.bind(this);
        this.loadNewerChat = this.loadNewerChat.bind(this);
        this.loadCurrentChat = this.loadCurrentChat.bind(this);

        this.ChatDecrypt = props.ChatDecrypt;
        this.History = new History(() => {
            this.fetch();
        });
    }
    componentDidMount() {
        this.ChatDecrypt.setChat(this);
        this.fetch();
    }
    addRowShow (newRow) {
        if(!this._oldestKey) {
            this._oldestKey = newRow.key;
        }
        this._newestKey = newRow.key;
        this.setState((state, props) => {
            const newState = {
                rows: [...state.rows, newRow]
            }
            if(!newRow.decrypted) {
                newState.decryptFailed = state.decryptFailed + 1;
            }
            return newState;
        });
        /* if(newRow.decrypted && !this.isSentJoinMessage) {
            this.isSentJoinMessage = true;
            this.ChatDecrypt.addRow({ 
                name: this.state.name, 
                content: "*I've joined a chat*",
                time: Math.floor(new Date().getTime() / 1000)
            }); 
        } */
        setTimeout(() => {
            if(!this.state.isScrolled) {
                this.gotoBottom();
            }
        }, 100);
    }
    fetch () {
        this._oldestKey = null;
        this._newestKey = null;
        const endAt = this.History.getQuery('endAt');
        const startAt = this.History.getQuery('startAt');
        if(endAt || startAt) {
            this.setState({
                isLastedPage: endAt === startAt,
                rows: []
            });
        } else {
            this.setState({
                rows: []
            });
        }
        this.ChatDecrypt.fetch({ endAt, startAt });
    }
    loadOlderChat () {
        if(!this._oldestKey) {
            return;
        }
        let endAt = this._oldestKey;
        this.History.push({
            endAt
        })
    }
    loadNewerChat () {
        if(!this._newestKey) {
            return;
        }
        let startAt = this._newestKey;
        this.History.push({
            startAt
        });
    }
    loadCurrentChat () {
        this.History.push({})
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
        if(!node) {
            return;
        }
        node.scrollTop = node.scrollHeight;
    }
    // https://reactjs.org/docs/forms.html
    handleSubmit(e) {
        e.preventDefault();
        const { name, content } = this.state;
        localStorage.setItem('__cname', name);
        this.ChatDecrypt.addRow({ 
            name, 
            content,
            time: Math.floor(new Date().getTime() / 1000)
        });
        this.setState({
            content: '',
            isScrolled: false
        });
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
                        <p className="control"><input className="button" type="button" onClick={this.loadNewerChat} value="Newer" /></p>
                        }
                        {!this.state.isLastedPage && 
                        <p className="control"><input className="button" type="button" onClick={this.loadCurrentChat} value="Newest" /></p>
                        }
                    </div>
                </div>
                <div ref={this.chatZone} className="chat-list" onScroll={this.handleScroll}>
                    {this.state.rows.map((r) => {
                        return <ChatRow
                            key={r.key}
                            id={r.key}
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
                                maxLength="20"
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
