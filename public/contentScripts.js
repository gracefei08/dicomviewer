function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

let a = injectScript(chrome.runtime.getURL('inject.js'), 'body');

window.addEventListener('message', (message) => chrome.storage.local.set({'PAC_DATA':JSON.stringify(message.data)}),{ once: true })

