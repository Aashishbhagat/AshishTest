document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};

function onAppActivate() {
  var textElement = document.getElementById('apptext');
  var getContact = client.data.get('contact');
  //getContact.then(showContact).catch(handleErr);
 
  var getCompany = client.data.get('company');
  getCompany.then(showCompany).catch(handleErr);
  function showContact(payload) {
    textElement.innerHTML = `Ticket created by ${payload.contact.name}`;
  }
  function showCompany(payload) {
    textElement.innerHTML = `Company name : ${payload.company.name}`;
  }

  document.getElementById("clickMe").onclick = function () { console.log('This is for Testing Purpose!'); };
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
