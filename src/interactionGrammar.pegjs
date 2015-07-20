{
  function merge(parts) {
    var res = {operator:"",operand:[]};
    for(var i=0;i<parts.length;i++) {
      if( parts[i].operand!==undefined && parts[i].operand!==null ) {
        res.operand.push(parts[i].operand);
        res.operator = res.operator + "$";
      }
      if( parts[i].operator!==undefined && parts[i].operator!==null ) {
        res.operator = res.operator + parts[i].operator;
      }
    }
    return res;
  }
}

start
  = _ interaction:expression _ {return interaction;}

expression "expression"
  = "(" parts:expressionpart* _ ")" {return merge(parts);}

expressionpart "expression part"
  = _ operand:expression {return {operand:operand};}
  / _ operator:identifier {return {operator:operator};}

identifier "identifier"
  = val:[^ \t\r\n$_()]+ { return val.join(""); }

_
  = [ \t\r\n]*
