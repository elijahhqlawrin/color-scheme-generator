const baseUrl = "https://www.thecolorapi.com"
let colorInput = document.getElementById('color-input')
let modeSelect = document.getElementById('mode-select')
const getColorsBtn = document.getElementById('get-colors-btn')
const themeToggle = document.getElementById('theme-toggle')
const colorPalette = document.getElementById('color-palette')
const copiedNotice = document.getElementById('copied-notice')
const bodyEl = document.getElementById('body-el')

let colorSeed = colorInput.value
let schemeMode = modeSelect.value

// Assign colorSeed with user's input color.
colorInput.addEventListener('change', function(e) {
    colorSeed = e.target.value
})

// Assign user's selected mode in dropdown list to schemeMode.
modeSelect.addEventListener('change', function(e) {
    schemeMode = e.target.value
})

/*
    When user clicks getColorsBtn, fetch The Color API.
    Insert chosen colorSeed and schemeMode into URL.
    Call the render function.
*/
getColorsBtn.addEventListener('click', function() {
    fetch(`${baseUrl}/scheme?hex=${colorSeed.replace('#', '')}&mode=${schemeMode}`)
        .then(res => res.json())
        .then(data => {
            getColorScheme(data)
        })
})

/* 
    Return arrays of key-value pairs for each element of the fetched object.
    Map over array with key "colors".
*/
function getColorScheme(data) {
    Object.entries(data).forEach(entry => {
        const [key, value] = entry
    })
    const colorArray = data.colors
    const newColorArray = colorArray.map(selectColorSchemeProps)
    renderColorScheme(newColorArray)
}

/*
    Return data of five colors as objects.
    Only grab properties to be rendered on page.
*/
function selectColorSchemeProps(newColor){
    const {hex, image, name} = newColor
    return {hex, image, name}
}

/* 
    Render the five colors in HTML.
    Create necessary elements for each color's info and wrap in a div.
*/
function renderColorScheme(newColorArray) {
    colorPalette.innerHTML = ''
    newColorArray.forEach(color => {
        const div = document.createElement('div')
        const image = document.createElement('img')
        const name = document.createElement('h3')
        const copyBtn = document.createElement('button')
        
        div.classList = 'color-strip'
        image.classList = 'color-img'
        copyBtn.classList = 'copy-btn'
        
// Assign properties of newColor to each respective element.
        image.src = color.image.bare
        copyBtn.innerText = `${color.hex.value}`
        copyBtn.value = `${color.hex.value}`       
        
        div.appendChild(image)
        div.appendChild(name)
        div.appendChild(copyBtn)
        colorPalette.appendChild(div)
        
        copyBtn.addEventListener('click', function() {
            let hexToCopy = copyBtn.value
            navigator.clipboard.writeText(hexToCopy)
                .then(() => {
                    copiedNotice.innerText = `Copied ${hexToCopy}`
                })
                .catch(() => {
                    copiedNotice.innerText = `Oops, something went wrong...`
                })
                .finally(displayCopiedNotice(hexToCopy))
        })
    })
}

// Toggle hide/display of "Copied" alert.
function displayCopiedNotice(hexToCopy) {
    if (copiedNotice.classList.contains('fade-in-out')) {
        copiedNotice.classList.remove('fade-in-out')
        copiedNotice.style.display = 'none'
    } else {
        copiedNotice.classList.add('fade-in-out') 
        copiedNotice.style.display = 'block'     
    }
}

/*
    Toggle night theme on elements when dark mode slider is activated/deactivated.
*/
themeToggle.addEventListener('change', () => {
    if (bodyEl.classList.contains('bg-theme')) {
        bodyEl.classList.remove('bg-theme')
        modeSelect.classList.remove('element-dark')
        getColorsBtn.classList.remove('element-dark')
        copiedNotice.classList.remove('element-dark')
    } else {
        bodyEl.classList.add('bg-theme')
        modeSelect.classList.add('element-dark')
        getColorsBtn.classList.add('element-dark')
        copiedNotice.classList.add('element-dark')
    }
})