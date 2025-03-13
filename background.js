chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab.url);
    if(changeInfo.status === "complete" && tab.url && tab.url.includes("youtube.com/watch")) {
        console.log("Na videu smo");
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
        })
    }
})