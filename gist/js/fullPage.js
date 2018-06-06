//Generating Frame
gist.load(gistId);

if (gistId && fileName) {
    if (gist.type(fileName) == ".js"){
        runFrame(`<script>${data.files[fileName].content}</script>`);
    } else if (gist.type(fileName) == ".css") {
        runFrame(`<style>${data.files[fileName].content}</style>`);
    } else {
        runFrame(data.files[fileName].content);
    }

} else {
    window.location = "/";
}

function runFrame(content){
    let iframe = document.getElementById("frame");
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(content);
    iframe.contentWindow.document.close();
}