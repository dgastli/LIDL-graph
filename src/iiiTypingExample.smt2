; Base types
; Declare
(declare-const void Int)
(assert (= void 0))
(declare-const boolean Int)
(assert (= boolean 1))
(declare-const number Int)
(assert (= number 2))
(declare-const text Int)
(assert (= text 3))
; They are all different
(assert (not (= void text)))
(assert (not (= void number)))
(assert (not (= void boolean)))
(assert (not (= text number)))
(assert (not (= text boolean)))
(assert (not (= number boolean)))


; Declared Variables
; Increment
(declare-const varIncrement Int)
(assert (= varIncrement void))
; Decrement
(declare-const varDecrement Int)
(assert (= varDecrement void))
; Reset
(declare-const varReset Int)
(assert (= varReset void))
; Actual
(declare-const varActual Int)
(assert (= varActual number))
; Desired
(declare-const varDesired Int)
(assert (= varDesired number))


; Interactions
; Affectation1
(declare-const affect1this Int)
(declare-const affect1source Int)
(declare-const affect1destination Int)
(assert (= affect1this void))
(assert (= affect1source affect1destination))


; Links
; Affectation1 to Actual
(assert (= affect1source varActual))
; Affectation1 to Desired
(assert (= affect1destination varDesired))


; Solve
(check-sat)
(get-model)
