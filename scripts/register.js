import { register } from "./api.js";

const buttonRegister = document.querySelector(".button-register2")


const form = document.querySelector(".box-register")
const elements = [...form.elements]
const eventRegister = () => {

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        buttonRegister.innerHTML = `<div class="loader">Loading...</div>`

        const body = {}

        elements.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.name] = element.value
            }
        })
        await register(body)
        buttonRegister.innerHTML = "Cadastrar"
    })
}

eventRegister()

     elements.forEach((element) => {
        if(element.tagName == "INPUT"){
        element.addEventListener("input", () => {
        if(element.value == ""){
        buttonRegister.disabled = true
        buttonRegister.style.opacity = "0.5"
        buttonRegister.style.cursor = "default"
    }else if(element.value != ""){
        buttonRegister.disabled = false
        buttonRegister.style.opacity = "1"
        buttonRegister.style.cursor = "pointer"
    }
    })
    }
    })
