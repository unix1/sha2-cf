function init() {
    document.getElementById('search').addEventListener("submit", function(event) {
        event.preventDefault();
        answer(event);
    }, false);
}

function answer(_event) {
    const q = document.getElementById('q').value;
    const qEncoded = encodeURIComponent(q);
    fetchOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json'
        }
    };
    fetch('/hash?q=' + qEncoded, fetchOptions)
    .then(response => response.json())
    .then(json => render_answer(json));
}

function render_answer(json) {
    const answerElem = document.getElementById('answer');
    removeAllChildren(answerElem);
    const answerNode = answerToNode(json);
    answerElem.appendChild(answerNode);
}

function answerToNode(answer) {
    var node;
    if (answer.hasOwnProperty('sha2')) {
        node = document.createElement('div');
        node.setAttribute('class', 'simple');
        node.appendChild(document.createTextNode(answer.sha2));
    } else {
        node = document.createElement('div');
        node.setAttribute('class', 'simple');
        node.appendChild(document.createTextNode("¯\\_(ツ)_/¯"));
    }
    return node;
}

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild)
    }
}

window.onload = (_event) => {
    init();
};
