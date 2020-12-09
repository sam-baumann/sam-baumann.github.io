
let div = document.createElement('div');
let internals = document.createElement('div');
let img = document.createElement('img');
let p = document.createElement('p');
let elem = document.getElementById('contentcontainer');
//open the blogposts.json file
//this seems like a mess, but I can't find a better way to do this
var rawFile = new XMLHttpRequest();
rawFile.open("GET", "./blogposts.json", false);
rawFile.onreadystatechange = function ()
{
    if(rawFile.readyState === 4)
    {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
            var allText = rawFile.responseText;
            var data = JSON.parse(allText);
        }
    }
}
rawFile.send(null);

console.log(data.image);
div.className = "content";
div.innerHTML = "<h1>Content example inserted by external JS</h1>"
internals.className = "internalcontent";
img.src = "images/flash01.jpeg";
p.innerHTML = "This is example text";
internals.append(img);
internals.append(p);

div.append(internals);
elem.append(div);