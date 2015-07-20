var React = require('react');
var Utils = require('./iiiUtils.js');
var Input = require('./fitInput.js');

var CodeBlock= React.createClass({
  getDefaultProps: function () {
    return {
        interaction: {operator:"default",operand:[]}
    };
  },

  render: function() {

    var cont=[];
    var n = 0;

    var operator = Utils.replaceAll(this.props.interaction.operator,"$","_$_").split("_");
    // We need to remove empty elements who can exist
    for(var k =0;k<operator.length;k++) {
      if(operator[k]==='') operator.splice(k,1);
    }

    for( var i=0;i<operator.length;i++) {

      if(operator[i]!=="$") {
        // if(operator[i].startsWith("•"))
        //   cont.push(<br key={"br"+i+"dot"}/>);

        var str = operator[i];
        var strs = str.split("\n");
        var j=0;
        // cont.push(<span key={"span"+i+"-"+0}>{strs[0]}</span>);
        cont.push(<Input key={"span"+i+"-"+0} type='text' value={strs[0]}></Input>);
        for(j=1;j<strs.length;j++ ) {
          cont.push(<br key={"br"+i+"-"+j}/>);
          // cont.push(<span key={"span"+i+"-"+j}>{strs[j]}</span>);
          cont.push(<Input key={"span"+i+"-"+j} type='text' value={strs[j]}></Input>);
        }

        // if(operator[i].endsWith(":"))
        //   cont.push(<br key={"br"+i+"comma"}/>);
      } else {
        cont.push(<CodeBlock interaction={this.props.interaction.operand[n]} key={"sub"+i}/>);
        n=n+1;
      }
    }

    return <code draggable={true} style={{backgroundColor:Utils.color(this.props.interaction)}}>{cont}</code> ;
  }

});
module.exports = CodeBlock;
