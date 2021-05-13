var domain = "https://metrocihppde.freshdesk.com";  var auth ="TdaXqo2eMPjcMyN7IW3";
document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);
   // onInit.then(intilizeClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.iparams.get().then(
        function(data) {
                //console.log(data);					
          auth = "Basic " + btoa(auth);
         // domain = data.domain;
         // alert("domain name:-" +JSON.stringify(domain));
        
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
  //var getContact = client.data.get('contact');
  //getContact.then(showContact).catch(handleErr);
 
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
            //console.log(obj.length);
						var i;var ids =[];
						var counter=0;
						//for (i in obj)
						for (i=obj.length-1;i>=0;i--)
						{
						
							counter++;
							ids.push(obj[i].id);
							//if(counter == 5)
								//break;
						}
           // var select = document.getElementById("TicketNumber");
           // alert('ids:-'+ids)
           

           document.getElementById("demo").innerHTML = `Al Ticket Ids are: ${ids}`; 
for (var i=0;i<ids.length;i++){
  $('<option/>').val(ids[i]).html(ids[i]).appendTo('#TicketNumber');
}
 
						
					//	callback(Conversations,resp_id);
					},
					error: function() {
						console.log("error");  
                         callback("",resp_id);						
					}
				});
};

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
