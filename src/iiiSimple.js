////////////////////////////////////////////////////////////////////////////////
//
//
//
//
//              :::::::::::       :::::::::::       :::::::::::
//                 :+:               :+:               :+:
//                +:+               +:+               +:+
//               +#+               +#+               +#+
//              +#+               +#+               +#+
//             #+#               #+#               #+#
//        ###########       ###########       ###########
//
//
//                       Vincent LECRUBIER
//
//



////////////////////////////////////////////////////////////////////////////////
//
//  ######  #     # #     # ####### ### #     # #######
//  #     # #     # ##    #    #     #  ##   ## #
//  #     # #     # # #   #    #     #  # # # # #
//  ######  #     # #  #  #    #     #  #  #  # #####
//  #   #   #     # #   # #    #     #  #     # #
//  #    #  #     # #    ##    #     #  #     # #
//  #     #  #####  #     #    #    ### #     # #######
//

// The state of the interactive system
// activation
var act;
// value
var val;
// previous activation
var preact;
// previous value
var preval;
// These four objects represent the state of the interactive system at a certain time
// These objects are Map<String,value>
// So, when we write val[TheName], we retrieve, or write to, the value of the node identified by the string TheName
// Which means that here, references to data are Strings
// It could as well be pointers, numbers or anything else, it justs depends on the language


// Runtime functions. Don't pay attention to details, just jump to the next chapter (interactions) to know more about the semantics


// Evaluate
// Ensure that an interaction (i.e. a reception, emission or data) is evaluated
function evaluate(kind,interactionString) {
  // Search if this interaction has already been evaluated, at the current step
  //   If it has already been evaluated, then do nothing
  //   If it has not been evaluated yet, then evaluate it by calling the appropriate function in the list below
  //     the function called might in turn call evaluate, making it indirectly recursive
  var interaction = fromString(interactionString);
  var This = toString(interaction);

  if (typeof interaction == "string" || interaction instanceof String) {
    eval(kind+"Data(\"" + This + "\")");
  } else {
    var res = "";
    res += interaction.operator;
    res += "(";
    res += "\"" + This + "\"";

    for (var i = 0; i < interaction.operand.length; i++) {
      res += "," + "\"" + toString(interaction.operand[i]) + "\"";
    }

    res += ")";
    eval(res);

  }
}

// Receive
// Shortcut to evaluate a reception
function receive(interactionString) {
  evaluate("Reception",interactionString);
}

// Emit
// Shortcut to evaluate an emission
function emit(interactionString) {
  evaluate("Emission",interactionString);
}

// ToString
// Retrieves the reference to the data of a given interaction
function toString(interaction) {
  if (typeof interaction == 'string' || interaction instanceof String) {
    return interaction;
  } else {
    var res = interaction.operator;
    res += "(";
    if (interaction.operand.length > 0) {
      res += toString(interaction.operand[0]);
      for (var i = 1; i < interaction.operand.length; i++) {
        res += "," + toString(interaction.operand[i]);
      }
    }
    res += ")";
    return res;
  }
}

// FromString
// Retrieve the interaction which is associated to a data reference
function fromString(interactionString) {
  return parser.parse(interactionString);
}


////////////////////////////////////////////////////////////////////////////////
//  ###  #     #  #######  #######  ######      #      #####   #######  ###  #######  #     #
//   #   ##    #     #     #        #     #    # #    #     #     #      #   #     #  ##    #
//   #   # #   #     #     #        #     #   #   #   #           #      #   #     #  # #   #
//   #   #  #  #     #     #####    ######   #     #  #           #      #   #     #  #  #  #
//   #   #   # #     #     #        #   #    #######  #           #      #   #     #  #   # #
//   #   #    ##     #     #        #    #   #     #  #     #     #      #   #     #  #    ##
//  ###  #     #     #     #######  #     #  #     #   #####      #     ###  #######  #     #
//

// Basically, the code for all interactions (reception or emission) follow a similar pattern.
//
// Here is an example for an interaction called "TheInteractionName". It is a reception.
// It takes 3 arguments : Argument1 and Argument2 are receptions, Argument3 is an emission
// Its Signature in iii language is:
//
// <type> reception theInteractionName( <type> reception argument1, <type> reception argument2, <type> emission argument3 )
//
// And here is its code

// First, the function signature. It is similar to the signature in the iii language,
// but we added a reference to the data associated with this interaction.
// This reference is called "This" and added as the first argument
function TheInteractionName(This, Argument1, Argument2, Argument3) {

// 1) We start by applying the "receive" function to get data on which the interaction depends
  receive(Argument1);
  receive(Argument2);

// 2) Then, we do affectations. Here is THE difference between Emissions and Receptions :
//   In Receptions, we affect values to "This". We basically use "This" as  a return value, like in a normal function
//     -> "This" is on the left hand side of affectations
//   In Emissions, it is the opposite ! We perform affectations which use the value of "This".
//     -> "This" is on the right hand side of affectations

// Since "TheInteractionName" is a reception, we write something like
  val[This]=val[Argument1];
// If it was an emission, we would have written something like
  val[Argument3]=val[This];

// 3) Next, we apply "emit" to process data that depends on this interaction
  emit(Argument3);

// 4) Finally, we return true if everything went fine, and false if something went wrong
  return true;

}


// Ok, now let's define the semantics of basic interactions, starting with receptions, and then emissions

////////////////////////////////////////////////////////////////////////////////
//
//  ######   #######   #####   #######  ######   #######  ###  #######  #     #
//  #     #  #        #     #  #        #     #     #      #   #     #  ##    #
//  #     #  #        #        #        #     #     #      #   #     #  # #   #
//  ######   #####    #        #####    ######      #      #   #     #  #  #  #
//  #   #    #        #        #        #           #      #   #     #  #   # #
//  #    #   #        #     #  #        #           #      #   #     #  #    ##
//  #     #  #######   #####   #######  #           #     ###  #######  #     #
//



/*
  Previous
  Description:
  Previous value of a variable
  Signature in iii language:
  <type> reception previous(<type> reception A)
*/
function Previous(This, A) {

  val[This] = preval[A];
  act[This] = preact[A];

  return true;
}


/*
  If
  Description:
  Classic if then else, equivalent of the ternary operator in C
  Signature in iii language:
  <type> reception if(boolean reception Condition, <type> reception Then, <type> reception Else)
*/
function If(This, Condition, Then, Else) {

  receive(Condition);
  receive(Then);
  receive(Else);

  if (act[Condition] ) {
    if (val[Condition] ) {
      val[This] = val[Then];
      act[This] = act[Then];
    } else {
      val[This] = val[Else];
      act[This] = act[Else];
    }
  } else {
    act[This] = false;
  }

  return true;
}

/*
  Add
  Description:
  Classic addition, equivalent of the + operator in most languages
  Signature in iii language:
  number reception add(number reception A, number reception B)
*/
function Add(This, A, B) {

  receive(A);
  receive(B);

  if (act[A] && act[b]) {
    val[This] = val[A] + val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }

  return true;
}

/*
  Substract
  Description:
  Classic substraction, equivalent of the - operator in most languages
  Signature in iii language:
  number reception substract(number reception A, number reception B)
*/
function Substract(This, A, B) {

  receive(A);
  receive(B);

  if (act[A] && act[b]) {
    val[This] = val[A] - val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }

  return true;
}

/*
  Multiply
  Description:
  Classic multiplication, equivalent of the * operator in most languages
  Signature in iii language:
  number reception multiply(number reception A, number reception B)
*/
function Multiply(This, A, B) {

  receive(A);
  receive(B);

  if (act[A] && act[b]) {
    val[This] = val[A] * val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }

  return true;
}

/*
  Divide
  Description:
  Classic division, equivalent of the / operator in most languages
  Signature in iii language:
  number reception divide(number reception A, number reception B)
*/
function Divide(This, A, B) {

  receive(A);
  receive(B);

  if (act[A] && act[b] && val[b] !== 0) {
    val[This] = val[A] / val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }

  return true;
}

/*
  LessThan
  Description:
  Classic less than, equivalent of the < operator in most languages
  Signature in iii language:
  number reception lessThan(number reception A, number reception B)
*/
function LessThan(This, A, B) {

  receive(A);
  receive(B);

  if (act[A] && act[b]) {
    val[This] = val[A] < val[B];
    act[This] = true;
  } else {
    act[This] = false;
  }

  return true;
}

/*
  FirstActiveOf
  Description:
  Returns the first argument if it is active, or the second argument if it is not.
  Basically, it tries to get an active value, with a priority to the leftmost argument.
  Signature in iii language:
  <type> reception firstActiveOf(<type> reception A, <type> reception B)
*/
function FirstActiveOf(This, A, B) {

  receive(A);
  receive(B);

  if(act[A]) {
    val[This]= val[A];
    act[This]= act[A];
  } else if (act[B]) {
    val[This]= val[B];
    act[This]= act[B];
  } else {
    act[This]= false;
  }

  return true;
}

/*
  ReceiveEither
  Description:
  Non-deterministically select one of two reception
  Basically, we receive either one or the other
  Signature in iii language:
  <type> reception receiveEither(<type> reception A, <type> reception B)
*/
function ReceiveEither(This, A, B) {

  receive(A);
  receive(B);

  var choice = Math.floor(2*Math.random());
  if(choice===0) {
    act[This] = act[A];
    val[This] = val[A];
  } else {
    act[This] = act[B];
    val[This] = val[B];
  }

  return true;
}

/*
  IsActive
  Description:
  Returns the activation of its argument as a boolean
  Signature in iii language:
  boolean reception isActive(<type> reception A)
*/
function IsActive(This, A) {

  receive(A);

  val[This] = act[A];
  act[This] = true;

  return true;
}

/*
  LastValueOf
  Description:
  Returns the last known value of its argument
  Signature in iii language:
  <type> reception LastValueOf(<type> reception A)
*/
function LastValueOf(This, A) {

  receive(A);

  if (act[A]) {
    val[This] = val[A];
    act[This] = true;
  } else {
    val[This] = preval[This];
    act[This] = preact[This];
  }

  return true;
}

/*
  IsTrue
  Description:
  Return an active value when its argument is true.
  Basically this is the inverse of IsActive().
  IsActive(IsTrue()) = Identity
  Signature in iii language:
  void reception IsTrue(boolean reception A)
*/
function IsTrue(This,A) {

  receive(A);

  act[This]=act[A] && val[A];

  return true;
}


/*
  NotReceived
  Description:
  Negates the activity of a reception
  Signature in iii language:
  void reception notReceived(void reception A)
*/
function NotReceived(This,A){

  receive(A);

  act[This]=!act[A];

  return true;
}

////////////////////////////////////////////////////////////////////////////////
//
//  #######  #     #  ###   #####    #####   ###  #######  #     #
//  #        ##   ##   #   #     #  #     #   #   #     #  ##    #
//  #        # # # #   #   #        #         #   #     #  # #   #
//  #####    #  #  #   #    #####    #####    #   #     #  #  #  #
//  #        #     #   #         #        #   #   #     #  #   # #
//  #        #     #   #   #     #  #     #   #   #     #  #    ##
//  #######  #     #  ###   #####    #####   ###  #######  #     #
//

/*
  Activation
  Activate an emission depending on a boolean
  Signature in iii language
  boolean emission activation(void emission A)
*/
function Activation(This, A) {

  act[A] = val[This] && act[This];

  emit(A);

  return true;
}


/*
  Affect
  Receive the value of a source and emit it to a destination
  Signature in iii language :
  void emission affect(<typeA> emission Destination, <typeA> reception Source)
*/
function Affect(This, Dest, Source) {

  receive(Source);

  if (act[This]) {
    act[Destination] = act[Source];
    val[Destination] = val[Source];
  }

  emit(Destination);

  return true;
}


/*
  When
  Activate an interaction only when an activation is received
  Signature in iii language :
  void emission when(void reception Activation, void emission Interaction)
*/
function When(This, Activation, Interaction) {

  receive(Activation);

  if (act[This] && act[Activation]) {
    act[Interaction] = true;
  } else {
    act[Interaction] = false;
  }

  emit(Interaction);

  return true;
}



/*
  Always
  Keep an interaction active all the time
  Signature in iii language :
  <type> emission always(<type> emission Interaction)
*/
function Always(This,Interaction) {

  act[Interaction] = true;
  val[Interaction] = val[This];

  emit(Interaction);

  return true;
}


/*
  All
  Group two interactions into one, and activate them all
  Signature in iii language:
  <type> emission all(<type> emission Interaction...)
*/
function All(This, Interaction1, Interaction2) {

  act[Interaction1] = act[This];
  val[Interaction1] = val[This];

  act[Interaction2] = act[This];
  val[Interaction2] = val[This];

  emit(Interaction1);
  emit(Interaction2);

  return true;
}


/*
  Either
  Group two interactions into one, and activate only one
  Signature in iii language:
  <type> emission either(<type> emission Interaction...)
*/
function Either(This, Interaction1, Interaction2) {

  var choice = Math.floor( 2 * Math.random() ); // Non deterministic 0 or 1
  if(choice===0) {
    act[Interaction1] = act[This];
    act[Interaction2] = false;
  } else {
    act[Interaction1] = false;
    act[Interaction2] = act[This];
  }
  val[Interaction1] = val[This];
  val[Interaction2] = val[This];

  emit(Interaction1);
  emit(Interaction2);

  return true;
}




////////////////////////////////////////////////////////////////////////////////
//
//  ######      #     #######     #
//  #     #    # #       #       # #
//  #     #   #   #      #      #   #
//  #     #  #     #     #     #     #
//  #     #  #######     #     #######
//  #     #  #     #     #     #     #
//  ######   #     #     #     #     #
//
//
// Combine capabilities of Receptions and Emissions

function ReceptionData(This) {
  // Nothing to do in this simplified version
}

function EmissionData(This) {
  // Nothing to do in this simplified version
}
