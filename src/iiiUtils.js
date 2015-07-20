var Parser = require('./interactionGrammar.js');

var Definitions = require('./iiiDefinitions.js');

// var levelgrap=require("levelgraph");
// var db = levelgraph("model");


// Hash of a string or array of strings
function hashCode(stringorarray) {
  var string;
  if(stringorarray.constructor === Array) {
    string = stringorarray.join(",");
  } else {
    string = stringorarray;
  }
  var hash = 0, i, chr, len;
  if (string.length === 0) return hash;
  for (i = 0, len = string.length; i < len; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
module.exports.hashCode = hashCode;



function checkSum(stringorarray) {
  var string;
  if(stringorarray.constructor === Array) {
    string = stringorarray.join(",");
  } else {
    string = stringorarray;
  }
  var sum = 0, i, len;
  if (string.length === 0) return sum;
  for (i = 0, len = string.length; i < len; i++) {
    sum  += string.charCodeAt(i);
    sum |= 0; // Convert to 32bit integer
  }
  return sum;
}
module.exports.checkSum = checkSum;






replaceAll = function(string,search, replace)
{
  return string.replace(new RegExp('[' + search + ']', 'g'), replace);
}
module.exports.replaceAll = replaceAll;



if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };
}



function mod(n, m) {
  return ((m % n) + n) % n;
}
module.exports.mod = mod;







var colors=  ['#FEBEBD','#EFBBDD','#E1BFFF','#C4C6FF','#B2D8FF','#B3EEFB','#BCF9B2','#E4F9B2','#F9FBB2','#FFF2B2','#FEE2B5','#FED0B6'];
function color(interaction) {
  return colors[mod(12,checkSum(interaction.operator))];
}
module.exports.color=color;





function toString(interaction) {
    var res = interaction.operator;
    if(!(interaction.operand === undefined || interaction.operand === null)) {
      res += "(";
      if (interaction.operand.length > 0) {
        res += toString(interaction.operand[0]);
        var i;
        for (i = 1; i < interaction.operand.length; i++) {
          res += "," + toString(interaction.operand[i]);
        }
      }
      res += ")";
    }
    return res;
}
module.exports.toString = toString;







function fromString(interactionString) {
  return Parser.parse(interactionString);
}
module.exports.fromString=fromString;






// /*
// Recursively create a graph description to be input to cytoscape js, from a interaction AST
// */
// function createNode(graph,interaction) {
//   var thisNode = toString(interaction);
//   graph.nodes.push({data:{id:thisNode,faveName:interaction.operator,faveColor:color(interaction)}});
//   if(interaction.operand !== undefined && interaction.operand !== null) {
//     if (interaction.operand.length > 0) {
//       for(var i=0;i<interaction.operand.length;i++) {
//         var em = false;
//         var re = false;
//         var kind ="";
//         if(Definitions[interaction.operand[i].operator]!==null && Definitions[interaction.operand[i].operator]!==undefined) {
//           kind = Definitions[interaction.operand[i].operator][0].kind;
//           if(kind ==="data") kind = "emission reception";
//           em = (kind==="emission" || kind === "data" || kind === "emission reception");
//           re = (kind==="reception" || kind === "data" || kind === "emission reception");
//         }
//         newNode = createNode(graph,interaction.operand[i]);
//         graph.edges.push({data:{id:thisNode+'_'+i,source:thisNode,target:newNode,emission:em,reception:re},classes:kind});
//       }
//     }
//   }
//   return thisNode;
// }
// module.exports.createNode=createNode;
//



function arrayContainElementWithProperty(prop,val,array) {
  for (var i=0; i<array.length; i++) {
    if(array[i][prop]===val) {
      return true;
    }
  }
  return false;
}
module.exports.arrayContainElementWithProperty=arrayContainElementWithProperty;
/*
Recursively create a graph description to be input to vis js, from a interaction AST
*/
function createGraph(graph,interaction,level) {
  var thisNode = toString(interaction);
  if(!arrayContainElementWithProperty("id",thisNode,graph.nodes)) {
    graph.nodes.push(
      {id:thisNode,label:interaction.operator,shape:'box',level:level,color:{background:color(interaction),border:'rgba(96, 221, 253, 0)'}}
    );
    // db.put({subject:thisNode,predicate:"isA","node"});
  }
  if(interaction.operand !== undefined && interaction.operand !== null) {
    if (interaction.operand.length > 0) {
      for(var i=0;i<interaction.operand.length;i++) {
        newNode = createGraph(graph,interaction.operand[i],level+1);

        var kind = "data";

        if(Definitions[interaction.operand[i].operator]!==null && Definitions[interaction.operand[i].operator]!==undefined) {
           kind = Definitions[interaction.operand[i].operator][0].kind;

        }

        if(kind==="reception" || kind === "data" ) {
          if(!arrayContainElementWithProperty("id",newNode+"_"+thisNode,graph.edges)) {
            graph.edges.push({id:newNode+"_"+thisNode,from:newNode,to:thisNode,color: '#000000'});
          }
        }
        if(kind==="emission" || kind === "data" ) {
          if(!arrayContainElementWithProperty("id",thisNode+"_"+newNode,graph.edges)) {
            graph.edges.push({id:thisNode+"_"+newNode,from:thisNode,to:newNode,color: '#000000'});
          }
        }



      }
    }
  }
  return thisNode;
}
module.exports.createGraph=createGraph;
