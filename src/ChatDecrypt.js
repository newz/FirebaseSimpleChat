
import DB from './DB_Firebase.js';

class ChatDecrypt {
    constructor () {
        this.DB = new DB();
    }
    setChat (Chat) {
        this.Chat = Chat;
        if(this.encrypter) {
            this.Chat.setState({
                encrypter: this.encrypter
            });
        }
    }
    updateEncrypter (encrypter) {
        this.encrypter = encrypter;
        if(this.Chat) {
            this.Chat.setState({
                encrypter,
                decryptFailed: 0,
                rows: []
            });
            this.fetch({});
        }
    }
    fetch ({ endAt }) {
        console.log('fetch', endAt);
        this.DB.listLastedRows({
            endAt,
            onAdd: (data) => {
                const val = data.val();
                const row = {
                    key: data.key,
                    uid: val.uid,
                    time: 0,
                    name: 'Unknown',
                    content: '** Failed to Decrypt **'
                };
                let decrypted;
                if(this.encrypter) {
                    try {
                        decrypted = this.encrypter.decrypt(val.data);
                        if(!decrypted) {
                            decrypted = null;
                        }
                    } catch (e) {
                        decrypted = null;
                    }
                } else {
                }
                if(decrypted) {
                    row.name = decrypted.name;
                    row.content = decrypted.content;
                    row.decrypted = true;
                    row.time = decrypted.time;
                    if(decrypted.uid) {
                        row.uid = decrypted.uid;
                    }
                }
                if(this.Chat) {
                    this.Chat.addRowShow(row)
                }
            }
        })
    }
    addRow (row) {
        const data = this.encrypter.encrypt(row);
        const r = this.DB.addNewRow({
            data
        });
    }
}

export default ChatDecrypt;