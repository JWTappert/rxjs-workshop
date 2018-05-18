
  /** NOTE: Setup */
  const inc = document.querySelector('#inc');
  const dec = document.querySelector('#dec');
  const output = document.querySelector('output');
  
  /** NOTE: these are different because they're coming from a global */
  const { BehaviorSubject } = Rx;
  const { fromEvent } = Rx.Observable;
  const { map, scan } = Rx.operators;

  /** TODO:
    1. update output with incremented and decremented values
    2. start output with value zero

    NOTE: Hint `scan` is a great way to update a state
      without pushing your state to some global scope.
      If you're familiar with Redux, it's going to end up a
      little like that.

    TODO: BONUS - Add a button that increments by 10
  */

  // FINAL_START
  const action$ = new BehaviorSubject(0);

  fromEvent(inc, 'click').pipe(
    map(() => ({ type: 'INCREMENT' }))
  ).subscribe(action$);

  fromEvent(dec, 'click').pipe(
    map(() => ({ type: 'DECREMENT' }))
  ).subscribe(action$);

  const state$ = action$.pipe(
    scan((state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
        default:
          return state;
      }
    }, 0)
  )
  .subscribe(s => output.innerText = s);
  // FINAL_END
