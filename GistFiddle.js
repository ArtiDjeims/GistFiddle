/*
Copyright 2018 Arthur James (Arti_Djeims)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name(s) of the above copyright holders shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization.
*/
let data;
let gist = {
    load: (id) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/gists/' + id, false);
        xhr.onload = function () {
            if (this.status === 200) {
                let response = JSON.parse(xhr.responseText);
                data = response;
                if (typeof dataFunction == 'function') {
                    dataFunction(response);
                }
            }
        };
        xhr.send();
    },
    type: (file) => {
        let filePattern = /\.[0-9a-z]{1,5}$/i;
        if((file).match(filePattern)) {
            let fileFormat = (file).match(filePattern)[0];
            return fileFormat;
        }
    },
    run: (id, file) => {
        gist.load(id);
        if (gist.type(file) == ".js") {
            eval(data.files[file].content);
        } else if (gist.type(file) == ".css") {
            document.write(`<style>${data.files[file].content}</style>`);
        } else {
            document.write(data.files[file].content);
        }
    }
}