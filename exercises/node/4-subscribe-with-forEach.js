// `data$` is an observable stream of 10 numbers.
const data$ = require("./fixtures/1-data.js");

// TODO: Subscribe to `data$` and log out all values to console.

// returns a promise for each next call
data$.forEach(x => console.log(x)).then(() => console.log("done"), err => console.error(err));

// NOTE: If `forEach` returns a promise, how an we unsubscribe?
//   We can't (yet! perhaps in the future of Rx?)
