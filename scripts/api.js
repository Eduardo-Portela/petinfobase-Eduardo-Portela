/* Desenvolva seu código aqui */
import { toast } from  "./toast.js"
import { getLocalStorage } from "./localStorage.js"

const baseUrl = "http://localhost:3333"

async function login(body){

    try{
        const request = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if(request.ok){
        const requestJson = await request.json()
        toast("Sucesso!", "Login feito com sucesso!")
        
        localStorage.setItem("user",JSON.stringify(requestJson))

        
        setTimeout(() => {
            
            window.location.replace("/pages/homepage/homepage.html")
        }, 4000)
        }else{
            const inputs = document.querySelectorAll(".login-content input")
            inputs.forEach((input) => {
                input.classList.add("border-error")
            })
            const span = document.querySelector(".error-data")
            span.innerText = "Email ou senha incorretos"
        }

    }catch(err){
        console.log(err)
    }
}

async function register(body){
    try{
        const request = await fetch(`${baseUrl}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if(request.ok){
            const requestJson = await request.json()
            toast("Sucesso!", "Cadastro feito com sucesso!")
    
            setTimeout(() => {
                window.location.assign("../../index.html")
            }, 4000)
        }else{
            toast("Erro", "Algo deu errado")
        }

}catch(err){
    console.log(err)
}
}



async function getPosts(){
    const localStorage = getLocalStorage()

    try{
    const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
}
    })

    const requestJson = await request.json()

    return requestJson
}catch(err){
    console.log(err)
}

}

async function getDatas(){
    const localStorage = getLocalStorage()
    try{
    const resquest = await fetch(`${baseUrl}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
    })
    
    const requestJson = await resquest.json()

    return requestJson
}catch(err){
    console.log(err)
}

}

async function createPostRequest(body1){
    const localStorage = getLocalStorage()

    try{
        const request = await fetch(`${baseUrl}/posts/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
          },
          body: JSON.stringify(body1)
        })
        const requestJson = await request.json()

        return requestJson

    }catch(err){
        console.log(err)
    }
}

async function editPostRequest(body1,id){
    const localStorage = getLocalStorage()

    try{
        const request = await fetch(`${baseUrl}/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body1)
        })
        const response = await request.json()

        return response
    }catch(err){
        console.log(err)
    }
}

async function deletePost(id){
    const localStorage = getLocalStorage()
    try{

        const request = await fetch(`${baseUrl}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        if(request.ok){
            toast("Sucesso!", "O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed ")
        }

    }catch(err){
        console.log(err)
    }
}



export{
    login,
    register,
    getPosts,
    getDatas,
    createPostRequest,
    editPostRequest,
    deletePost
}