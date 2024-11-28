const { contextBridge } = require("electron")
const autocompleter = require("autocompleter")


console.log("some")
contextBridge.exposeInMainWorld("libs", {
    autocompleter: autocompleter
})
