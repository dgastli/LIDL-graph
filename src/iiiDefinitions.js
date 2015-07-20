var builtInSignatures = {
  "0":[{
    type: "number",
    kind: "reception"
  }],
  "1":[{
    type: "number",
    kind: "reception"
  }],
  "2":[{
    type: "number",
    kind: "reception"
  }],
  "3":[{
    type: "number",
    kind: "reception"
  }],
  "4":[{
    type: "number",
    kind: "reception"
  }],
  "5":[{
    type: "number",
    kind: "reception"
  }],
  "6":[{
    type: "number",
    kind: "reception"
  }],
  "7":[{
    type: "number",
    kind: "reception"
  }],
  "8":[{
    type: "number",
    kind: "reception"
  }],
  "9":[{
    type: "number",
    kind: "reception"
  }],
  "10":[{
    type: "number",
    kind: "reception"
  }],
  "-1":[{
    type: "number",
    kind: "reception"
  }],
  "-5":[{
    type: "number",
    kind: "reception"
  }],
  "true":[{
    type: "number",
    kind: "reception"
  }],
  "false":[{
    type: "number",
    kind: "reception"
  }],
  "$is$": [{
    type: "void",
    kind: "reception"
  }, {
    type: "<type>",
    kind: "reception"
  }, {
    type: "<type>",
    kind: "reception"
  }],
  "$=$": [{
    type: "void",
    kind: "emission"
  }, {
    type: "<type>",
    kind: "emission"
  }, {
    type: "<type>",
    kind: "reception"
  }],
  "if$then$else$": [{
    type: "<type>",
    kind: "reception"
  }, {
    type: "boolean",
    kind: "reception"
  }, {
    type: "<type>",
    kind: "reception"
  }, {
    type: "<type>",
    kind: "reception"
  }],
  "when$,$": [{
    type: "void",
    kind: "emission"
  }, {
    type: "<type>",
    kind: "reception"
  }, {
    type: "void",
    kind: "emission"
  }],
  "when$:$": [{
    type: "void",
    kind: "emission"
  }, {
    type: "<type>",
    kind: "reception"
  }, {
    type: "void",
    kind: "emission"
  }],
  "previous$": [{
    type: "<type>",
    kind: "reception"
  }, {
    type: "<type>",
    kind: "reception"
  }],
  "current$": [{
    type: "<type>",
    kind: "reception"
  }, {
    type: "<type>",
    kind: "reception"
  }],
  "set$": [{
    type: "<type>",
    kind: "emission"
  }, {
    type: "<type>",
    kind: "emission"
  }],
  "$>$": [{
    type: "boolean",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$<$": [{
    type: "boolean",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$<=$": [{
    type: "boolean",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$>=$": [{
    type: "boolean",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$==$": [{
    type: "boolean",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$+$": [{
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$-$": [{
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$*$": [{
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$/$": [{
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "$%$": [{
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }, {
    type: "number",
    kind: "reception"
  }],
  "say$": [{
    type: "text",
    kind: "emission"
  }, {
    type: "text",
    kind: "emission"
  }],
  "anyway:$": [{
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }],
  "•$•$": [{
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }],
  "•$•$•$": [{
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }],
  "•$•$•$•$": [{
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }, {
    type: "void",
    kind: "emission"
  }]
}

module.exports = builtInSignatures;


var interactions = {
  "$=$": ["$number_=$number_",],

};


implementations = {
  "$number_=$number_":{
    'implementation': "affectnumbertonumber",
    'signature': [{
      "name": "this",
      "data": "void",
      "interaction": "reception"
    }, {
      "name": "destination",
      "data": "<type>",
      "interaction": "emission"

    }, {
      "name": "source",
      "data": "<type>",
      "interaction": "reception"
    }]
  }
}



data = {

};


function findCandidates() {

}



//
//
//
//   NumberOrText data: Number,
// Text
//
//
// Point2D data: {
//   x: Number,
//   y: Number
// }
//
// Type data: Text
//
//   NumberOrText data: {
//   type: Type,
//   number: Number,
//   text: Text
// }
