chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //Whenever the url changes I send the url to my content scripts
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: 'TAB_CHANGED',
      url: changeInfo.url,
    });
  }
});
