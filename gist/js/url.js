//fetching data from URL
function urlParams() {
    let search = window.location.search.substr(1),
        result = {};
    if (search.length) {
        search.split('&').forEach(function (item) {
            let buf = item.split('=');
            if (buf.length == 2)
                result[buf[0]] = decodeURIComponent(buf[1]);
        });
    }
    return result;
}

let gistId = urlParams().gist;
let fileName = urlParams().file;