let currentBrowser;
if (typeof chrome == 'object') {
    currentBrowser = chrome;
} else {
    currentBrowser = browser;
}