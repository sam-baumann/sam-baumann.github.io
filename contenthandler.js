
let elem = document.getElementById('contentcontainer');
//open the blogposts.json file
//this seems like a mess, but I can't find a better way to do this
var rawFile = new XMLHttpRequest();
var data;
rawFile.open("GET", "https://raw.githubusercontent.com/sam-baumann/sam-baumann.github.io/main/blogposts.json", false);
rawFile.onreadystatechange = function ()
{
    if(rawFile.readyState === 4)
    {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
            var allText = rawFile.responseText;
            data = JSON.parse(allText);
        }
    }
}
rawFile.send(null);

let j = 0;
if (data.content.length - 10 > j) j = data.content.length - 10;

var i;
for (i = data.content.length - 1; i >= j; i--){
    let div = document.createElement('div');
    let internals = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');

    div.className = "content";
    internals.className = "internalcontent";

    div.innerHTML = "<h1>" + data.content[i].heading + "</h1> <span class = \"date\">" + data.content[i].date + "</span>";
    
    img.src = data.content[i].image;
    p.innerHTML = data.content[i].text;

    internals.append(img);
    internals.append(p);

    div.append(internals);
    elem.append(div);
}