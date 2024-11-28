const { app, BrowserWindow, screen } = require("electron")
const path = require("node:path")

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
            sandbox: false
        }
    })
    win.loadFile("index.html")
}

app.whenReady().then(() => {
    createWindow()
})

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit()
})