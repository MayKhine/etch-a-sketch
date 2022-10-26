const containerEle = document.querySelector(".container");
let gridSize = 9;
let trigger = false;

const createDiv = (className) => {
    let div = document.createElement("div");
    if (className) {
        div.classList.add(className);
    }
    return div
}

const createGrid = (num) => {
    gridContainerDiv.style.gridTemplateColumns = `repeat(${num}, 1fr)`
    for (let i = 0; i < num * num; i++) {
        let gridItem = createDiv("grid-item");
        gridContainerDiv.appendChild(gridItem);
    }
}

const updateGrid = (gridSize) => {
    //remove current grid items
    let curGridItems = document.querySelectorAll('.grid-item')
    curGridItems.forEach((item) => {
        item.remove()
    })
    createGrid(gridSize)
}

const sketch = (gridItems) => {
    console.log('sketch')
    gridItems.forEach((item) => {
        item.addEventListener('mousedown', () => {
            // console.log(sketch)
            item.style.backgroundColor = 'black'
            trigger = true;
            // sketch(gridItems)
        })
        item.addEventListener('mouseover', () => {
            if (trigger) {
                item.style.backgroundColor = 'black'
            }

        })
        item.addEventListener('mouseup', () => {
            trigger = false;

        })

    })
}

//create grid board
let gridContainerDiv = createDiv("grid-container");
containerEle.appendChild(gridContainerDiv);
createGrid(gridSize);

//add user selection section 
const userSelection = createDiv("userSelection")
containerEle.appendChild(userSelection)

//select grid items
let gridItems = document.querySelectorAll('.grid-item')
//draw on grid
sketch(gridItems)

//create grid size range slider
const gridSizeSlier = document.createElement("input")
gridSizeSlier.setAttribute('type', 'range')
gridSizeSlier.setAttribute('min', '1')
gridSizeSlier.setAttribute('max', '100')
gridSizeSlier.setAttribute('value', gridSize)
userSelection.appendChild(gridSizeSlier)
const gridSizeSelection = document.createElement("div")
gridSizeSelection.innerHTML = `${gridSize} x ${gridSize}`
userSelection.appendChild(gridSizeSelection)

//update grid size by user selection 
gridSizeSlier.addEventListener('mouseup', (slider) => {
    // console.log(slider.target.value)
    gridSize = slider.target.value
    //update the grid size text
    gridSizeSelection.innerHTML = `${gridSize} x ${gridSize}`

    gridSizeSlier.setAttribute('placeholder', slider.target.value)
    updateGrid(gridSize)
    //select the latest grid items and draw
    gridItems = document.querySelectorAll('.grid-item')
    sketch(gridItems)
})




