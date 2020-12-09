
let div = document.createElement('div');
let elem = document.getElementById('contentcontainer');
div.className = "content";
div.innerHTML = "<h1>Content example inserted by external JS</h1>"

elem.append(div);