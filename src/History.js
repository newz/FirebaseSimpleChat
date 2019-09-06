class History {
    constructor(onStateChange) {
        this.onStateChange = onStateChange;
        window.addEventListener('popstate', (e) => {
            this.onStateChange();
        });
    }
    push (data) {
        window.history.pushState(null, null, this.buildQuery(data));
        this.onStateChange();
    }
    buildQuery (data) {
        const qs = [];
        for(let i in data) {
            qs.push(i + '=' + encodeURIComponent(data[i]));
        }
        if(qs.length === 0) {
            return '/';
        }
        return '/?' + qs.join('&');
    }
    getQuery (name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
}

export default History;