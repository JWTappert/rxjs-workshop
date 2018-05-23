(function() {
	const drop = document.querySelector("#drop");
	const dropped = document.querySelector("#dropped");
	const completed = document.querySelector("#completed");
	const svg = document.querySelector("svg");

	const { Observable, mergeMap, scan, map, startWith, concat } = Rx;
	const { fromEvent } = Observable;

	const dropClick$ = fromEvent(drop, "click");

	/**
    TODO: part 1
    1. Use `addBall` and a merging strategy to add an animated ball to the svg element
       for each click of the `drop` button as soon as the `drop` button is clicked.
    2. Increment the value displayed in `dropped` for each ball dropped.
    3. Increment the value displayed in `completed` for each ball animation completed

    TODO: part 2
    4. Change merging strategies so only one animated ball is added at a time,
       But all requested balls complete their animation. Effectively, you'll be
       queueing up animations for each click to `drop`.

    TODO: part3
    5. Change merging strategies so only one animated ball may be added at a time,
       and subsequent requests cancel the currently animating ball.

    TODO: BONUS - Try different source other than button clicks to start your
                  Ball animations!

    NOTE: Balls can be added with the `addBall` function found in global scope.

    `addBall` API:

    addBall(svg: SVGElement): Observable<BallAnimationEvent>

      - returns an Observable that adds a bouncing SVGCircleElement to the passed
        SVGElement. The values emitted are BallAnimationEvents such that:

        interface BallAnimationEvent {
          t: number; // completion ratio between 0 and 1
          x: number; // x pixel position
          y: number; // y pixel position
        }
  */

	// dropClick$
	// 	.map(() => addBall(svg))
	// 	.mergeAll()
	// 	.subscribe(x => console.log(x));

	// dropClick$
	// 	.map(() => addBall(svg))
	// 	.concatAll()
	// 	.subscribe();

	// // good for http requests that supercede one another
	// dropClick$
	// 	.map(() => addBall(svg))
	// 	.switch()
	// 	.subscribe();

	// switch the merge strategy to alter behavior
	dropClick$
		.switchMap(() => listenFor("drop a ball"))
		.mergeMap(() => {
			return addBall(svg)
				.mapTo({ type: "IGNORE" })
				.startWith({ type: "DROPPED" })
				.concat(Rx.Observable.of({ type: "COMPLETED" }));
		})
		.scan(
			(state, action) => {
				switch (action.type) {
					case "DROPPED":
						state.dropped++;
						return state;
					case "COMPLETED":
						state.completed++;
						return state;
					default:
						return state;
				}
			},
			{ dropped: 0, completed: 0 }
		)
		.startWith({ dropped: 0, completed: 0 })
		.subscribe(state => {
			dropped.innerText = state.dropped;
			completed.innerText = state.completed;
		});
})();
