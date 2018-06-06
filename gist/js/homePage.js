//Generating Links
function run() {
    let gist = document.getElementById("gist").value;
    let file = document.getElementById("file").value;
    window.location = `gist/sandbox/index.html?gist=${gist}&file=${file}`;
}

function openLastGist() {
    let lastGist = localStorage.getItem('gist');
    let lastFile = localStorage.getItem('file');
    if (lastGist && lastFile) {
        window.location = `gist/sandbox/index.html?gist=${lastGist}&file=${lastFile}`;
    } else {
        alert("You haven't open any Gists lately!")
    }
}

function createNewGist() {
    window.open('https://gist.github.com/', '_blank');
}

function aboutGistFiddle() {
    window.open('https://github.com/ArtiDjeims/GistFiddle/blob/master/README.md', '_blank');
}
