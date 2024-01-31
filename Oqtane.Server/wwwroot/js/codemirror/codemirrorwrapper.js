window.codemirror = {
    create: function (textArea) {

        textArea.codeMirrorObj = CodeMirror.fromTextArea(textArea, {
            mode: 'application/ld+json',
            matchBrackets: true,
            autoCloseBrackets: true,
            indentWithTabs: true,
            lineNumbers: true,
            autofocus: true,
            styleActiveLine: true,
            readOnly: false,
            autoCloseBrackets: true,
            foldGutter: true,
            height: 'auto',
            width: 'auto',
        })

        return new Promise(() => { });
    },
    getCode: function (textArea) {
        return textArea.codeMirrorObj.getValue();
    }
};
