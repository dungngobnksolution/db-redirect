class onClickListener {
    constructor(callback) {
        const CONTROL_TIME = 500;
        let click = 0;
        let timer;

        if (callback && callback instanceof Function) {
            return tab => {
                click += 1;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    // Clear all timers
                    clearTimeout(timer);
                    callback.apply(this, [tab, click]);
                    click = 0;
                }, CONTROL_TIME);
            };
        }
        throw new Error('[InvalidArgumentException]');
    }
}

let currentBrowser;
if (navigator.userAgent.indexOf('Chrome') !== -1) {
    currentBrowser = chrome;
} else {
    currentBrowser = browser;
}

let onClickActivateRedirect = (tab, click) => {
    const hyperLinkEl = document.createElement('a');
    hyperLinkEl.href = tab.url;
    if(!tab.url.includes('web/database/manager')){
        const url = hyperLinkEl.origin + '/web/database/manager'
        currentBrowser.tabs.update(tab.id, {url});
    }
}

currentBrowser.browserAction.onClicked.addListener(
    new onClickListener((tab, click) => onClickActivateRedirect(tab, click))
);