var vis = require('./../../../Github/vis/dist/vis.js');
// var vis = require('vis');

var React = require('react');
var Utils = require('./iiiUtils.js');
var uuid = require('uuid');

var VisGraphView= React.createClass({
  getDefaultProps: function () {
    return {
        graph: {},
        identifier:uuid.v4()
    };
  },

  getInitialState:function(){
    return {
      hierarchicalLayout:true
    };
  },

  render: function() {
    return <div onDoubleClick={this.changeMode} id={this.props.identifier} style={{width:"100%",height:"100%"}}>{this.props.identifier}</div> ;
  },

  changeMode:function(event) {
    this.setState({hierarchicalLayout: !this.state.hierarchicalLayout});
    this.updateGraph();
  },

  componentDidMount: function (){
    this.updateGraph();
  },

  componentDidUpdate: function (){
    this.updateGraph();
  },

  updateGraph:function(){
    // Container
    var container = document.getElementById(this.props.identifier);

    // Options
    var options = {
      stabilize: false,
      smoothCurves: false,
      edges: {
        color: '#000000',
        width: 0.5,
        arrowScaleFactor:0.5,
        style:"arrow"
      }

    };
    if (this.state.hierarchicalLayout) {
      options.hierarchicalLayout = {
        enabled: true,
        direction: "UD",
        levelSeparation:100,
        nodeSpacing:1
      };
    } else {
      options.hierarchicalLayout = {
        enabled: false
      };
    }

    var network = new vis.Network(container, this.props.graph, options);
  }



});
module.exports = VisGraphView;
