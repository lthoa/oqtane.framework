var CS = CS || {};

CS.RichTextEditor = {    
    insertQuillImage: function (elementId, imageURL, altText, editorIndex) {        
        var element = document.getElementById(elementId);
        if (element !== null) {
            var Delta = Quill.import('delta');
            return quillElement.__quill.updateContents(
                new Delta()
                    .retain(editorIndex)
                    .insert({ image: imageURL }, { alt: altText }));
        }
    }
};
