

var assert = require("assert");

var IIIParser = require('../bin/iiiGrammar.js');

describe('IIIParser',function(){

  var parsed;
  var testExpression = '(do that ( bobie : <type1> in) and this (thing34:number out) while (a:(number ,void) in) is (b:|{x:number,y:number},text| in)) : void out  = (always (lol))';


    describe('parsing',function(){
    it('parse the test expression',function(){
      assert.doesNotThrow(function(){
        parsed=IIIParser.parse(testExpression);
      });
    });
    it('return an array of interactions',function(){
      assert.equal(true,parsed instanceof Array);
    });
  });
    describe('names',function(){
    it('interaction name',function(){
      assert.equal('dothat$andthis$while$is$',parsed[0].name);
    });
    it('long argument name with number',function(){
      assert.equal('thing34',parsed[0].args[1].name);
    });
    it('long argument name',function(){
      assert.equal('bobie',parsed[0].args[0].name);
    });
    it('short argument name',function(){
      assert.equal('a',parsed[0].args[2].name);
    });
    it('short argument name',function(){
      assert.equal('b',parsed[0].args[3].name);
    });
  });
    describe('types',function(){
    it('interaction base type',function(){
      assert.equal('void',parsed[0].type.datatype.base);
    });
    it('argument base type',function(){
      assert.equal('number',parsed[0].args[1].type.datatype.base);
    });
    it('argument generic type',function(){
      assert.equal('type1',parsed[0].args[0].type.datatype.generic);
    });
    it('argument tuple type',function(){
      assert.equal('number',parsed[0].args[2].type.datatype.tuple[0].base);
      assert.equal('void',parsed[0].args[2].type.datatype.tuple[1].base);
    });
    it('argument record type',function(){
      assert.equal('x',parsed[0].args[3].type.datatype.union[0].record[0].key);
      assert.equal('number',parsed[0].args[3].type.datatype.union[0].record[0].value.base);
      assert.equal('y',parsed[0].args[3].type.datatype.union[0].record[1].key);
      assert.equal('number',parsed[0].args[3].type.datatype.union[0].record[1].value.base);
      assert.equal('text',parsed[0].args[3].type.datatype.union[1].base);
    });


  });
})


var IIICompiler = require('../bin/iiiCompiler.js');

describe('IIICompiler',function(){
  describe('compile',function(){
    it('compile the test expression',function(){
      assert.doesNotThrow(function(){
        IIICompiler.compile("",{input:{filename:'test.iii'}});
      });
    });
  });
})
