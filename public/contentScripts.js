function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

let a = injectScript(chrome.runtime.getURL('inject.js'), 'body');

window.addEventListener('message', (message) => {
    console.log(message.data)
    let metadata = message.data.data.map(x=>({
        "label":x.label,
        "modality":x.modality,
        "id":x._id,
        "images":x.instances.map(y=>(y.url))

    }))
    console.log(metadata)
    chrome.storage.local.set({'PAC_DATA':metadata})},{ once: true })

