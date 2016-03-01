document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function(tab) {


      var value = $('#datepicker').val()

      var values = value.split('/');
      var dateValues = [values[2], values[0], values[1]];
            console.log('values: ', dateValues)

      chrome.tabs.getSelected(null, 
      function(tab) { 
        chrome.tabs.sendRequest(tab.id, {date: dateValues}, function(response) 
      {}); 
      }); 

      chrome.tabs.executeScript(tab.id, {file: "content.js"});


      

      
       //console.log(tab)
      //var logo = $('document a')
      //alert('hey')
      //console.log(logo)
      // d = document;

      // var f = d.createElement('form');
      // f.action = 'http://gtmetrix.com/analyze.html?bm';
      // f.method = 'post';
      // var i = d.createElement('input');
      // i.type = 'hidden';
      // i.name = 'url';
      // i.value = tab.url;
      // f.appendChild(i);
      // d.body.appendChild(f);
      // f.submit();
      //alert('hey')
    //});
  }, false);
}, false);

// CreedCrazy1