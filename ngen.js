let toolbox = createElementWithId("form", "ngen-toolbox");
let writebox = createElementWithId("iframe", "ngen-writebox");
writebox.setAttribute("name", "ngenFrame");
writebox.setAttribute("src", "about:blank");

tool1 = createElementWithId("div", "ngen-tool1");
tool2 = createElementWithId("div", "ngen-tool2");

tool1.append(createButtonWithCmd("h1", "H1"));
tool1.append(createButtonWithCmd("h2", "H2"));
tool1.append(createButtonWithCmd("h3", "H3"));
tool1.append(createButtonWithCmd("p", "x"));
tool2.append(createStyleButtonWithCmd("bold", "B"));
tool2.append(createStyleButtonWithCmd("italic", "I"));
tool2.append(createStyleButtonWithCmd("underline", "U"));
tool2.append(createStyleButtonWithCmd("strikeThrough", "S"));

toolbox.append(tool1)
toolbox.append(tool2)

document.getElementById("ngen-editor").append(toolbox);
document.getElementById("ngen-editor").append(writebox);
ngenFrame.document.designMode = "On";

ngenFrame.document.open();
ngenFrame.document.write("<br>");
ngenFrame.document.close();

function createElementWithId(_type, _id) {
    newDiv = document.createElement(_type);
    newDiv.setAttribute("id", _id);
    return newDiv;
}

function createButtonWithCmd(_cmd, _letter) {
    newBtn = document.createElement("Button");
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("tool-cmd", _cmd);
    letter = document.createElement("b");
    letter.innerHTML = _letter;
    newBtn.append(letter)
    return newBtn;
}

function createStyleButtonWithCmd(_cmd, _letter) {
    newBtn = document.createElement("Button");
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("tool-cmd", _cmd);
    letter = document.createElement(_letter);
    letter.innerHTML = _letter;
    newBtn.append(letter)
    return newBtn;
}

tool1.addEventListener("click", async(e) =>  {
    const cmd = e.target.closest("button").getAttribute("tool-cmd");
    ngenFrame.document.execCommand("formatBlock", false, "<" + cmd + ">");
    console.log(getHTML());
});

tool2.addEventListener("click", async(e) =>  {
    const cmd = e.target.closest("button").getAttribute("tool-cmd");
    ngenFrame.document.execCommand(cmd, false, null);
    console.log(getHTML());
});

toolbox
function getHTML() {
    let result = "";
    result = ngenFrame.document.body.innerHTML.replace(/<div>/g, "<p>").replace(/<\/div>/g, "</p>")
    result = result.replace(/<br><\/p>$/g, "</p>")
    result = result.replace(/<p><br><\/p>/g, "<br>")
    result = result.replace(/<\/p><p>/g, "<br>")
    result = result.replace(/<\/p><br><p>/g, "</p><p>")
    result = result.replace(/<\/p>((<br>)+)<br><p>/g, "</p>$1<p>")
    result = result.replace(/<\/p><br>$/g, "</p>")

    return result;
}