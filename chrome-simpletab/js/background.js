function setDefaultSettings() {
    chrome.storage.local.set({
        background:'',
        notes: 'notes',
        darkMode: true,
        showNotes: true,
        showClock: true,
        showOptions: true
    })
}

chrome.runtime.onInstalled.addListener(function(details){
    if (details.reason == 'install') {
        setDefaultSettings();
    }
});