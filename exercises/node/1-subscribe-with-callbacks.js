// `data$` is an observable stream of 10 numbers.
const data$ = require("./fixtures/1-data.js");

// TODO: Subscribe to `data$` using three callbacks and log out all values to console.
// be sure to log errors and completions as well.

data$.subscribe(x => console.log(x), err => console.log(err), () => console.log("done"));
