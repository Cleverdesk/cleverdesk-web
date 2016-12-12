const routes = [
  { path: '/', component: index },
];

const router = new VueRouter({
  routes
});

const cleverdesk = new Vue({
  router,
  data: {
    message: 'Cleverdesk is Clever!!!'
  }
}).$mount('#cleverdesk');

const socket = new Socket('ws://127.0.0.1:4567/ws');
console.debug(socket);
socket.socket.onopen = () => {
  /*
  socket.getPages(function(data) {
  console.log('Nun kommen die Datan:');
  console.log(data);

  cleverdesk._data.pages = data.message;
});
*/
socket.login('demo','demo');
};
