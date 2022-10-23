/* Desenvolva seu código aqui */
import { login } from "./api.js";

    const buttonLogin = document.querySelector(".button-login")

    
    const eventLogin = () => {
        const form = document.querySelector(".login-content")
        const elements = [...form.elements]

        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            buttonLogin.innerHTML = `<div class="loader">Loading...</div>`

            const body = {}

            elements.forEach((element) => {
                if(element.tagName == "INPUT" && element.value !== ""){
                    body[element.id] = element.value
                }
            })
           
            await login(body)
            buttonLogin.innerHTML = "Acessar"
        })
    }

     eventLogin()

const login2 = document.querySelector(".log")
const password = document.querySelector(".pass")

password.addEventListener("input", () => {
    if(password.value == ""){
        buttonLogin.disabled = true
        buttonLogin.style.opacity = "0.5"
        buttonLogin.style.cursor = "default"
    }else{
        buttonLogin.disabled = false
        buttonLogin.style.opacity = "1"
        buttonLogin.style.cursor = "pointer"
    }
})

login2.addEventListener("input", () => {
    if(password.value == "" || login2.value == ""){
        buttonLogin.disabled = true
        buttonLogin.style.opacity = "0.5"
        buttonLogin.style.cursor = "default"
    }else{
        buttonLogin.disabled = false
        buttonLogin.style.opacity = "1"
        buttonLogin.style.cursor = "pointer"
    }
})