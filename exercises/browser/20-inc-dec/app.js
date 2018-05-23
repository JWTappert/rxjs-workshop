/** NOTE: Setup */
const inc = document.querySelector("#inc");
const dec = document.querySelector("#dec");
const inc10 = document.querySelector("#inc10");
const output = document.querySelector("output");

/** NOTE: these are different because they're coming from a global */
const { BehaviorSubject, map, scan } = Rx;
const { fromEvent } = Rx.Observable;

/** TODO:
    1. update output with incremented and decremented values
    2. start output with value zero

    NOTE: Hint `scan` is a great way to update a state
      without pushing your state to some global scope.
      If you're familiar with Redux, it's going to end up a
      little like that.

    TODO: BONUS - Add a button that increments by 10
  */

const action$ = new Rx.BehaviorSubject({ type: "INIT" });

Rx.Observable.fromEvent(inc, "click")
	.map(() => ({ type: "INC" }))
	.subscribe(action$);

Rx.Observable.fromEvent(inc10, "click")
	.map(() => ({ type: "INC10" }))
	.subscribe(action$);

Rx.Observable.fromEvent(dec, "click")
	.map(() => ({ type: "DEC" }))
	.subscribe(action$);

// observable merge version
// const actions$ = Rx.Observable.merge(inc$, dec$);

// very simple flux pattern
const state$ = action$.scan((state, action) => {
	switch (action.type) {
		case "INC":
			return state + 1;
		case "INC10":
			return state + 10;
		case "DEC":
			return state - 1;
		default:
			return state;
	}
}, 0);

state$.subscribe(x => (output.innerText = x));
