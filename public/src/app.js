//Open Socket Connection
const socket = new Socket('ws://127.0.0.1:4567/ws');

//Add Not Found handler
const notFound = (pages) => {
  $.get('/templates/404.html').done((source) => {
    const template = Handlebars.compile(source);
    const html = template({pages});
    $('#cleverdesk').replaceWith(html);
    init();
  });
};

//Prepare Navbar Partial
$.get('/templates/navbar.html', function(source) {
  Handlebars.registerPartial('navbar', source);
});

/**
* Starts the App
* @param {Array.<Pages>} pages
*/
const startApp = (pages) => {
  crossroads.addRoute('', () => {
    hasher.setHash('index');
  });

  crossroads.addRoute('index', () => {
      $.get('/templates/index.html', function(source) {
        const template = Handlebars.compile(source);
        const context = {pages};
        const html = template(context);
        $('#cleverdesk').replaceWith(html);
        init();
      });
  });

  crossroads.bypassed.add(function(request){
    notFound(pages);
  });

  const parseHash = (newHash, oldHash) => {
    crossroads.parse(newHash);
  };

  hasher.initialized.add(parseHash);
  hasher.changed.add(parseHash);
  hasher.init();
};

//Wait until Socket is Ready
socket.socket.onopen = () => {
  //Fetch all Pages
  socket.getPages(function(data) {
    const pages = data.message;
    //Start Application
    startApp(pages);
  });
};
