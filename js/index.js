let itemArr = [];
let itemIndex = 0;
const udList = document.querySelector('#udList');
const dList = document.querySelector('#dList');
const submit = document.getElementById('submit');
const input = document.getElementById('input');
const udNumScreen = document.getElementById('udNum');
const dNumScreen = document.getElementById('dNum');
const clearUD = document.getElementById('clearUD');
const clearD = document.getElementById('clearD');

window.onload = function() {
    itemArr = JSON.parse(window.localStorage.getItem('todo')) || [];
    render();
}

document.onselectstart = function(){
    return false;
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        submit.click();
    }
})

submit.addEventListener('click', function () {
    if (input.value === '') {
        return;
    }
    let item = {
        content: input.value,
        index: itemIndex,
        done: false
    };
    itemIndex++;
    itemArr.push(item);
    input.value = '';
    render();
});

udList.addEventListener('click', function(event) {
    let target = event.target;
    if (target.tagName === 'INPUT') {
        let node = target.parentNode;
        itemArr[node.dataset.index].done = true;
    } else if (target.tagName === 'BUTTON') {
        let node = target.parentNode;
        itemArr.splice(node.dataset.index, 1);
        itemIndex--;
    }
    render();
});

dList.addEventListener('click', function(event) {
    let target = event.target;
    if (target.tagName === 'BUTTON') {
        let node = target.parentNode;
        itemArr.splice(node.dataset.index, 1);
        itemIndex--;
    }
    render();
});

clearUD.addEventListener('click', function () {
    const len = udList.childNodes.length;
    for (let i = 0;i < len;i++) {
        udList.childNodes[0].childNodes[2].click();
    }
})

clearD.addEventListener('click', function () {
    const len = dList.childNodes.length;
    for (let i = 0;i < len;i++) {
        dList.childNodes[0].childNodes[2].click();
    }
})

function render() {
    let udNum = 0;
    let dNum = 0;
    udList.innerHTML = '';
    dList.innerHTML = '';
    sort();
    window.localStorage.setItem('todo', JSON.stringify(itemArr));
    for (let item of itemArr) {
        if (!item.done) {
            let li = document.createElement('li');
            li.innerHTML = '<input type="checkbox"><span>' + item.content +
                '</span><button>X</button>';
            li.setAttribute('class', 'item');
            li.dataset.index = item.index;
            if (udList.childNodes.length === 0) {
                udList.appendChild(li);
            } else {
                udList.insertBefore(li, udList.childNodes[0]);
            }
            udNum++;
        } else {
            let li = document.createElement('li');
            li.innerHTML = '<input type="checkbox" checked disabled><span>' + item.content +
                '</span><button>X</button>';
            li.setAttribute('class', 'item');
            li.dataset.index = item.index;
            if (dList.childNodes.length === 0) {
                dList.appendChild(li);
            } else {
                dList.insertBefore(li, dList.childNodes[0]);
            }
            dNum++;
        }
    }
    udNumScreen.innerText = udNum;
    dNumScreen.innerText = dNum;
}

function sort() {
    for (let i = 0;i < itemArr.length;i++) {
        itemArr[i].index = i;
    }
}