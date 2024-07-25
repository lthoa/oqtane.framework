class ImageNote {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.srcstartwidth = options.srcstartwidth;
        this.fileid = document.getElementById(options.filehddenid);
        this.noteid = document.getElementById(options.notehiddenid);

        this.noteid.addEventListener("change", this.setNote);
        this.quill.root.addEventListener('click', this.handleClick, false);
    }
    
    handleClick = (evt) => {
        if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IMG') {
            if (this.img === evt.target) {
                // we are already focused on this image
                return;
            }
            if (this.img) {
                // we were just focused on another image
                this.hide();
            }
            // clicked on an image inside the editor
            this.show(evt.target);
        } else if (this.img) {
            // clicked on a non image
            this.hide();
        }
    };

    show = (img) => {
        this.img = img;

        // get fileid
        var src = this.img.src;
        var index = src.indexOf(this.srcstartwidth);        
        if (index != -1) {
            var arr = src.substring(index + this.srcstartwidth.length).split('/');
            if (arr.length > 0) {
                this.fileid.value = arr[0];
            }
        }
        else {
            this.fileid.value = 0;
        }
        
        // blot-formatter__overlay
        var overlay = document.getElementsByClassName("blot-formatter__overlay");
        if (overlay && overlay.length > 0)
        {
            if (!this.editor) {
                var div = document.createElement("div");
                div.classList.add("ql-edit-imgnote");

                this.editor = document.createElement("span");
                this.editor.classList.add("fs-6");
                this.editor.classList.add("me-2");
                
                var btn = document.createElement("a");
                btn.classList.add("btn");
                btn.classList.add("btn-active-light-primary");                
                btn.addEventListener("click", this.go);
                btn.innerHTML = "Edit";
                                
                div.appendChild(this.editor);
                div.appendChild(btn);
                overlay[0].appendChild(div);
            }
            this.editor.innerHTML = this.img.alt;
        }
        else {
            alert('no');
        }

    };

    go = () => {
        this.fileid.dispatchEvent(new Event('change'));        
    };
    setNote = () => {
        this.img.alt = CS.quill.imgnote;
        this.editor.innerHTML = this.img.alt;
    };
    hide = () => {
        this.img = undefined;
    };
}

var CS = CS || {};
CS.quill =
{
    imgnote:"",
    setImageNote: function (element, note) {
        CS.quill.imgnote = note;

        if (element !== null) {
            element.dispatchEvent(new Event('change'));
        }
    }
};
