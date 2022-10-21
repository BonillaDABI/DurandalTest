const HandyStorage = require("handy-storage");

const storage = new HandyStorage({
    beautify: true
});

storage.connect("./state.json")

module.exports = storage;