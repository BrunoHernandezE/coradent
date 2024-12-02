const { contextBridge, ipcRenderer } = require("electron")
const autocompleter = require("autocompleter")


const nombres = ['Carpeta1', 'Carpeta2', 'Carpeta3'];

contextBridge.exposeInMainWorld("func", {
    createRecord: (name) => ipcRenderer.send("create-record", name),
    createFolder: (folderName) => ipcRenderer.invoke("create-folder", folderName)
})

contextBridge.exposeInMainWorld("libs", {
    autocompleter: autocompleter,
    
})
