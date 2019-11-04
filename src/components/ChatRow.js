import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatRow.css';

class ChatRow extends React.Component {
    constructor(props) {
        super(props);
        this.removeChat = this.removeChat.bind(this);
    }
    removeChat () {
        this.props.Chat.removeChat(this.props.id);
    }
    time (v) {
        return new Date(parseInt(v) * 1000).toLocaleString();
    }
    render() {
        return (
            <div className="ChatRow" id={`chatid${this.props.id}`}>
                <div className="ChatRow-Name">
                    <span>{this.props.name}</span>
                    <i>{this.props.uid}</i>
                    <i>{this.time(this.props.time)}</i>
                    <i>#{this.props.id}</i> (<a href="#" onClick={this.removeChat}>Remove</a>)
                </div>
                <div className="ChatRow-Content">
                    <ReactMarkdown source={this.props.content} />
                </div>
            </div>
        );
    }
}


export default ChatRow;
