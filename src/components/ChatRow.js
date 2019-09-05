import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatRow.css';

class ChatRow extends React.Component {
    time (v){
        return new Date(parseInt(v) * 1000).toLocaleString();
    }
    render() {
        return (
            <div className="ChatRow">
                <div className="ChatRow-Name">
                    <span>{this.props.name}</span>
                    <i>{this.props.uid}</i>
                    <i>{this.time(this.props.time)}</i>
                </div>
                <div className="ChatRow-Content">
                    <ReactMarkdown source={this.props.content} />
                </div>
            </div>
        );
    }
}


export default ChatRow;
