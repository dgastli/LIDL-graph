var CodeBlock = require('./codeBlock.js');
var Utils = require("./iiiUtils.js");
var React = require('react');
var VisGraphView = require("./visGraphView.js");
var Toolbar = require("./iiiSandboxToolbar.js");

var timer;

function maybeupdate() {
  updateDelayPassed=false;
  clearTimeout(timer);
  timer=setTimeout(update,500);
}

function update() {
  try{
    var content = Utils.fromString(document.getElementById("theinputfromuser").value);

    var graphvis = {nodes: [],edges: []};
    Utils.createGraph(graphvis,content,0);

    React.render(<CodeBlock interaction={content} />, document.getElementById('editor'));
    React.render(<VisGraphView graph={graphvis}/>,document.getElementById('graph'));
    React.render(<Toolbar/>,document.getElementById('toolbar'));

  }catch(error){

  }
}


function afterLoad(){
  // document.getElementById('updatebutton').addEventListener('click', update);
  document.getElementById('theinputfromuser').addEventListener('input',maybeupdate);

  update();

}


if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            afterLoad();
        };
        window.onload = newonload;
    } else {
        window.onload = afterLoad;
    }
