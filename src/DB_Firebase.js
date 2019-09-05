import Firebase from './Firebase';
const firebase = Firebase.firebase;

class DB {
    constructor() {
        this.db = firebase.database();
    }
    listLastedRows({
        limit = 30,
        endAt,
        onAdd,
        onChange,
        onRemove
    }) {
        const ref = endAt
            ? this.db.ref('rows')
                .orderByKey()
                .endAt(endAt)
                .limitToLast(limit)
            : this.db.ref('rows')
                .orderByKey()
                .limitToLast(limit);
        if (onAdd) ref.on('child_added', onAdd);
        if (onChange) ref.on('child_changed', onChange);
        if (onRemove) ref.on('child_removed', onRemove);
    }
    addNewRow({
        data
    }) {
        const ref = this.db.ref('rows');
        const r = {
            uid: firebase.auth().currentUser.uid,
            data
        };
        ref.push(r);
        return r;
    }
}

export default DB;