if (gistId && fileName) {
    document.body.innerHTML = '';
    gist.run(gistId, fileName);
} else {
    window.location = "/";
}