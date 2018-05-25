(function() {
	// NOTE: Setup ---------------------------------------------

	// the div containing the search suggestion results
	const suggestions = document.querySelector("#suggestions");

	// the div containing the selected tickers
	const tickers = document.querySelector("#tickers");

	// the search input element
	const q = document.querySelector("#q");

	// a function to get the search results URL
	const getSearchURL = query => `/search?q=${query}`;
	// ---------------------------------------------------------

	/**
      TODO: create an subscribe to an observable that does the
            look ahead search

      NOTE: You don't have to keep the subscription to it, as it will
            be active for the life of this application.
  */

	Rx.Observable.fromEvent(q, "input")
		.debounceTime(500)
		.map(e => getSearchURL(e.target.value))
		.switchMap(url => Rx.Observable.ajax.getJSON(url).catch(() => Observable.empty()))
		.subscribe(showSuggestions);

	// TODO: setup a WebSocketSubject

	const socket = Rx.Observable.webSocket("ws://localhost:8080");

	function getTickerStream(symbol) {
		// TODO: multiplex the web socket (then add retry logic)
		return socket
			.multiplex(
				// factory to get subscription message to send
				() => JSON.stringify({ type: "sub", symbol: symbol }),
				// factory to get unsub message to send teardown
				() => JSON.stringify({ type: "unsub", symbol }),
				// filter to get data we care about
				data => data.symbol === symbol
			)
			.map(data => data.price)
			.retryWhen(error$ => {
				error$.switchMap(() => Rx.Observable.timer(5000));
			});
	}

	// ***************************************************************************
	// ***************************************************************************
	// ***************************************************************************
	// Hacky render code past here. Just for demoing purposes. Not best practice!
	// ***************************************************************************
	// ***************************************************************************
	// ***************************************************************************

	function showSuggestions(results) {
		let html = "<ul>";
		results.forEach(({ symbol, name }) => {
			html += `<li>
        <a href="javascript:selectSymbol('${symbol}')">
          ${symbol} - ${name}
        </a>
      </li>`;
		});
		html += "</ul>";

		suggestions.innerHTML = html;
		return html;
	}

	// a hook that is called when a symbol is selected from the suggestions.
	function selectSymbol(symbol) {
		addTicker(symbol);
		suggestions.innerHTML = "";
	}

	function addTicker(symbol) {
		const id = "ticker-" + symbol;
		if (document.querySelector("#" + id)) {
			return;
		}
		const ticker = document.createElement("x-ticker-display");
		ticker.id = id;
		ticker.title = symbol;
		ticker.data = getTickerStream(symbol);
		tickers.appendChild(ticker);
	}

	window.selectSymbol = selectSymbol;
})();
