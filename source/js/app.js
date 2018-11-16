var featureJSONSource = "assets/js/json/features.json";

function printFeatureObject(jsonObject) {
  var divs = document.getElementsByClassName('--js-feature-content');

  for (var i = 0; i < divs.length; i++) {
    var printLayout = '<div class="text-content"> <h2> ' + jsonObject[i].heading + '</h2><p>' + jsonObject[i].paragraph + '</p></div>';

    divs[i].innerHTML = printLayout;
  }
}

function getFeatures() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var featureData = JSON.parse(xhttp.response);
      printFeatureObject(featureData);
    }
  };
  xhttp.open("GET", featureJSONSource, true);
  xhttp.send();
}

window.onload = getFeatures();
