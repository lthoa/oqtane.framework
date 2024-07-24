class ImageNote {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.editcontainer = document.getElementById(options.containerid);
        this.fileid = document.getElementById(options.hddenid);
        this.srcstartwidth = options.srcstartwidth;
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

        
        // editor
        //this.editcontainer.classList.remove('disabled');
       // this.editcontainer.classList.add('show');

        // blot-formatter__toolbar
        var blot_toolbar = document.getElementsByClassName("blot-formatter__toolbar");
        if (blot_toolbar && blot_toolbar.length > 0) {
            var btn = document.createElement("div");
            btn.classList.add("btn");
            btn.classList.add("btn-light");
            btn.classList.add("btn-active-light-primary");
            btn.classList.add("ql-edit-imgnote");
            btn.addEventListener("click", this.go);

            var text = document.createTextNode("Edit Image Note");
            btn.appendChild(text);

            blot_toolbar[0].appendChild(btn);
        }
        else {
            alert('no');
        }

    };

    go = () => {
        this.fileid.dispatchEvent(new Event('change'));
    };
    hide = () => {
        this.img.classList.remove('highlight');
        this.img = undefined;     

        // editor
        ///this.editcontainer.classList.remove('disabled');
       // this.editcontainer.classList.add('disabled');
    };
}