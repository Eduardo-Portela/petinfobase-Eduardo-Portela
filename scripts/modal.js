const body = document.querySelector("body")

export const openModal = (children) => {
    const backGround = document.createElement("div")
    const modal = document.createElement("div")
    const buttonClose = document.createElement("button")

    backGround.classList.add("back-modal")
    modal.classList.add("modal")
    buttonClose.classList.add("button-close")

    buttonClose.innerText = "X"

    backGround.addEventListener("click", (event) => {
        const {className} = event.target
        if(className == "back-modal" || className == "button-close"){
            backGround.remove()
        }
    })

    modal.appendChild(buttonClose)
    modal.appendChild(children)
    backGround.appendChild(modal)

    body.appendChild(backGround)
}
const h1 = document.createElement("h1")
h1.innerText = "adaijodaiodjiaojmdioajndansmdan"

//openModal(h1)
