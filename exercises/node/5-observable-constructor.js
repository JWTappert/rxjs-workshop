const Rx = require("rxjs/Rx");

// TODO: create an observable with the Observable constructor that
// emits the values 1, 2, 3 and completes.

// these next calls will occur synch
const source$ = new Rx.Observable(observer => {
	observer.next(1);
	observer.next(2);
	observer.next(3);
	observer.complete();
});

console.log("start");
source$.subscribe(x => console.log(x), err => console.error(err), () => console.info("done"));
console.log("stop");

// these next calls will be 'async', you make them async in some way
const src$ = new Rx.Observable(observer => {
	const id = setTimeout(() => {
		observer.next(1);
		observer.next(2);
		observer.next(3);
		observer.complete();
	}, 2000);

	// you must specify the tear down method that is run when unsubscribe is called
	return () => {
		console.log("unsubscribing");
		clearTimeout(id);
	};
});

console.log("start");
src$.subscribe(x => console.log(x), err => console.error(err), () => console.info("done"));
console.log("stop");
