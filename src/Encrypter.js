
const sjcl = window.sjcl;

const config = {
    ks: 256,
    iter: 100000
};

class Encrypter {
    constructor ({ cachedPassword }) {
        this.cachedPassword = cachedPassword;
    }
    static createCachedPassword ({ salt = '', password = '' }) {
        const saltBytes = sjcl.codec.utf8String.toBits(salt).slice(0,2);
        const keypb = sjcl.misc.pbkdf2(password, saltBytes, config.iter);
        return {
            password: keypb.slice(0,config.ks/32),
            salt,
            saltBase64: sjcl.codec.base64.fromBits(salt)
        }
    }
    encrypt (data) {
        let e = sjcl.encrypt(this.cachedPassword.password, JSON.stringify(data), {
            iter: config.iter,
            ts: 128,
            ks: 256
        });
        let obj = JSON.parse(e);
        return `${obj.iv}$${obj.ct}`;
    }
    decrypt (content) {
        content = content.split('$');
        const data = {
            "iv": content[0],
            "ct": content[1],
            "salt": this.cachedPassword.saltBase64,
            "v":1,
            "iter": config.iter,
            "ks": config.ks,
            "ts": 128,
            "mode":"ccm",
            "adata": "",
            "cipher":"aes"
        };
        const de = sjcl.decrypt(this.cachedPassword.password, JSON.stringify(data));
        return JSON.parse(de);
    }
}

export default Encrypter;