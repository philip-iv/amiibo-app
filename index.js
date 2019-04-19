
function addShelf() {
    var shelfCount = $(".shelf").length;
    container = $("#shelf-container");
    newShelf = $(document.createElement('div'))
        .addClass('shelf')
        .attr('id', 'shelf-'+(shelfCount));
    container.append(newShelf);
}

function postLoad() {
    amiibo = $(".amiibo");
    amiiboOptions = $(".amiibo-options");

}

$(document).ready(postLoad);