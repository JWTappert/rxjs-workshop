const data$ = require("./fixtures/13-data");

/** TODO:
  1. Take the odd numbers from the observable `data$`,
  2. Double them (i.e. 1 -> 2, 3 -> 6, etc)
  3. Sum them
  4. Log the result
  5. Try using the pipeable operators from `rxjs/operators`!
*/

data$
	.filter(x => {
		console.log("filter called", x);
		return x % 2 === 1;
	})
	.map(x => {
		console.log("map called", x);
		return x + x;
	})
	.reduce((state, x) => {
		console.log("reduce called", state, x);
		const newState = state + x;
		return newState;
	})
	.subscribe(x => console.log(x));

// how it should be done v6.x
// data$.pipe(filter(x => x % 2 === 1), map(x => x + x), reduce((state, x) => state + x)).subscribe(x => console.log(x));

/**
  NOTE: expected output
  50
*/

//TODO: try replacing `reduce` with `scan`!
