let datas = [
    { label: "Reino Unido", value: "UK" },
    { label: "Mexico", value: "MX" },
    { label: "Estados Unidos", value: "EEUU" }

]

const autocomplete = window.libs.autocompleter

const input = document.getElementById("search-input")
const addPatient = document.getElementById("add-record")
autocomplete({
    input: input,
    fetch: function(text, update) {
        text = text.toLowerCase()
        let suggestions = datas.filter((n) =>
            n.label.toLowerCase().startsWith(text)
        )
        update(suggestions)
    },
    onSelect: function(item) {
        input.value = item.label
    }
})



addPatient.addEventListener("click", async() => {
    const folderName = input.value.trim()
    const statusElement = document.getElementById("status")


    if(!folderName) {
        statusElement.textContent = "Por favor, ingresa un nombre para la carpeta"
        return
    }
    statusElement.textContent = "Creando carpeta..."

    const result =  await window.func.createFolder(folderName)


    console.log("Resultado perro", result);
    
    if(result) {
        statusElement.textContent = `Registro creado correctamente: ${folderName}`
    } else {
        statusElement.textContent = `Error al crear la carpeta, ID:${result.id}`
    }

})


// addPatient.addEventListener("click", () => {
//     window.func.navigateTo()
// })