let toolbox = createElementWithId("form", "ngen-toolbox");
let writebox = createElementWithId("iframe", "ngen-writebox");
writebox.setAttribute("name", "ngenFrame");
writebox.setAttribute("src", "about:blank");


toolbox.append(createButtonWithCmd("bold", "B"));
toolbox.append(createButtonWithCmd("italic", "I"));
toolbox.append(createButtonWithCmd("underline", "U"));
toolbox.append(createButtonWithCmd("strike", "S"));

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
    letter = document.createElement(_letter);
    letter.innerHTML = _letter;
    newBtn.append(letter)
    return newBtn;
}

document.getElementById("ngen-toolbox").addEventListener("click", async(e) =>  {
    const cmd = e.target.closest("button").getAttribute("tool-cmd");
    ngenFrame.document.execCommand(cmd, false, null);
    console.log(getHTML());
});

function getHTML() {
    let result = "";
    result = ngenFrame.document.body.innerHTML.replace(/<div>/g, "<p>").replace(/<\/div>/g, "</p>")
    result = result.replace(/<br><\/p>$/g, "</p>")
    result = result.replace(/<p><br><\/p>/g, "<br>")
    result = result.replace(/<\/p><p>/g, "<br>")
    result = result.replace(/<\/p><br><p>/g, "<\/p><p>")
    result = result.replace(/<\/p>((<br>)+)<br><p>/g, "<\/p>$1<p>")

    return result;
}