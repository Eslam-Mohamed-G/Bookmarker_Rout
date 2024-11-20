var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var markTrue = document.getElementById("true");
var markFalse = document.getElementById("false");
var urlTrue = document.getElementById("urltrue")
var urlFalse = document.getElementById("urlfalse");
var model = document.getElementById("model");
var x = document.getElementById("closeBtn");


var urlList = [];
if(localStorage.getItem("urlList") != null){
    urlList = JSON.parse(localStorage.getItem("urlList"));
    addToTable()
}
// validated bookmark
function bookmark() {
    var name = bookmarkName.value;
    if(name.length <= 1){
        bookmarkName.classList.add("form-control")
        bookmarkName.classList.remove("bookmark-danger");
        bookmarkName.classList.remove("bookmark-green");
        markTrue.style.display = "none";
        markFalse.style.display = "none";
        return false;
    }else if(name.length < 3){
        bookmarkName.classList.add("bookmark-danger")
        bookmarkName.classList.remove("bookmark-green");
        markFalse.style.display = "block";
        markTrue.style.display = "none";
        return false;
    }else {
        bookmarkName.classList.remove("bookmark-danger");
        bookmarkName.classList.add("bookmark-green");
        markTrue.style.display = "block";
        markFalse.style.display = "none";
        return true
    }
}
document.getElementById("bookmarkName").addEventListener("input", bookmark);
// validated bookmark

// validated URL
function validatedURL() {
    var url = bookmarkURL.value;
    // Regular Expression to validate URL  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    if(url.length < 3){
        bookmarkURL.classList.add("form-control")
        bookmarkURL.classList.remove("bookmark-danger");
        bookmarkURL.classList.remove("bookmark-green");
        urlFalse.style.display = "none";
        urlTrue.style.display = "none";
        return false;
    }else if (url && !urlPattern.test(url)) {
        bookmarkURL.classList.add("bookmark-danger")
        bookmarkURL.classList.remove("bookmark-green");
        urlFalse.style.display = "block";
        urlTrue.style.display = "none";
        return false;
    }else {
        bookmarkURL.classList.remove("bookmark-danger");
        bookmarkURL.classList.add("bookmark-green");
        urlTrue.style.display = "block";
        urlFalse.style.display = "none";
        return true;
    }
}
document.getElementById("bookmarkURL").addEventListener("input", validatedURL);
// validated URL


function submit() {
    var siteName = document.getElementById("siteName");
    var siteUrl = document.getElementById("siteUrl");
    siteUrl.classList.remove("hedden")
    siteName.classList.remove("hedden");
    var website = {
        name: bookmarkName.value,
        url: bookmarkURL.value
    }
    if( bookmark() && validatedURL() ){
        urlList.push(website);
        localStorage.setItem("urlList", JSON.stringify(urlList))
        addToTable()
        clearInput()
    }else {
        if(bookmark()){
            siteName.classList.add("hedden");
            siteUrl.classList.remove("hedden")
        }else if(validatedURL()){
            siteUrl.classList.add("hedden")
            siteName.classList.remove("hedden");
        }
        model.classList.remove("d-none");
    }
}

function addToTable() {
    var row = document.getElementById("tableContent").querySelector("tbody");
    var rowWebsite = "";

    for(i=0; i<urlList.length; i++){
        rowWebsite += 
        `
            <tr>
                <td>${i}</td>
                <td>${urlList[i].name}</td>              
                <td>
                  <button type="button" class="btn btn-success">
                    <a href="${urlList[i].url}" target="_blank"  class="link-underline">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </a>
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger" onclick="deleteRow(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr> 
        `
    }

    row.innerHTML = rowWebsite;
}

function deleteRow(index) {
    urlList.splice(index, 1);
    localStorage.setItem("urlList", JSON.stringify(urlList));
    addToTable();
    clearInput()
}

x.addEventListener("click", () => {
    model.classList.add("d-none");
});

function clearInput() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
    bookmarkName.classList.remove("bookmark-danger");
    bookmarkName.classList.remove("bookmark-green");
    bookmarkURL.classList.remove("bookmark-danger");
    bookmarkURL.classList.remove("bookmark-green");
    markFalse.style.display = "none";
    markTrue.style.display = "none";
    urlTrue.style.display = "none";
    urlFalse.style.display = "none";
}



window.onload = function() {
    clearInput()
}