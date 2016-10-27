if (localStorage.openin === undefined)
	localStorage.openin = 'window';
if (localStorage.deleteconfirm === undefined)
	localStorage.deleteconfirm = 'yes';
if (localStorage.encryption === undefined)
	localStorage.encryption = 'no';
	
localStorage.tempWindowNames = "{}";
	
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (localStorage.openin === 'window') {
        window_info = {}
        if (request.width) {
                window_info.width = request.width;
        }
        if (request.height) {
                window_info.height = request.height;
        }
        if (request.top) {
                window_info.top = request.top;
        }
        if (request.left) {
                window_info.left = request.left;
        }
		chrome.windows.create(window_info, function (window) {
			chrome.tabs.getAllInWindow(window.id, function (tabs) {
				chrome.tabs.remove(tabs[0].id);
			});
			request.tabs.forEach(function (tab) {
				curTab = {
					windowId: window.id,
					url: tab.url,
					selected: false
				};
				if (localStorage.supportPinned == 1 && tab.pinned) {
					curTab.pinned = true;
				}
				chrome.tabs.create(curTab);
			});
		});
	} else if (localStorage.openin === 'tab') {
		request.tabs.forEach(function (tab) {
			chrome.tabs.create({
				url: tab.url
			});
		});
	}
});