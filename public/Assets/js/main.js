const BaseUrl = "http://localhost:5000"




async function DeleteHandler(id) {
    const Options = {
        method: 'DELETE', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
    }

    const result = await fetch(`${BaseUrl}/category/${id}`, Options)

    if (!window.confirm("Are you sure to Delete this user?")) {
        return
    }
    if (result) {
        window.location.reload()
    }

}

function ClickEditCategory(id) {
    window.location.pathname = `/category/${id}`
}

async function UpdateCategory() {
    const name = document.getElementById("name").value
    const alise = document.getElementById("alise").value
    let id = window.location.pathname.split("/")
    id = id[id.length - 1]

    const data = {
        name,
        alise,
        _id: id
    }

    const Options = {
        method: 'PUT', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
        body: JSON.stringify(data)
    }

    const result = await fetch(`${BaseUrl}/category`, Options)

    if (result && result.status === 200) {
        window.location.pathname = "/category"
    }

}


async function AddUser() {
    let name = document.getElementById("name").value
    let alise = document.getElementById("alise").value



    const data = {
        name,
        alise
    }
    if (!name) {
        return alert("please enter a name")
    }
    if (!alise) {
        return alert("please enter a alise")
    }
    const Options = {
        method: 'POST', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
        body: JSON.stringify(data)
    }

    const result = await fetch(`${BaseUrl}/category`, Options)
    if (result && result.status === 200) {
        window.location.reload()
    }
}

async function UploadFile(file) {
    let formData = new FormData()
    formData.append("file", file)

    console.log(formData);
    const Options = {
        method: 'POST', // HTTP method
        body: formData
    }
    try {
        const result = await fetch(`${BaseUrl}/gallery`, Options)
        if (result && result.status === 200) {
            window.location.reload()
        }
    } catch (error) {
        console.log(error);
    }

}

const files = {}

function SelectFile(img) {
    if (files[img.id] !== undefined) {
        delete files[img.id]
        img.style.border = "none"
    } else {
        files[img.id] = img.id
        img.style.border = "2px solid green"
    }

    console.log(files);

}

async function DeleteFile() {
    let Files = Object.values(files)

    const Options = {
        method: 'POST', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
        body: JSON.stringify({ files: Files })
    }
    try {
        const result = await fetch(`${BaseUrl}/gallery/deleteFile`, Options)

        if (result) {
            window.location.reload()
        }

    } catch (error) {
        console.log(error);
    }

}



let editorContent = ""
let fetureImage = {}

 async function AddMovie() {
    let title = document.getElementById("title").value
    let alias = document.getElementById("alise").value
    let description = document.getElementById("textarea").value
    let headerScript = document.getElementById("headerScript").value
    let bodyScript = document.getElementById("bodyScript").value
    let category = document.getElementById("category").value

    let titleError = document.getElementById("titleError");
    let aliseError = document.getElementById("aliseError");
    let ImgError = document.getElementById("ImgError")
    let CatError = document.getElementById("CatError");
    // Repeat this for other error span elements

    // Reset error messages
    titleError.textContent = "";
    aliseError.textContent = "";
    ImgError.textContent ="";
    CatError.textContent = ""
    // Reset error messages for other fields

    // Validate input fields
    let isValid = true;

    if (!title) {
        titleError.textContent = "Please Enter  title";
        titleError.style.color = "red";
        isValid = false;
    }
    if (!alias) {
        aliseError.textContent = "please Enter Alias";
        aliseError.style.color = "red";
        isValid = false;
    }
    if(category === "0"){
        CatError.textContent = "Please Select Category"
        CatError.style.color = "red";
        isValid = false;
    }
    if(Object.keys(fetureImage).length === 0) {
        ImgError.textContent = "please Select Feature Image";
        ImgError.style.color = "red";
        isValid = false;
    }
    // Add similar validation for other fields

    if (!isValid) {
        return; // Stop further processing
    }


    const data = {
        title,
        alias,
        description:editorContent,
        fetureImage:fetureImage,
        headerScript,
        bodyScript,
        category,
    }
    console.log(data);

    const Options = {
        method: 'POST', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
        body: JSON.stringify(data)
    }

    try {
        const result = await fetch(`${BaseUrl}/movie`, Options)
        console.log(result);
        if (result || result.status === 200) {
            window.location.pathname = "/movie"
        }
    } catch (error) {
        console.log(error);
    }
}

async function DeleteMovie(id) {
    const Options = {
        method: 'DELETE', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
    }

    const result = await fetch(`${BaseUrl}/movie/${id}`, Options)

    if (!window.confirm("Are you sure to Delete this user?")) {
        return
    }
    if (result) {
        window.location.reload()
    }

}

function ClickEditMovie(id) {
    window.location.pathname = `/movie/${id}`
}

async function UpdateMovie() {
    let title = document.getElementById("title").value
    let alias = document.getElementById("alise").value
    let description = document.getElementById("textarea").value
    let headerScript = document.getElementById("headerScript").value
    let bodyScript = document.getElementById("bodyScript").value
    let category = document.getElementById("category").value
    let id = window.location.pathname.split("/")
    id = id[id.length - 1]

    const data = {
        title,
        alias,
        description:editorContent,
        fetureImage:fetureImage._id,
        headerScript,
        bodyScript,
        category,
        _id: id
    }

    const Options = {
        method: 'PUT', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
        body: JSON.stringify(data)
    }

    try {
        let result = await fetch(`${BaseUrl}/movie`, Options)
        console.log(result);
    
        if (result && result.status === 200) {
            window.location.pathname = "/movie"
        }
    } catch (error) {
        console.log(error);
    }


}


function MovieDetail(id) {
    window.location.pathname = `/moviedetail/${id}`

}

async function LoginHandler(){
    const email = document.getElementById("email").value
    const password = document.getElementById("pass").value

    let emailError = document.getElementById("emailError")
    let passError = document.getElementById("passError");

    emailError.textContent =""
    passError.textContent=""

    let isValid = true;

    if (!email) {
        emailError.textContent = "Please Enter  email";
        emailError.style.color = "red";
        isValid = false;
    }
    if (!password) {
        passError.textContent = "please Enter password";
        passError.style.color = "red";
        isValid = false;
    }

    if(!isValid){
        return
    }

    const data ={
        email,
        password
    }

    const Options = {
        method: 'POST', // HTTP method
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', // Request headers
            'Authorization': 'Bearer your-access-token', // Optional authorization header
            // Add any other headers as needed
        },
        body: JSON.stringify(data)
    }

    try {
        let result = await fetch("/user/login", Options)
        if(result && result.status === 200){  
            window.location.pathname ="/dashboard"
        }

    } catch (error) {
        console.log(error);
    }

}


tinymce.init({
    selector: '#textarea',
    file_picker_types: 'file image media',
    toolbar: 'image',
    height:700,
    image_caption: true,
    plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss image',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    images_upload_url: 'postAcceptor.php',
    init_instance_callback:function(editor){
        editor.on("keyup", (e,content) => {
            editorContent =e.target.innerHTML
            
        })  
    },

    // automatic_uploads: false,
    images_upload_handler: async (blobInfo, success,err, _) => {
        try {
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            const Options = {
                method: 'POST', // HTTP method
                body: formData
            }
            let result = await fetch(`${BaseUrl}/gallery`, Options)
            if (result.status === 200) {
                result = await result.json()
                let url = "http://localhost:5000"
                url += result.fileDetails.path
                return url
            } else {
                err("Somthing went wrong with upload file please try again after somtimes")
            }
        } catch (error) {
            err("Somthing went wrong with upload file please try again after somtimes")
        }
    },
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
});


function selectFetureImage(fileDetails, img){
    if(fetureImage._id){
        const preImg = document.getElementById(fetureImage._id)
        preImg.style.border = "1px solid black"
    }
    fetureImage = fileDetails
    img.style.border = "2px solid blue"
}

function gallaryCloseHandeler(){
    fetureImage = {}
}

function imageSelecthander(){



    if(!fetureImage._id){
        window.alert("please select a Image")
        return
    }

    const selectedImage = document.querySelector(".fetureImage")
    const img = `<img src="${fetureImage.path}" width="${100}%" height="${100}%" />`
    selectedImage.innerHTML = img
}

function LogoutHandler(){
    const expirationDate = new Date();
    document.cookie = `token=; expires=${expirationDate.toUTCString()};path=/ `
    window.location.reload()
}

