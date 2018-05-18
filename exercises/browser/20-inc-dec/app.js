
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

