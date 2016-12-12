class Socket {
    constructor(host) {
        this.host = host;
        this.socket = new WebSocket(host);
        this.socket.onmessage = (e) => {
          const data = JSON.parse(e.data);

          this.callbacks[data.request_id](data);

          delete this.callbacks[data.request_id];
        };
        this.status = Symbol('logged out');
        this.token = undefined;
        this.callbacks = {};
    }
    _sendMsg(channel, payload, callback) {
      const msg = {
        channel,
        message: payload,
        request_id: uuid()
      };
      this.socket.send(JSON.stringify(msg));
      this.callbacks[msg.request_id] = callback;
    }
    login(username, password) {
      const payload = {
        username,
        password,
        lifetime: 86400
      };
      this._sendMsg('gen_token', payload, function(data) {console.warn(data);});
    }
    getPages(callback) {
      const send = this._sendMsg('pages', {}, callback);
    }
}
