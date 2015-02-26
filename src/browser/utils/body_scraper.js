var scriptCode = "var ipc = require(\"ipc\");" +
                 "ipc.send(\"body-scraped\", " +
                 "document.body.innerHTML);";
var getHead = "var head = document.getElementsByTagName('head')[0];"
var createScript = "var script = document.createElement('script');";
var setScriptHTML = "script.innerHTML = '" + scriptCode + "';"
var appendScript = "head.appendChild(script);";
var codeString = getHead + createScript + setScriptHTML + appendScript;


module.exports = {
  code: codeString
};
