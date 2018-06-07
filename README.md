# GistFiddle

GistFiddle is a small JavaScript library that allows you to load and run Gists online.

Visit [GistFiddle Website](http://gistfiddle.online/)

This repo contains:
  - GistFiddle.js - Our JS Framework
  - GistFiddle Website - Our platform where you can run and test gists online
  - Chrome Extension - Example project that loads a code from  your Gist

# Features

  - Load HTML, CSS, JS gists directly to your project
  - Run your code (gists) online using our website
  - Sandbox mode for your code, collaborate with others
  - Full Page Mode - no logos or other distractions, just your code


What is a Gist? [Click Here](https://help.github.com/articles/about-gists/) to learn more.

### Tech

GistFiddle uses a number of open source projects to work properly:

* [CodeMirror] - a versatile text editor implemented in JavaScript for the browser
* [MomentJs] - JavaScript dates library.
* [jQuery] - external library for our SanBox.
* [GistFiddle.Js] - duh.

And of course, GistFiddle itself is open source with a public repository
on GitHub.

### How it works

GistFiddle uses [GitHub API](https://developer.github.com/v3/gists/) to load Gists. 
Means your code is safely hosted on your GitHub profile.

### Development

Want to contribute or make your own project? Great!

To run a Gist online, simply use:

```javascript
gist.run("<id>", "<fileName>");
```
Note: replace "id" with your Gist Id and "fileName" with your file name.

You can also load the whole page using components like this:

```javascript
gist.run("<id>", "<fileName>.css");
gist.run("<id>", "<fileName>.html");
gist.run("<id>", "<fileName>.js");
```

To get a data from a Gist simply use:
```javascript
gist.load("<id>");
```
Note: replace "id" with your Gist Id
From that point, you will be able to call the "**data**" variable:

```javascript
console.log(data);
```

You can also pass Gist data straight into your function:
```javascript
    let dataFunction = (response) => {
        console.log(response);
    }
```

To check file extension use:

```javascript
gist.type("<fileName>");
```


License
----

MIT, Created by Arthur James (Arti_Djeims)


**Free Software, Rocks!**


   [GistFiddle.Js]: <https://github.com/ArtiDjeims/GistFiddle/>
   [jQuery]: <http://jquery.com>
   [CodeMirror]: <https://codemirror.net>
   [MomentJs]: <http://momentjs.com>

