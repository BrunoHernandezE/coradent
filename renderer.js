// Search

let datas = [
    { label: "Reino Unido", value: "UK" },
    { label: "Mexico", value: "MX" },
    { label: "Estados Unidos", value: "EEUU" }

]

const autocomplete = window.libs.autocompleter

let input = document.getElementById("search-input")

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

