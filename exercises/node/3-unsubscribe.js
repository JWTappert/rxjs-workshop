// `data$` is an observable stream of 10 numbers.
const data$ = require("./fixtures/1-data.js");

// TODO: Get the subscription and unsubscribe it after 1 second

const subscription = data$.subscribe(x => console.log(x));

setTimeout(() => {
	subscription.unsubscribe();
}, 1000);
