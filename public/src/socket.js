/** Class representing a Socket. */
class Socket {
   /**
   * Create a Socket.
   * @param {string} host - The host value.
   */
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
    /**
    * Send a massenge
    * @param {string} channel - Name of the Channel the massenge should send to
    * @param {Object} payload - The data that should be send
    * @param {msgCallback} callback - The function that should be called on response from the server
    * @access private
    */
    _sendMsg(channel, payload, callback) {
      const msg = {
        channel,
        message: payload,
        request_id: uuid()
      };
      this.socket.send(JSON.stringify(msg));
      this.callbacks[msg.request_id] = callback;
    }
    /**
     * _sendMsg Callback
     * @callback msgCallback
     * @param {Object} data
     * @access private
     */

    /**
    * login
    * @param {string} username - username
    * @param {string} password - password
    * @callback loginCallback
    */
    login(username, password, callback) {
      const payload = {
        username,
        password,
        lifetime: 86400
      };
      this._sendMsg('GEN_TOKEN', payload, callback);
    }
    /**
    *getPage Callback
    * @callback loginCallback
    * @param {Object} response - The login response
    */
    /**
    * auth
    * @param {string} token - token
    * @callback authCallback
    */
    auth(token, callback) {
      this._sendMsg('APPROVE_TOKEN', token, callback);
    }
    /**
    *auth Callback
    * @callback loginCallback
    * @param {Object} response - The auth response
    */
    /**
    * Get all pages
    * @param {getPagesCallback} callback - The function that should be called when the pages are fetched
    */
    getPages(callback) {
      const send = this._sendMsg('pages', {}, callback);
    }
    /**
     *getPages Callback
     * @callback getPagesCallback
     * @param {Object[]} pages - An Array containing the fetched pages
     */
     /**
     * Get a page
     * @param {String} plugin - The name of the plugin
     * @param {String} page - The name of the page
     * @param {getPagsCallback} callback - The function that should be called when the pages are fetched
     */
     getPage(plugin, page, callback) {
       const send = this._sendMsg('page', {plugin, page}, callback);
     }
     /**
      *getPage Callback
      * @callback getPagsCallback
      * @param {Object} page - The fetched page
      */
}
