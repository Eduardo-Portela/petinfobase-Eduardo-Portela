import { register } from "./api.js";

const eventRegister = () => {
    const form = document.querySelector(".box-register")
    const elements = [...form.elements]
    console.log(elements)

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const body = {}

        elements.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.name] = element.value
            }
        })
        await register(body)
    })
}

eventRegister()