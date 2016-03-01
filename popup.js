document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function(tab) {

      var value = $('#datepicker').val()

      var values = value.split('/');
      var dateValues = [values[2], values[0], values[1]];

      chrome.tabs.getSelected(null, 
      function(tab) { 
        chrome.tabs.sendRequest(tab.id, {date: dateValues}, function(response) 
      {}); 
      }); 

      chrome.tabs.executeScript(tab.id, {file: "content.js"});

  }, false);
}, false);