// set plural name
setInterval(function () {
    var parser, xmlParse;
    var fetchXmlQuery = document.getElementById("fetchXmlQuery").innerText.replaceAll('\n', '');
    parser = new DOMParser();
    xmlParse = parser.parseFromString(fetchXmlQuery, "text/xml");
    var node = xmlParse.getElementsByTagName("entity")[0];
    var attr = node.attributes[0];
    var entity = attr.value;
    var lastChar = entity.charAt(entity.length - 1);
    getPlural(lastChar, entity);
}, 2000);

//on click of test fetch xml button
function testOnClick() {
    var testBtn = document.getElementById("testBtn");
    var orgUrl = document.getElementById("orgUrl").value;
    var entityName = document.getElementById("entityName").value;
    if (orgUrl === '') {
        alert("Please enter Organization URL");
    } else {
        var fetchXmlQuery = document.getElementById("fetchXmlQuery").innerText.replaceAll('\n', '');
        testBtn.setAttribute("href", orgUrl + "api/data/v9.2/" + entityName + "?fetchXml=" + fetchXmlQuery);
        testBtn.setAttribute("target", "_blank");
    }
}

// get plural name of the entity 
function getPlural(lastChar, entity) {
    var entityName = document.getElementById("entityName");
    switch (lastChar) {
        case 'y':
            var pref = entity.substring(0, entity.length - 1);
            entityName.value = pref + "ies";
            break;
        default:
            entityName.value = entity + "s";
            break;
    }
}