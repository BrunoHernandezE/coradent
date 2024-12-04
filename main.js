const { app, BrowserWindow, screen, ipcMain } = require("electron")
const path = require("node:path")
const fs = require("fs")
const { google } = require("googleapis")
const { PDFDocument } = require('pdf-lib');
const SignaturePad = require("signature_pad")


const SERVICE_ACCOUNT_FILE = path.join(__dirname, "credentials.json")

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'credentials.json'), // Ruta al archivo JSON
    scopes: ['https://www.googleapis.com/auth/drive'], // Alcance necesario
});

const drive = google.drive({version:"v3", auth})


let mainWindow

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
                // sandbox: false
        }
    })
    
    mainWindow.loadFile("index.html")


}


ipcMain.on("create-record", (event, name) => {
    const basePath = path.join(__dirname, "examples");
    const carpetaPath= path.join(basePath, name);

    try {
        if(!fs.existsSync(carpetaPath)) {
            fs.mkdirSync(carpetaPath)
            console.log(`Carpeta "${name}" creada con éxito.`);

        } else {
            console.log(`La carpeta "${name}" ya existe.`);
        }
        
    } catch (error) {
        console.error(`Error al crear la carpeta:`, error);
    }
})



ipcMain.handle('init-signature', async (event, canvasId) => {
    return `Canvas ${canvasId} listo para SignaturePad.`;
  });   

ipcMain.handle("create-folder", async (event, folderName, parentFolderId=null) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'),
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: ["1USDR_PtkXgxMBr72h8J8t_VqMhVH8Ng3"]
        };

        if (parentFolderId) {
            fileMetadata.parents = [parentFolderId];
        }

        const response = await drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });

        console.log('Carpeta creada, ID:', response.data.id);
        return response.data.id;
    } catch (error) {
        console.error('Error al crear la carpeta:', error.response?.data || error.message);
        throw error; // Lanza el error para que puedas manejarlo en la UI si es necesario
    }
})

ipcMain.on("navigate-to", (event, targetPage) => {

    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
                // sandbox: false
        }

    })
    newWindow.loadFile(path.join(__dirname, "views", "signature.html"))
    //mainWindow.loadFile(path.join(__dirname, "views", "form.html"));
})

ipcMain.on("list-folders", (event, foldersPath) => {
    try {
        // Leer el contenido de la ruta
        const contenido = fs.readdirSync(foldersPath, { withFileTypes: true });
      
        // Filtrar para obtener solo carpetas
        const carpetas = contenido
          .filter(item => item.isDirectory()) // Verifica si es una carpeta
          .map(item => item.name);           // Obtén solo los nombres
      
        console.log('Carpetas encontradas:', carpetas);
      } catch (error) {
        console.error('Error al leer la ruta:', error.message);
      }
})




async function listFiles() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'),
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const response = await drive.files.list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        });

        console.log('Archivos:');
        response.data.files.forEach((file) => {
            console.log(`${file.name} (${file.id})`);
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

//listFiles();




app.whenReady().then(() => {
    createWindow()
})

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit()
})