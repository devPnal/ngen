let toolbox = createElementWithId("form", "ngen-toolbox");
let writebox = createElementWithId("iframe", "ngen-writebox");
writebox.setAttribute("name", "ngenFrame");
writebox.setAttribute("src", "about:blank");

tool1 = createElementWithId("div", "ngen-tool1");
tool2 = createElementWithId("div", "ngen-tool2");
tool3 = createElementWithId("div", "ngen-tool3");
tool4 = createElementWithId("div", "ngen-tool4");
tool5 = createElementWithId("div", "ngen-tool5");

tool1.append(createButtonWithCmd("h1", "H1"));
tool1.append(createButtonWithCmd("h2", "H2"));
tool1.append(createButtonWithCmd("h3", "H3"));
tool1.append(createButtonWithCmd("p", "x"));
tool2.append(createStyleButtonWithCmd("bold", "B"));
tool2.append(createStyleButtonWithCmd("italic", "I"));
tool2.append(createStyleButtonWithCmd("underline", "U"));
tool2.append(createStyleButtonWithCmd("strikeThrough", "S"));
tool3.append(createButtonList("insertUnorderedList", "•≡"));
tool3.append(createButtonList("insertOrderedList", "1≡"));
tool4.append(createButtonImage("insertImage", "🖼️"));
tool5.append(createButtonLink("insertLink", "🔗"));

toolbox.append(tool1)
toolbox.append(tool2)
toolbox.append(tool3)
toolbox.append(tool4)
toolbox.append(tool5)

document.getElementById("ngen-editor").append(toolbox);
document.getElementById("ngen-editor").append(writebox);
ngenFrame.document.designMode = "On";
ngenFrame.document.open();
ngenFrame.document.write("<br>");
ngenFrame.document.close();

imageBox = createElementWithId("div", "ngen-image-box");
imageBox.innerHTML = "<input type='file' id='ngen-image-source' name='ngen-image-source' placeholder='Please select a image'><button type='button' id='ngen-insert-image' name='ngen-insert-image' disabled=true>Done</button>";
toolbox.append(imageBox)

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

function createButtonList(_cmd, _letter) {
    newBtn = document.createElement("Button");
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("tool-cmd", _cmd);
    letter = document.createElement("div");
    letter.innerHTML = _letter;
    newBtn.append(letter)
    return newBtn;
}

function createButtonImage(_cmd, _letter) {
    newBtn = document.createElement("Button");
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("tool-cmd", _cmd);
    letter = document.createElement("div");
    letter.innerHTML = _letter;
    newBtn.append(letter)
    return newBtn;
}

function createButtonLink(_cmd, _letter) {
    newBtn = document.createElement("Button");
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("tool-cmd", _cmd);
    letter = document.createElement("div");
    letter.innerHTML = _letter;
    newBtn.append(letter)
    return newBtn;
}

tool1.addEventListener("click", async(e) => {
    const cmd = e.target.closest("button").getAttribute("tool-cmd");
    ngenFrame.document.execCommand("formatBlock", false, "<" + cmd + ">");
    console.log(getHTML());
});

tool2.addEventListener("click", async(e) => {
    const cmd = e.target.closest("button").getAttribute("tool-cmd");
    ngenFrame.document.execCommand(cmd, false, null);
    console.log(getHTML());
});

tool3.addEventListener("click", async(e) => {
    const cmd = e.target.closest("button").getAttribute("tool-cmd");
    ngenFrame.document.execCommand(cmd, false, null);
    console.log(getHTML());
});

tool4.addEventListener("click", async(e) => {
    if (imageBox.style.display == "inline-grid")
        imageBox.style.display = "";
    else
        imageBox.style.display = "inline-grid";
});

ngenFrame.addEventListener("click", async(e) => {
    imageBox.style.display = "";
});

let tempImageStorage = "";
document.getElementById("ngen-image-source").addEventListener("change", async(e) => {
    document.getElementById("ngen-insert-image").disabled = false;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        tempImageStorage = reader.result
    }
})

document.getElementById("ngen-insert-image").addEventListener("click", async(e) => {
    document.getElementById("ngen-insert-image").disabled = true;
    document.getElementById("ngen-image-source").value = "";
    ngenFrame.document.execCommand("insertImage", false, tempImageStorage);
    tempImageStorage = "";
})

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