class Paste {
    constructor(data) {
        this.name = data.name || "No name";
        this.desc = data.desc || "No desc";
        this.text = data.text || "No text";
        this.image = data.image || null;
    }
    run(data) {
        console.log("${this.name} doesn't importing class Pasta.js")
    }
}
module.exports = { Paste }
