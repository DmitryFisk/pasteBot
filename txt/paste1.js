const { Paste } = require("../Pasta.js");


module.exports = class extends Paste {
    data() {
        const name = "test";
        const desc = "test";
        const text = "iuegiodgdsghjisgsoigd";
        const image = "https://kifiles.cc/2.png";
        return name, desc, text, image;
    }

    constructor() {
        super({
            name: "2",
            desc: "2",
            text: "32",
            image: ""
        });
    }

   /* run(this.data = data) {
        this.name = data.name;
        this.desc = data.desc;
        this.text = data.text;
        this.image = data.image;
    }*/
}
