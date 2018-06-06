//Created by Arthur James (Arti_Djeims)


/* GistFiddle */

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


/* HTML */

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
    <div class="fb-comments" data-numposts="5" data-width="100%" 	
data-colorscheme="light"></div>
</div>
    </div>
`;


/* Code Editor */

//CodeMirror
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


/* SandBox */

//Loading SandBox
codeAction.hide();
sandbox.innerHTML = `<iframe class="frame" frameborder="no" scrolling="no" src="../index.html?gist=${gistId}&file=${fileName}"></iframe>`;


//Remixing Code
let realtime = false;

function remix() { //Entering Editing Mode
    let remixedCode = cm.getValue();

    if (gist.type(fileName) == ".js") {
        runFrame(`
            <script src="../GistFiddle.js"></script>
            <script>${data.files[fileName].content}</script>
        `);
    } else if (gist.type(fileName) == ".css") {
        runFrame(`<style>${remixedCode}</style>`);
    } else {
        runFrame(remixedCode);
    }

    remixBlock.innerHTML = `
        <span class="left">Editing Mode</span>
        <div class="remixActions right">
        <div id="realTime" class="realTimeBlock"></div>
        <button class="downloadCodeBut" onclick="download()">Download</button>
        </div>
        `; //Generating Remix menu

    playRealtime(); //Entering RealTime Editing Mode
}

function runFrame(content) {
    sandbox.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.className = "frame";
    document.getElementById("sandboxFrame").appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(content);
    iframe.contentWindow.document.close();
}


//RealTime Editing (remixing)
cm.on("change", function () {
    if (realtime == true) {
        if (gist.type(fileName) == ".js") {
            runFrame(`<script>${cm.getValue()}</script>`);
        } else if (gist.type(fileName) == ".css") {
            runFrame(`<style>${cm.getValue()}</style>`);
        } else {
            runFrame(cm.getValue());
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


/* Downloads */

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


/* Local Storage */

//Saving Gist Id and FileName
localStorage.setItem('gist', gistId);
localStorage.setItem('file', fileName);