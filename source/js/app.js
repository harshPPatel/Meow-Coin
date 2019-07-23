// JSON File URL
var featureJSONSource = 'assets/js/json/features.json';

/**
 * Prints fetched data to the screen with HTML Elements
 * @param {Array} data Array of fetched data from 'features.json'
 */
function printFeatureObject(data) {
  // Getting output Element
  var divs = document.getElementsByClassName('--js-feature-content');

  // Looping through the data
  for (var i = 0; i < divs.length; i++) {
    var printLayout =
      '<div class="text-content"> <h2> ' +
      data[i].heading +
      '</h2><p>' +
      jsonObject[i].paragraph +
      '</p></div>';

    divs[i].innerHTML = printLayout;
  }
}

/**
 * Fetching data from 'features.json' file and calls printFeatureObject method to print
 * the data to the screen.
 */
function getFeatures() {
  // Creating HTTP Request Object
  var xhttp = new XMLHttpRequest();

  // Making HTTP Request
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Parsing JSON Data
      var featureData = JSON.parse(xhttp.response);
      // Passing data to method
      printFeatureObject(featureData);
    }
  };
  xhttp.open('GET', featureJSONSource, true);
  xhttp.send();
}

// Calling method on window's 'onload' event.
window.onload = getFeatures();
