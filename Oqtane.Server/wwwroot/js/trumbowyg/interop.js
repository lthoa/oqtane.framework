var Clicksoft = Clicksoft || {};

Clicksoft.TrumbowygEditor = {
    createTrumbowyg: async function (divElement) {
        //divElement.trumbowyg();
        $('#aa').trumbowyg();
        alert(divElement);
    },
    getQuillContent: function (editorElement) {
        return JSON.stringify(editorElement.__quill.getContents());
    },
    getQuillText: function (editorElement) {
        return editorElement.__quill.getText();
    },
    getQuillHTML: function (editorElement) {
        return editorElement.__quill.root.innerHTML;
    },
    loadQuillContent: function (editorElement, editorContent) {
        return editorElement.__quill.root.innerHTML = editorContent;
    },
    enableQuillEditor: function (editorElement, mode) {
        editorElement.__quill.enable(mode);
    },
    insertQuillImage: function (quillElement, imageURL, altText) {
        var Delta = Quill.import('delta');
        editorIndex = 0;

        if (quillElement.__quill.getSelection() !== null) {
            editorIndex = quillElement.__quill.getSelection().index;
        }

        return quillElement.__quill.updateContents(
            new Delta()
                .retain(editorIndex)
                .insert({ image: imageURL },
                    { alt: altText }));
    }
};
