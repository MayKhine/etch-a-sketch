const containerEle = document.querySelector(".container");
let gridSize = 16;
let trigger = false;
let penColor = '#000000';
let canvasColor = '#FFC0CB';
let selectionMode = 'pen';
let gridState = 1;

const createDiv = (className) => {
    let div = document.createElement("div");
    if (className) {
        div.classList.add(className);
    }
    return div
}

const createGrid = (num) => {
    gridContainerDiv.style.gridTemplateColumns = `repeat(${num}, 1fr)`

    const gridItems = []
    for (let i = 0; i < num * num; i++) {
        let gridItem = createDiv("grid-item");
        gridItem.style.backgroundColor = canvasColor; //set canvas color 
        gridContainerDiv.appendChild(gridItem);
        gridItems.push(gridItem)
    }
    enableSketch(gridItems)
}

const updateGrid = (gridSize) => {
    //remove current grid items
    let curGridItems = document.querySelectorAll('.grid-item')
    // gridContainerDiv.childNodes.remove()

    curGridItems.forEach((item) => {
        item.remove()
    })
    createGrid(gridSize)
    setCanvas('grid', gridState)
}

const getPenColor = () => {
    if (selectionMode == 'eraser') {
        return canvasColor
    }
    else if (selectionMode == 'pen') {
        return penColor
    } else if (selectionMode == 'rainbow') {
        return selectRandomRGB()
    }
}

const enableSketch = (gridItems) => {
    gridItems.forEach((item) => {
        item.addEventListener('mousedown', () => {
            // console.log(sketch)
            item.style.backgroundColor = getPenColor()
            trigger = true;
            // sketch(gridItems)
        })
        item.addEventListener('mouseover', () => {
            if (trigger) {
                item.style.backgroundColor = getPenColor()
            }

        })
        containerEle.addEventListener('mouseup', () => {
            trigger = false;
        })
    })
}

const setSelectionMode = (mode) => {
    selectionMode = mode;

    if (mode == 'eraser') {
        eraserButton.style.background = 'darkgray'
        penButton.style.background = 'lightgray'
        rainbowPenButton.style.background = 'lightgray'
    } else if (mode == 'pen') {
        penButton.style.background = 'darkgray'
        eraserButton.style.background = 'lightgray'
        rainbowPenButton.style.background = 'lightgray'
    } else if (mode == 'rainbow') {
        rainbowPenButton.style.background = 'darkgray'
        eraserButton.style.background = 'lightgray'
        penButton.style.background = 'lightgray'
    }
}

const setCanvas = (mode, value) => {
    let curGridItems = document.querySelectorAll('.grid-item')
    curGridItems.forEach((item) => {

        if (mode == 'grid') {
            if (value == 1) {
                item.style.border = "1px    solid   white"
            }
            else {
                item.style.border = "0px    solid   white"
            }
        } else if (mode == 'canvas') {
            item.style.backgroundColor = canvasColor
        }
    })
}

const selectRandomRGB = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return (`rgb(${x},${y},${z})`)
}

//create grid board div
let gridContainerDiv = createDiv("grid-container");
containerEle.appendChild(gridContainerDiv);

//add user selection section 
const userSelection = createDiv("user-selection")
containerEle.appendChild(userSelection)

//create canvs section 
// const canvasSection = createDiv("canvas")
// userSelection.appendChild(canvasSection)

//create grid size selection 
// const gridSizeSelectSection = createDiv("grid-size-section")
// canvasSection.appendChild(gridSizeSelectSection)
//create grid size range slider
const gridSizeSlider = document.createElement("input")
gridSizeSlider.setAttribute('type', 'range')
gridSizeSlider.setAttribute('min', '1')
gridSizeSlider.setAttribute('max', '100')
gridSizeSlider.setAttribute('value', gridSize)
// gridSizeSelectSection.appendChild(gridSizeSlider)
userSelection.appendChild(gridSizeSlider)
const gridSizeSelection = document.createElement("div")
gridSizeSelection.innerHTML = `Grid size: ${gridSize} x ${gridSize}`
// gridSizeSelectSection.appendChild(gridSizeSelection)
userSelection.appendChild(gridSizeSelection)

//create canvas color section 
const canvasColorSection = createDiv('canvas-color-section')
canvasColorSection.innerHTML = 'Canvas Color'
// canvasSection.appendChild(canvasColorSection)
userSelection.appendChild(canvasColorSection)

//create canvas color picker
const canvasColorPicker = document.createElement("input")
canvasColorPicker.classList.add('color-picker')
canvasColorPicker.setAttribute('type', 'color')
canvasColorPicker.setAttribute('value', canvasColor)
// canvasColorSection.appendChild(canvasColorPicker)
userSelection.appendChild(canvasColorPicker)


//grid line 
// const gridLineSection = createDiv('grid-line-section')
// userSelection.appendChild(gridLineSection)
//create eraser button 
const gridButton = document.createElement('button')
gridButton.classList.add('button')
gridButton.innerText = 'Grid Line'
gridButton.style.backgroundColor = 'darkgray'
// canvasSection.appendChild(gridButton)
userSelection.appendChild(gridButton)

const buffer = createDiv('buffer')
userSelection.appendChild(buffer)

//create pen color section 
const penColorSection = createDiv('pen-color-section')
penColorSection.innerHTML = 'Pen Color'
userSelection.appendChild(penColorSection)
//create pen color picker
const penColorPicker = document.createElement("input")

penColorPicker.classList.add('color-picker')
penColorPicker.setAttribute('type', 'color')
penColorPicker.setAttribute('value', penColor)
// penColorSection.appendChild(penColorPicker)
userSelection.appendChild(penColorPicker)


// pen
// const penSection = createDiv('pen-section')
// penColorSection.appendChild(penSection)
//create pen button 
const penButton = document.createElement('button')
penButton.classList.add('button')
penButton.innerText = 'Drawing Pen'
// penColorSection.appendChild(penButton)
userSelection.appendChild(penButton)
//rainbow pen
const rainbowPenButton = document.createElement('button')
rainbowPenButton.classList.add('button')
rainbowPenButton.innerText = 'Rainbow Pen'
// penColorSection.appendChild(rainbowPenButton)
userSelection.appendChild(rainbowPenButton)

const buffer2 = createDiv('buffer')
userSelection.appendChild(buffer2)

// eraser
// const eraserSection = createDiv('eraser-section')
// userSelection.appendChild(eraserSection)
//create eraser button 
const eraserButton = document.createElement('button')
eraserButton.classList.add('button')
eraserButton.innerText = 'Eraser'
// eraserSection.appendChild(eraserButton)
userSelection.appendChild(eraserButton)




// ------------------------- actions 
createGrid(gridSize);
setSelectionMode(selectionMode);
setCanvas('grid', gridState)

let slider;
gridSizeSlider.addEventListener('mousedown', () => {
    slider = 'clicked';
    // console.log('Mouse down')
})

gridSizeSlider.addEventListener('mousemove', (event) => {
    // console.log('mouse move ', slider)
    gridSize = event.target.value
    if (slider == 'clicked') {
        gridSizeSelection.innerHTML = `${gridSize} x ${gridSize}`
    }
})

//update grid size by user selection 
gridSizeSlider.addEventListener('mouseup', (event) => {
    // console.log(slider.target.value)
    gridSize = event.target.value
    //update the grid size text
    // gridSizeSelection.innerHTML = `${gridSize} x ${gridSize}`
    updateGrid(gridSize)
})


canvasColorPicker.addEventListener('input', (event) => {
    canvasColor = event.target.value
    setCanvas('canvas', canvasColor)
})


penColorPicker.addEventListener('input', (event) => {
    penColor = event.target.value
})

penButton.addEventListener('click', (event) => {
    // selectionMode = 'pen'
    // penButton.style.background = 'darkgray'
    // eraserButton.style.background = 'lightgray'
    setSelectionMode('pen')
})

rainbowPenButton.addEventListener('click', (event) => {
    setSelectionMode('rainbow')
})

eraserButton.addEventListener('click', (event) => {
    // selectionMode = 'eraser'
    // eraserButton.style.background = 'darkgray'
    // penButton.style.background = 'lightgray'
    setSelectionMode('eraser')
})

gridButton.addEventListener('click', (event) => {
    //grid state 
    // if grid is on, off it 
    if (gridState == 1) {
        gridState = 0
        setCanvas('grid', 0)
        gridButton.style.backgroundColor = 'lightgray'
    } else {
        gridState = 1
        setCanvas('grid', 1)
        gridButton.style.backgroundColor = 'darkgray'

    }
})




// pick canvas color
// pick grid item color

// random rgb color 
// add 10% of black for each press 


