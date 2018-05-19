const Rx = require("rxjs/Rx");
const Resource = require("./fixtures/6-Resource");

// TODO: create an observable with the Observable constructor that
// creates a new resource, subscribes to it's "data" event, and tears it
// down when it's done.

/**
 *  This represents some event emitting function or data source, in this exercise we are
 *  wrapping that resource and 'next'ing its event data and then properly unsubscribing
NOTE: `Resource` usage:

const resource = new Resource(); // start the resource;
resource.addEventListener('data', handler); // listen for data events
resource.removeEventListener('data', handler); // stop listening for data events
*/

const source$ = new Rx.Observable(observer => {
	const resource = new Resource();
	const handler = x => observer.next(x);

	resource.addEventListener("data", handler);

	return () => {
		console.log("unsubscribing");
		resource.removeEventListener("data", handler);
	};
});

const subscription = source$.subscribe(x => console.log(x), err => console.error(err), () => console.info("done"));

setTimeout(() => subscription.unsubscribe(), 2100);

/**
NOTE: output should be:

Resource: started
Resource: event listener added
0
1
2
3
Resource: event listener removed
Resource: closed
*/
