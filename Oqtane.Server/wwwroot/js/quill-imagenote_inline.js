class ImageNote {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.editcontainer = document.getElementById(options.containerid);
        this.fileid = document.getElementById(options.hddenid);
        this.srcstartwidth = options.srcstartwidth;
        this.quill.root.addEventListener('click', this.handleClick, false);
    }

    buildNote = () => {

    };
    
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
       // this.img.classList.add('highlight');
        
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
        var formatter = document.getElementsByClassName("blot-formatter__overlay");
        if (formatter && formatter.length > 0)
        {
            if (!this.editor)
            {
                var div = document.createElement("div");
                div.classList.add("ql-edit-imgnote");

                var floating = document.createElement("div");
                floating.classList.add("form-floating");

                this.editor = document.createElement("textarea");
                this.editor.classList.add("form-control");
                //this.editor.classList.add("h-100px");

                var label = document.createElement("label");
                label.innerText = "Chú thích";
                
                div.appendChild(floating);
                floating.appendChild(this.editor);
                floating.appendChild(label);
                formatter[0].appendChild(div);
            }

            this.editor.value = this.img.alt;

            //div.addEventListener("click", this.go);
            //var text = document.createTextNode("Edit Image Note");

        }
        else {
            alert('no');
        }

    };

    go = () => {
        this.fileid.dispatchEvent(new Event('change'));
    };
    hide = () => {
        var s1 = this.img.alt + "";
        var s2 = this.editor.value + "";
        if (s1 !=s2) {
            this.img.alt = this.editor.value;
            console.log('node changed');
        }

        this.img = undefined;
    };
}