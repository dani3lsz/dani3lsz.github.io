(function(){

  var v = 1; //latest version of the embed

  // get the elem to replace
  var exElem = document.getElementById('watchaware_demo');

  // get data attribute and split into an array
  var code = exElem.getAttribute('data-set');
  var codeArray = code.split('/');

  // check if all attributes were included
  if (codeArray.length < 7) {
    console.log('the data-set attribute of #watchaware_demo is incomplete');
    return
  }

  // check if all attribute is a number
  for (var i=0; i<codeArray.length; i++) {
    codeArray[i] = parseInt(codeArray[i]);

    if (typeof codeArray[i] !== 'number' || isNaN(codeArray[i])) {
      console.log('the data-set attribute of #watchaware_demo is incorrect');
      return
    }
  }

  // store attributes in variables
  var
    appId = codeArray[0],
    faceStyle = codeArray[1],
    bandStyle = codeArray[2],
    demoStart = codeArray[3],
    autoStart = codeArray[4],
    headSize = codeArray[5],
    showDesc = codeArray[6];

  // calc the iframe height
  var calcHeight = 420 + Math.floor(headSize * 1.5 ) * 50 + showDesc * 70;

  // inline styling for the iframe
  var style =
    "border: none;" +
    "overflow: hidden;" +
    "min-width: " + 310 + "px;" +
    "max-width: " + 500 + "px;" +
    "height: " + calcHeight + "px;" +
    "margin: " + 10 + "px;" +
    "box-shadow: 0 3px 5px 1px rgba(0,0,0,.2);";

  // create iframe
  var newElem = document.createElement("iframe");
  newElem.setAttribute("id", "watchaware-demo-embed");
  newElem.setAttribute("src", "/v" + v + "/if/" + appId + "/" + faceStyle + "/" + bandStyle + "/" + demoStart + "/" + autoStart);
  newElem.setAttribute("scrolling", "no");
  newElem.setAttribute("frameborder", "no");
  newElem.setAttribute("style", style);

  // replace default tag with the embed
  var currentNode = exElem.parentNode;
  currentNode.replaceChild(newElem, exElem);

})();
