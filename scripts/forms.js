import { renderPosts } from "./homepage.js"
import { createPostRequest} from "./api.js"
import { editPostRequest } from "./api.js"
import { deletePost } from "./api.js"
import { getDatas } from "./api.js"

const getInfos2 = await getDatas()


const createPostForm = () => {
    const form = document.createElement("form")
    form.classList.add("form-create")

    form.insertAdjacentHTML("beforeend", `
    <h3>Criando novo post</h3>
        
    <label for="title">Titulo do post</label>
    <input type="text" placeholder="Digitar o Titulo do 
    post" name="title" required>

    <label for="content">Conteúdo do post</label>
    <textarea placeholder="Desenvolva o conteúdo do post aqui" name="content" id="content" cols="30" rows="10" required></textarea>

    <div class="btns-create-post">
    <button type="button" class="cancel">Cancelar</button>
    <button class="btn-insert">Publicar</button>
    </div>
    `)

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

       const inputs = [...event.target]

       const newPost = {}

       inputs.forEach(({name, value}) => {
        if(name){
          newPost[name] = value
        }
       })
       const backModal = event.path[2]
       await createPostRequest(newPost)
       await renderPosts()
       backModal.remove()
    })

    return form
}

const editPostForm = ({title, content,id}) => {
    const form = document.createElement("form")
    form.classList.add("form-create")

    form.insertAdjacentHTML("beforeend", `
    <h3>Editando post</h3>
        
    <label for="title">Titulo do post</label>
    <input type="text" placeholder="Digitar o Titulo do 
    post" name="title" required value="${title}">

    <label for="content">Conteúdo do post</label>
    <textarea placeholder="Digite a descrição do post aqui..." name="content" cols="30" rows="10" required >${content}</textarea>

    <div class="btns-create-post">
    <button type="button" class="cancel">Cancelar</button>
    <button class="btn-insert">Salvar Alterações</button>
    </div>
    `)

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

       const inputs = [...event.target]

       const editedPost = {}

       inputs.forEach(({name, value}) => {
        if(name){
          editedPost[name] = value
        }
       })
       const backModal = event.path[2]
       await editPostRequest(editedPost,id)
       await renderPosts()
       backModal.remove()
    })

    return form
}

const deletePostForm = (id) => {
    const form = document.createElement("form")
    form.classList.add("form-delete")

    form.insertAdjacentHTML("beforeend", `
        <h3>Confirmação de exclusão</h3>
        
        <div class="delete-description">
            <h2>Tem certeza que deseja excluir este post?</h2>
            <p>Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>
        </div>

        <div class="delete-buttons">
            <button type="button" class="cancel">cancelar</button>
            <button type="submit" class="confirm">Sim,excluir este post</button>
        </div>
    `)
    form.addEventListener("submit", async (e)=> {
        e.preventDefault()
        const backModal = e.path[2]
        await deletePost(id)
        await renderPosts()
        backModal.remove()
    })
    return form
}

const postCompleteForm = ({user: {avatar}, user: {username}, createdAt, title, content}) => {
    const mainDiv = document.createElement("div")
    const divHeader = document.createElement("div")
    const imgData = document.createElement("div")
    const image = document.createElement("img")
    const nome = document.createElement("p")
    const span = document.createElement("span")
    const datePost = document.createElement("p")

    mainDiv.classList.add("main-div-post")
    divHeader.classList.add("div-header-post")
    imgData.classList.add("div-info-post")


    const titlePost = document.createElement("h2")
    const descriptionPost = document.createElement("p")

    image.src = avatar == "" ? "/assets/img/no-img-user.png" : avatar
    nome.innerText = username
    span.innerText = "|"
    datePost.innerText = createdAt
    titlePost.innerText = title
    descriptionPost.innerText = content

    divHeader.append(imgData,image,nome,span,datePost)
    mainDiv.append(divHeader,titlePost,descriptionPost)

    return mainDiv
}

export{
    createPostForm,
    editPostForm,
    deletePostForm,
    postCompleteForm,
}