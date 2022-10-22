/* Desenvolva seu código aqui */
import { login } from "./api.js";

    const user = {
        "email": "rafael@kenzie.com.br",
	    "password": "123456"
    }


    const eventLogin = () => {
        const form = document.querySelector(".login-content")
        const elements = [...form.elements]

        form.addEventListener("submit", async (e) => {
            e.preventDefault()

            const body = {}

            elements.forEach((element) => {
                if(element.tagName == "INPUT" && element.value !== ""){
                    body[element.id] = element.value
                }
            })
            await login(body)
        })
    }

     eventLogin()
//console.log(await login(user))