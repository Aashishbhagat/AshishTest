var domain = "";  var auth ="";
document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();
    onInit.then(getClient).catch(handleErr);
    function getClient(_client) {
      window.client = _client;
      client.iparams.get().then(
        function(data) {
          //console.log(data);					
          auth = "Basic " + btoa(data.auth);
          domain = data.domain;
        }),
        function(error) {
          console.log(error);     
        }
      client.events.on('app.activated', onAppActivate);
         }
  }
};



function onAppActivate() {
  var textElement = document.getElementById('apptext');
  var getCompany = client.data.get('company');
  getCompany.then(showCompany).catch(handleErr);
  function showContact(payload) {
    textElement.innerHTML = `Ticket created by ${payload.contact.name}`;
  }
  
  function showCompany(payload) {
    textElement.innerHTML = `Company name : ${payload.company.name}`;
  }

  document.getElementById("clickMe").onclick = function () { 
    console.log('This is for Testing Purpose!');
    var getContact = client.data.get('contact');
    getContact.then(showContact).catch(handleErr);
    getContact.then(getTickets).catch(handleErr);
  };
}

var getTickets = function(){
	var url = domain+'/api/v2/tickets';
				$.ajax(
				{
					url: url,
					type: 'GET',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					headers: {
						"Authorization": auth				
					},
					success: function(data) {											
						console.log("All tickets:-" +JSON.stringify(data));
            var obj = data;
						var i;var ids =[];
						var counter=0;
				
						for (i=obj.length-1;i>=0;i--)
						{
							counter++;
							ids.push(obj[i].id);
						}
           document.getElementById("demo").innerHTML = `Al Ticket Ids are: ${ids}`; 
           for (var i=0;i<ids.length;i++){
            $('<option/>').val(ids[i]).html(ids[i]).appendTo('#TicketNumber');
            }
					},
					error: function() {
						console.log("error");  
                         callback("",resp_id);						
					}
				});
};
function ticketInfo(value) {
var url = domain+'/api/v2/tickets/'+value+'?include=company';
				$.ajax(
				{
					url: url,
					type: 'GET',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					headers: {
						"Authorization": auth				
					},
					success: function(data) {											
					//	console.log(" ticket Company name:-" +JSON.stringify(data));
            var obj = data.company.name;
            //console.log(" ticket Company name2:-" +obj);
            document.getElementById("ticketInfo").innerHTML = `Company associated with this ticket is: ${obj}`; 
					},
					error: function() {
						console.log("error");  
                         callback("",resp_id);						
					}
				});
}
function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
