import { getLocalStorage } from "./localStorage.js";
import { getPosts } from "./api.js";
import { getDatas } from "./api.js";
import { createPostRequest } from "./api.js";
import { createPostForm } from "./forms.js";
import { openModal } from "./modal.js";
import { editPostForm } from "./forms.js";
import { deletePostForm } from "./forms.js";
import { postCompleteForm } from "./forms.js";

const getInfos = await getDatas()

const verify = () => {
    const user = getLocalStorage()
    if(user == ""){
        window.location.assign("../../index.html")
    }
}

verify()


const renderImgHeader = (img) =>{
    const divCreatePost = document.querySelector(".create-post-logout")

    const buttonCreatePost = document.createElement("button")
    buttonCreatePost.classList.add("create-Post")
    buttonCreatePost.innerText = "Criar publicação"
    
    const divLogout = document.createElement("div")
    const imgProfile = document.createElement("img")
    const divBoxLogout = document.createElement("div")
    const nameProfile = document.createElement("p")
    const buttonLogout = document.createElement("button")

    buttonLogout.addEventListener("click", () =>{
        localStorage.removeItem("user")
        window.location.reload(true)
    })

    divLogout.classList.add("div-main-logout")
    divBoxLogout.classList.add("div-logout")


    imgProfile.classList.add("img-logout")
    imgProfile.src =  img == "" ? "./assets/img/no-img-user.png" : img
    nameProfile.innerText = `@${getInfos.username}`
    buttonLogout.innerHTML = `<img src="../../assets/img/sign-out-alt.png" alt=""> Sair da conta`

    divLogout.append(imgProfile,divBoxLogout)
    divBoxLogout.append(nameProfile, buttonLogout)

    divCreatePost.append(buttonCreatePost, divLogout)
}
renderImgHeader(getInfos.avatar)



const renderPosts = async() => {

    const listaPosts = document.querySelector(".post-list")
    listaPosts.innerText = ""

    const getPost = await getPosts()

    getPost.forEach(post => {
        const {user: {avatar}, user: {username}, createdAt, title, content, user: {id}} = post
        
    const postLi = document.createElement("li")
    const postHeader = document.createElement("div")
    const imgData = document.createElement("div")
    const image = document.createElement("img")
    const nome = document.createElement("p")
    const span = document.createElement("span")
    const datePost = document.createElement("p")
    const divBtnEditDelete = document.createElement("div")
     
    const btnEdit = document.createElement("button")
        btnEdit.addEventListener("click", ()=> {
            const editModal = editPostForm(post)
            openModal(editModal)
        })


    const btnDelete = document.createElement("button")
    btnDelete.addEventListener("click", (e)=>{
        const modalDelete = deletePostForm(post.id)
        openModal(modalDelete)
    })

    const postInfo = document.createElement("div")
    const titlePost = document.createElement("h2")
    const descriptionPost = document.createElement("p")
    const postComplete = document.createElement("button")

    postComplete.addEventListener("click", () => {
        const modalComplete = postCompleteForm(post)
        openModal(modalComplete)
    })

    postLi.classList = "post"
    postLi.id = post.id
    postHeader.classList.add("post-header")
    postHeader.id = id
    imgData.classList.add("img-data")
    divBtnEditDelete.classList.add("btn-edit-delet")
    btnEdit.classList.add("edit")
    btnDelete.classList.add("delete")
    postInfo.classList.add("post-info")
    titlePost.classList.add("post-title")
    descriptionPost.classList.add("post-description")
    postComplete.classList.add("complete-post")

    image.src = avatar == "" ? "./assets/img/no-img-user.png" : avatar
    nome.innerText = username
    span.innerText = "|"
    datePost.innerText = createdAt
    btnEdit.innerText = "Edit"
    btnDelete.innerText = "Delete"
    titlePost.innerText = title
    descriptionPost.innerText = content
    postComplete.innerText = "Acessar publicação"

    postLi.append(postHeader,postInfo)
    postHeader.append(imgData,divBtnEditDelete)
    imgData.append(image, nome,span,datePost)

    if(postHeader.id == getInfos.id){
        divBtnEditDelete.append(btnEdit,btnDelete)
    }

    postInfo.append(titlePost,descriptionPost,postComplete)
    
    listaPosts.appendChild(postLi)
    });
}

renderPosts()

const createPost = () => {
    const btnCreatePost = document.querySelector(".create-Post")

    btnCreatePost.addEventListener("click", async () =>{

        const formCreate = createPostForm()
        openModal(formCreate)
    })
}

createPost()

export{
    renderPosts
}
