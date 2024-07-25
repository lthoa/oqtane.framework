var Oqtane = Oqtane || {};

Oqtane.RichTextEditor = {
    createQuill: async function (
        quillElement, toolBar, readOnly,
        placeholder, theme, debugLevel) {

        Quill.register('modules/blotFormatter', QuillBlotFormatter.default);
        Quill.register('modules/imagenote', ImageNote);

        var options = {
            debug: debugLevel,
            modules: {
                toolbar: {
                    container: toolBar,
                    handlers: {
                        image: {}
                    }
                },
                blotFormatter: {},
                imagenote: {
                    srcstartwidth: "/api/file/image/",
                    filehddenid: "image_fileid",
                    notehiddenid:"image_note"
                }
            },
            placeholder: placeholder,
            readOnly: readOnly,
            theme: theme
        };

        this.quill = new Quill(quillElement, options);        
    },
    getQuillContent: function (editorElement) {
        return JSON.stringify(this.quill.getContents());
    },
    getQuillText: function (editorElement) {
        return this.quill.getText();
    },
    getQuillHTML: function (editorElement) {
        return this.quill.root.innerHTML;
    },
    loadQuillContent: function (editorElement, editorContent) {
        return this.quill.root.innerHTML = editorContent;
    },
    enableQuillEditor: function (editorElement, mode) {
        this.quill.enable(mode);
    },
    getCurrentCursor: function (quillElement) {
        var editorIndex = 0;
        if (this.quill.getSelection() !== null) {
            editorIndex = this.quill.getSelection().index;
        }
        return editorIndex;
    },
    insertQuillImage: function (quillElement, imageURL, altText, editorIndex) {
        var Delta = Quill.import('delta');

        return this.quill.updateContents(
            new Delta()
                .retain(editorIndex)
                .insert({ image: imageURL },
                    { alt: altText }));
    }
};
