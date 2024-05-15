var CS = CS || {};

CS.RichTextEditor = {
    getCurrentCursor: function (quillElement, html) {
        var Delta = Quill.import('delta');
        editorIndex = 0;
        if (quillElement.__quill.getSelection() !== null) {
            editorIndex = quillElement.__quill.getSelection().index;
        }
        return editorIndex;
    },
    insertQuillImage: function (quillElement, imageURL, altText, editorIndex) {
        var Delta = Quill.import('delta');
        return quillElement.__quill.updateContents(
            new Delta()
                .retain(editorIndex)
                .insert({ image: imageURL }, { alt: altText }));
    }
};
