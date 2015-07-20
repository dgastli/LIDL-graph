// RDF/graph database by Vincent Lecrubier available on npm
var Hexastore = require('hexastore');

// Console output coloring module
var Chalk = require('chalk');




var Compiler = function() {

};


// Compile a string containing valid III code into a string containing JS Executable code.
Compiler.prototype.iii2js = function (iiistring) {

    // Parse
    var interaction = require('./iiiParser.js').parse(iiistring);

    // Link = add imported files to the source recursively
    var linked = require('./iiiLinker.js').link(interaction);

    // Validate
    var validated = require('./iiiValidator.js').validate(linked);
    // Flatten
    var flattened = require('./iiiFlattener.js').flatten(validated);
    // Sequentialize
    var sequentialized = require('./iiiSequentializer.js').sequentialize(flattened);
    // Generate
    var generated = require('./iiiGeneratorJS.js').generate(sequentialized);



    // Compilation algorithm
    // Start with an empty graph

    // Follow "import" statements to get all needed files
    // We added those to the graph :
    //   One node for each iii source file names
    //   One edge for each dependency relationships, potentially cyclic directed graph

    // Parse each file
    // We added those to the graph :
    //   One node for each syntactic element of each file
    //   One edge for each syntactic link expression composition

    // Resolve references (linking/flattening)
    // We added those to the graph :
    //   One _ROOT node pointing to the root interaction node
    //   One edge for each reference, completing the AST

    // Sequentialize
    // We added those to the graph :
    //   One _FIRST node pointing to the first interaction to evaluate (often _ROOT)
    //   A set of edges representing the sequence of operations for each execution step

    // Generate Code

}



// Dispatch compilation command to different compiling function iii2xxx
Compiler.prototype.compile = function(iiiString,options) {

  var res;

  try{
    switch (options.input.language) {
      case 'iii':

        switch (options.output.language) {
          case 'js' :
            return this.iii2js(iiiString,options);
            break;
          default :
            throw({message:"Unknown output language"});
            break;
          }

        break;
      default :
        throw({message:"Unknown input language"});
        break;
    }

  } catch (error) {
    console.log(Chalk.red("Error : ")+error.message);
  }
}

module.exports = new Compiler();

if(!module.parent) {
  console.log(Chalk.blue.bold("Command line iii compiler"));
  try{

    var argv = require('minimist')(process.argv.slice(2));

    module.exports.compile(process.argv[2]);


    g = Fs.writeFileSync(options.output.filename,res,{'encoding':options.output.encoding});

  } catch (error) {
    console.log(Chalk.red("Error : ")+error.message);
    process.exit(1);
  }
}else{
  console.log(Chalk.blue.bold("III compiler loaded"));
}
