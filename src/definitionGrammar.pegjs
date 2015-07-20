{
  function mergeExpression(elements) {
    var res = {operator:"",operand:[]};
    for(var i=0;i<elements.length;i++) {
      if( elements[i].operand!==undefined && elements[i].operand!==null ) {
        res.operand.push(elements[i].operand);
        res.operator = res.operator + "$";
      }
      if( elements[i].operator!==undefined && elements[i].operator!==null ) {
        res.operator = res.operator + elements[i].operator;
      }
    }
    return res;
  }

  function mergeDefinition(elements) {
    var res = {operator:"",operand:[]};
    for(var i=0;i<elements.length;i++) {
      if( elements[i].operand!==undefined && elements[i].operand!==null ) {
        res.operand.push(elements[i].operand);
        res.operator = res.operator + "$";
      }
      if( elements[i].operator!==undefined && elements[i].operator!==null ) {
        res.operator = res.operator + elements[i].operator;
      }
    }
    return res;
  }
}


// High level elements

start
  = _ definitions:definition* _ {return definitions;}

definition "definition"
  = type:type _ "("  elements:definitionelement* _ ")" _ ":" _ interaction:expression  _
  { var temp = mergeDefinition(elements); return {type:type,name:temp.operator,args:temp.operand,interaction:interaction};}

definitionelement "definition element"
  = _ operator:operatoridentifier {return {operator:operator};}
  / _ "(" _ type:type _ name:variableidentifier _ ")" {return {operand:{type:type,name:name}};}





// Type expressions
// TODO Complete type expressions with composition and collection
type "type"
  = datatype:datatype _ interactiontype:interactiontype {return {datatype:datatype,interactiontype:interactiontype};}

datatype "data type"
 = base:("text"/"number"/"boolean"/"void") {return {base:base};}
 / name:typeidentifier {return {custom:name}}
 / "<" _ generic:typeidentifier _ ">" {return {generic:generic};}

interactiontype "interaction type"
  = val:("emission" / "reception" / "data") {return val;}





// Interaction expressions

expression "expression"
  = "(" elements:expressionelement* _ ")" {return mergeExpression(elements);}

expressionelement "expression element"
  = _ operand:expression {return {operand:operand};}
  / _ operator:operatoridentifier {return {operator:operator};}





// Literals and leaves of the AST

literal "literal"
  = "\"" val:.* "\"" { return {text:val.join("")}; }
  / val:[-+]?(([0-9]*)/([0-9]+.[0-9]*)) {return {number:parseFloat(val.join(""))};}
  / val:("true"/"false") {return val==="true";}

operatoridentifier "operator identifier"
  = val:[^ \t\r\n$_\(\)\{\}\[\]\.]+ { return val.join(""); }

typeidentifier "type identifier"
  = first:[a-zA-Z] rest:[a-zA-Z0-9]* { var res = rest;res.unshift(first);return res.join(""); }

variableidentifier "variable identifier"
  = first:[a-zA-Z] rest:[a-zA-Z0-9]* { var res = rest;res.unshift(first);return res.join(""); }

_ "white space"
  = [ \t\r\n]*
