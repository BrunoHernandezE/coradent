const { app, BrowserWindow, screen, ipcMain } = require("electron")
const path = require("node:path")
const fs = require("fs")
const { google } = require("googleapis")

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


// ipcMain.on("create-record", (event, name) => {
//     const basePath = path.join(__dirname, "examples");
//     const carpetaPath= path.join(basePath, name);

//     try {
//         if(!fs.existsSync(carpetaPath)) {
//             fs.mkdirSync(carpetaPath)
//             console.log(`Carpeta "${name}" creada con éxito.`);

//         } else {
//             console.log(`La carpeta "${name}" ya existe.`);
//         }
        
//     } catch (error) {
//         console.error(`Error al crear la carpeta:`, error);
//     }

// })


ipcMain.handle("create-folder", async (event, folderName) => {
    try {
        const response = await drive.files.create({
            resource: {
                name: folderName,
                mimeType: "application/vnd.google-apps.folder"
            },
            fields: "id"
        })
        const folderId = response.data.id
        return { success: true, id: folderId }
    } catch (error) {
        console.error("error al crear la carpeta:", error.response?.data || error.message)
        return { success: false, message: error.message}
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

listFiles();


async function createFolder(folderName, parentFolderId = null) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'),
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: ["1r1D96SKsIRuLc_CtcFbOmvnTBR7esAxi"]
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
}

// Llamada al método
createFolder('fedelobo').then((folderId) => {
    console.log('Nueva carpeta creada con ID:', folderId);
}).catch((error) => {
    console.error('Hubo un problema al crear la carpeta:', error);
});




app.whenReady().then(() => {
    createWindow()
})

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit()
})