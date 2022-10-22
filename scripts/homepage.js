import { getLocalStorage } from "./localStorage.js";
import { getPosts } from "./api.js";
import { getDatas } from "./api.js";

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
    
    const imgProfile = document.createElement("img")
    imgProfile.classList.add("img-logout")
    imgProfile.src =  img == "" ? "/assets/img/no-img-user.png" : img

    divCreatePost.append(buttonCreatePost, imgProfile)
}
renderImgHeader(getInfos.avatar)



const renderPosts = async() => {

    const listaPosts = document.querySelector(".post-list")
    //listaPosts.innerText = ""

    const getPost = await getPosts()

    getPost.forEach(post => {
        const {user: {avatar}, user: {username}, createdAt, title, content, id} = post
        
    const postLi = document.createElement("li")
    const postHeader = document.createElement("div")
    const imgData = document.createElement("div")
    const image = document.createElement("img")
    const nome = document.createElement("p")
    const span = document.createElement("span")
    const datePost = document.createElement("p")

    const divBtnEditDelete = document.createElement("div")
    const btnEdit = document.createElement("button")
    const btnDelete = document.createElement("button")

    const postInfo = document.createElement("div")
    const titlePost = document.createElement("h2")
    const descriptionPost = document.createElement("p")
    const postComplete = document.createElement("button")

    postLi.classList = "post"
    postLi.id = id
    postHeader.classList.add("post-header")
    imgData.classList.add("img-data")
    divBtnEditDelete.classList.add("btn-edit-delet")
    btnEdit.classList.add("edit")
    btnDelete.classList.add("delete")
    postInfo.classList.add("post-info")
    titlePost.classList.add("post-title")
    descriptionPost.classList.add("post-description")
    postComplete.classList.add("complete-post")

    image.src = avatar == "" ? "/assets/img/no-img-user.png" : avatar
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
    divBtnEditDelete.append(btnEdit,btnDelete)

    postInfo.append(titlePost,descriptionPost,postComplete)
    
    listaPosts.appendChild(postLi)
    });
}

renderPosts()


/*     <li class="post">
        <div class="post-header">
            <div class="img-data">
                <img src="../../assets/img/register-2.png" alt="">
                <p>Gato Felix</p>
                <span>|</span>
                <p>Outubro de 2022</p>
            </div>
            <div class="btn-edit-delet">
                <button class="edit">Editar</button>
                <button class="delete">Excluir</button>
            </div>
        </div>

        <div class="post-info">
            <h2 class="post-title">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam doloremque earum totam, ut exercitationem dicta repellat</h2>

            <p class="post-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, ut distinctio iusto reiciendis sit atque nulla, velit dolore suscipit corporis dolorum voluptas. Velit pariatur totam dolorem vero harum delectus itaque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ab recusandae, qui ad expedita maxime. Unde facere magnam, aspernatur commodi, omnis aliquid magni at, corporis ipsum ea nisi vero hic.</p>

            <button class="complete-post">Acessar publicação</button>
        </div>
    </li>*/
