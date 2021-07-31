function genHTML(tag, id, c, text) {
    let create = document.createElement(tag);
    if (id) create.setAttribute('id', id);
    if (c) create.setAttribute('class', c);
    if (text) create.innerHTML = text;
    return create;
}

export default genHTML