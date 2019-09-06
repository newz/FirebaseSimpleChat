import Firebase from './Firebase';
const firebase = Firebase.firebase;

window.firebase = firebase;

class DB {
    constructor() {
        this.db = firebase.database();
    }
    listLastedRows({
        limit = 30,
        endAt,
        startAt,
        onAdd,
        onChange,
        onRemove
    }) {
        this.unrefs();
        const rows = this.db.ref('rows');
        let ref;
        if (endAt) {
            ref = rows.orderByKey()
                .endAt(endAt)
                .limitToLast(limit);
        } else if (startAt) {
            ref = rows.orderByKey()
                .startAt(startAt)
                .limitToFirst(limit);
        } else {
            ref = rows.orderByKey()
                .limitToLast(limit);
        }
        if (onAdd) ref.on('child_added', onAdd);
        if (onChange) ref.on('child_changed', onChange);
        if (onRemove) ref.on('child_removed', onRemove);
        this.lastedRef = ref;
        this.lastedFn = {
            onAdd, onChange, onRemove
        }
    }
    unrefs () {
        const ref = this.lastedRef;
        if(!ref) {
            return;
        }
        const { onAdd, onChange, onRemove } = this.lastedFn;
        if (onAdd) ref.off('child_added', onAdd);
        if (onChange) ref.off('child_changed', onChange);
        if (onRemove) ref.off('child_removed', onRemove);
        this.lastedRef = this.lastedFn = null;
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