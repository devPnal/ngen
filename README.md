![image](https://github.com/devPnal/ngen/assets/102811808/868add77-6578-43ac-bcfd-aaa80d7a8ffb)

# Ngen
The simplest, most transparent WYSIWYG editor

## How to use?
1. Import `ngen.js`, `ngen.css` File to your project like `index.html` or below.
```
head: <link rel="stylesheet" href="ngen.css">
body: <script src="/ngen.js"></script>
```
2. Insert a div tag with the id `ngen-editor`.
```
<div id="ngen-editor"></div> 
```

Done! Now you can see the editor in your project.

![editor image](https://github.com/devPnal/ngen/assets/102811808/e515b97f-99a1-4bbb-8d30-fae0c1f50004)

3. You can get the HTML code of your text with the `getHTML` function.

For example, in index.html (the demo page):
```
<button type="button" onClick="alert(getHTML());">Get HTML!</button>
```

## Custom CSS
You can adjust its size or some styles via the `#ngen-editor` selector in any css file, see the style.css file.
```
<style.css in demo project>
background-color: #fff;
border: 1px solid #ccc;
border-radius: 4px;
height: 400px;
max-width: 720px;
margin: 20px auto;
```

## More options
Many other features can be implemented on your own based on Ngen (for example, fetching images after uploading them to the server instead of fetching them as Base64).

Ngen is the simplest version of a rich text editor, so you can implement complex features yourself.

## No tracker
It doesn't have any trackers like Google analytics. So you can use it **CARELESS.**
