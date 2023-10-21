function doSearch(query) {
	const btdiggURL = 'https://btdig.com/';
	const url = new URL(`${btdiggURL}search`);
	url.searchParams.append('q', query);
	window.open(url.href, 'BT DIGG');
}
