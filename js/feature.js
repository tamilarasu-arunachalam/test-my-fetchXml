var testBtn = document.getElementById("testBtn");
var orgUrl = document.getElementById("orgUrl");
var entityName = document.getElementById("entityName");
var fetchXmlQuery = document.getElementById("fetchXmlQuery");

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#creditYear").textContent = new Date().getFullYear();
});

var editor = CodeMirror.fromTextArea(document.getElementById("fetchXmlQuery"), {
    mode: "application/xml",
    lineNumbers: true,
    theme: "default"
});

if (localStorage.getItem("orgUrl") !== null) {
    orgUrl.value = localStorage.getItem("orgUrl");
}

// set plural name
setInterval(function() {
    var parser, xmlParse;
    parser = new DOMParser();
    let onlyXml = editor.getValue();
    xmlParse = parser.parseFromString(onlyXml, "text/xml");
    var node = xmlParse.getElementsByTagName("entity")[0];
    var attr = node.attributes[0];
    var entity = attr.value;
    var lastChar = entity.charAt(entity.length - 1);
    getPlural(lastChar, entity);
}, 2000);

//on click of test fetch xml button
function testOnClick() {
    if (orgUrl.value === '') {
        alert("Please enter Organization URL");
    } else {
        testBtn.setAttribute("href", orgUrl.value + "/api/data/v9.2/" + entityName.value + "?fetchXml=" + fetchXmlQuery.value.replaceAll('\n', '').replace(/>\s*/g, '>').replace(/\s*</g, '<'));
        testBtn.setAttribute("target", "_blank");
    }
}

// get plural name of the entity 
function getPlural(lastChar, entity) {
    switch (lastChar) {
        case 'x':
        case 's':
            entityName.value = entity + "es";
            break;
        case 'y':
            var pref = entity.substring(0, entity.length - 1);
            entityName.value = pref + "ies";
            break;
        default:
            entityName.value = entity + "s";
            break;
    }
}

function addOrgToLocalStorage() {
    if (orgUrl.value.length === 0)
        return;
    if (isValidURL(orgUrl.value)) {
        var url = new URL(orgUrl.value);
        orgUrl.value = url.origin;
        localStorage.setItem("orgUrl", orgUrl.value);
    } else {
        alert("Please enter a valid URL.");
    }
};

function isValidURL(str) {
    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}
