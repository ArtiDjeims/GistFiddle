//Created by Arthur James (Arti_Djeims)

//Checking the link
if (gistId && fileName) {
    console.log('%c \n' +
        ' ______     __     ______     ______   ______   __     _____     _____     __         ______    \n' +
        '/\\  ___\\   /\\ \\   /\\  ___\\   /\\__  _\\ /\\  ___\\ /\\ \\   /\\  __-.  /\\  __-.  /\\ \\       /\\  ___\\   \n' +
        '\\ \\ \\__ \\  \\ \\ \\  \\ \\___  \\  \\/_/\\ \\/ \\ \\  __\\ \\ \\ \\  \\ \\ \\/\\ \\ \\ \\ \\/\\ \\ \\ \\ \\____  \\ \\  __\\   \n' +
        ' \\ \\_____\\  \\ \\_\\  \\/\\_____\\    \\ \\_\\  \\ \\_\\    \\ \\_\\  \\ \\____-  \\ \\____-  \\ \\_____\\  \\ \\_____\\ \n' +
        '  \\/_____/   \\/_/   \\/_____/     \\/_/   \\/_/     \\/_/   \\/____/   \\/____/   \\/_____/   \\/_____/ \n' +
        '                                                                                                \n ', 'background: #1e2225; color: #3fc346');
} else {
    window.location = "/";
}


//Loading Gist using GistFiddle.js
gist.load(gistId);
let file = fileName;


//Working with Gist Date
let utcDate = data.updated_at;
let localDate = new Date(utcDate);
let lastUpdate = moment(localDate).calendar(); //moment.js


//Loading HTML parts
let menu = document.getElementById("menu");
let code = document.getElementById("code");
let sandbox = document.getElementById("sandboxFrame");
let remixBlock = document.getElementById("remix");


//Generating Menu
menu.innerHTML = `
<div class="menuContent">
    <div class="logo" onclick="window.location = '/';">
        GistFiddle
    </div>
    <div class="user" onclick="window.open('https://gist.github.com/' + data.owner.login, '_blank');">
        <img class="avatar" src="${data.owner.avatar_url}">
        <div class="name">${data.owner.login}</div>
    </div>
    <div class="file" onclick="codeAction.show()" title="Editing Mode">
        ${file}
    </div>
    <div class="language">
        Language: ${data.files[file].language}
    </div>
    <div class="updates" onclick="window.open('https://gist.github.com/' + data.owner.login + '/' + gistId + '/revisions', '_blank');">
        Updated ${lastUpdate}
    </div>
    <div class="actions">
    <button class="fullPageBut" onclick="window.location = '../index.html?gist=' + gistId + '&file=' + fileName;">Full Page</button>
    <button id="hideCode" class="hideCodeBut" onclick="codeAction.hide()">Hide Code</button>
    </div>
    </div>
    <div class="commentsArea">
    <div class="commentsBlock">
    <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-numposts="5" data-width="100%" 	
data-colorscheme="light"></div>
</div>
    </div>
`;


//Code Editor
var cm = CodeMirror(document.getElementById("code"), {
    value: data.files[file].content,
    mode: "htmlmixed",
    indentUnit: 4,
    lineNumbers: true,
});


//Code Actions
let codeAction = {
    show: () => {
        code.style.display = "inline-block";
        remixBlock.style.display = "block";
        document.getElementById("hideCode").style.display = "block";
    },
    hide: () => {
        code.style.display = "none";
        remixBlock.style.display = "none";
        document.getElementById("hideCode").style.display = "none";
    }
}


//Loading SandBox
codeAction.hide();
sandbox.innerHTML = `<iframe class="frame" frameborder="no" scrolling="no" src="../index.html?gist=${gistId}&file=${fileName}"></iframe>`;


//Remix Code
let realtime = false;

function remix() {
    let remixedCode = cm.getValue();
    let pattern = /html>(.*)<\/html>/mis;
    let editingMode = true;
    if ((remixedCode).match(pattern)) { //Check for HTML page in code
        let note = confirm("Note: Inserting an HTML page inside another HTML page, might not work as expected!");
        if (note == true) {
            editingMode = true;
        } else {
            editingMode = false;
        }
    }

    if (editingMode == true) { //Entering Editing Mode
        if (gist.type(fileName) == ".js") {
            eval(remixedCode);
        } else {
            sandbox.innerHTML = remixedCode;
            let arr = sandbox.getElementsByTagName('script')
            for (var n = 0; n < arr.length; n++) {
                eval(arr[n].innerHTML);
            }
        }
        realtime = true;
        //Generating Remix menu
        remixBlock.innerHTML = `
        <span class="left">Editing Mode</span>
        <div class="remixActions right">
        <div id="realTime" class="realTimeBlock"></div>
        <button class="downloadCodeBut" onclick="download()">Download</button>
        </div>
        `;
        playRealtime(); //Entering RealTime Editing Mode
    }
}


//RealTime Editing (remixing)
cm.on("change", function () {
    if (realtime == true) {
        if (gist.type(fileName) == ".js") {
            eval(cm.getValue());
        } else {
            sandbox.innerHTML = cm.getValue();
            let arr = sandbox.getElementsByTagName('script')
            for (var n = 0; n < arr.length; n++) {
                eval(arr[n].innerHTML);
            }
        }
    }
});

function pauseRealtime() {
    let realTimeBlock = document.getElementById('realTime');
    realtime = false;
    realTimeBlock.innerHTML = `<span onclick="playRealtime()">Real Time: Off</span>`;
}

function playRealtime() {
    let realTimeBlock = document.getElementById('realTime');
    realtime = true;
    realTimeBlock.innerHTML = `<span onclick="pauseRealtime()">Real Time: On</span>`;
}


//Download File
function downloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function download() {
    downloadFile(fileName, cm.getValue());
}

//Local Storage
localStorage.setItem('gist', gistId);
localStorage.setItem('file', fileName);