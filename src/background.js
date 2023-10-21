
function onCreated() {
	if (browser.runtime.lastError) {
	    console.log(`Error: ${browser.runtime.lastError}`);
	} else {
	    console.log("Item created successfully");
	}
}

browser.contextMenus.create({
	id: 'search-selection',
	title: 'Search in BTDigg',
	contexts: ['selection'],
	},
	onCreated,
);

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === 'search-selection') {
		const text = info.selectionText;
		const code = "doSearch(" + JSON.stringify(text) + ");";
		
		browser.tabs.executeScript({
            code: "typeof doSearch === 'function';",
        }).then((results) => {
            // The content script's last expression will be true if the function
            // has been defined. If this is not the case, then we need to run
            // clipboard-helper.js to define function copyToClipboard.
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    file: "btdigg.js",
                });
            }
        }).then(() => {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch((error) => {
            // This could happen if the extension is not allowed to run code in
            // the page, for example if the tab is a privileged page.
            console.error("Failed to copy text: " + error);
        });
	}
});