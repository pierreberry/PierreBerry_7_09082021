<template>
    <div class="update-container">
        <form  enctype="multipart/form-data" autocomplete="off">
            <div class="content-container">
                <input class="title-input"
                    :placeholder="post.title"
                    type="text"
                    name="name"
                    v-model="post.title"
                />
                <textarea
                    :placeholder="post.text"
                    type="text"
                    name="nickname"
                    v-model="post.text"
                />
            </div>
            <div class="image-container">
                    <div class="input-image">
                        <label class="post-picture-label" for="postPicture">
                            <font-awesome-icon :icon="['fas', 'image']" />
                        </label>
                        <input  @change="onFileChange" type="file" ref="fileupload" id="postPicture" name="image"/>
                    </div>
                    <div class="image-preview" v-if="!fileToDelete">
                        <span v-if="url || post.postPicture">
                            <button v-if="url != '' || post.postPicture" class="delete-img" @click.prevent="deleteFile" >X</button>
                            <img v-if="url != ''" :src="url">
                            <img v-else :src="post.picture">
                        </span>
                    </div>
            </div>
            <button class='button-modify-post' @click.prevent="updatePost">Modifier le post</button>
        </form>
        <button class="delete-post" @click="deletePost">Supprimer le post</button>
        <button class="close-update" @click="$emit('close')">X</button>
    </div>
</template>

<script>
    export default {
        name: "UpdatePost",
        props: ['id', 'ShowUpdatePost', 'updatePostVue'],
        emits: ['close'],
        data(){
            return {
                profil: JSON.parse(localStorage.getItem('token')),
                fileToDelete: false,
                url: "",
                post: {}
            }
        },
        mounted(){
            fetch("http://localhost:5000/api/posts/" + this.id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + this.profil.token
                }
                })
                .then(res => res.json())
                .then(data => { this.post = data })
                .catch(err => console.log(err.message));
        },
        methods: {
            closeModal(){
                this.$emit('close')
            },
            deleteFile(){
                //this.url = null
                this.fileToDelete = true;
            },
            onFileChange(e) {
                let file = e.target.files[0];
                this.url = URL.createObjectURL(file);
            },
            updatePost() {
                var formData =  new FormData()
                formData.append('post', JSON.stringify(this.post)) 
                let postPicture = document.getElementById('postPicture');
                if (!this.fileToDelete) {                    
                    formData.append('image',  postPicture.files?.[0])
                } else {
                    formData.append('image',  "toDelete")
                }
                fetch("http://localhost:5000/api/posts/" + this.id, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + this.profil.token
                    },
                    body: formData,
                })
                .then((response) => {
                    if(response.ok) {
                    return response.json()
                    }
                    return response.text().then(text => {throw new Error(text)})
                })
                .then((JSONres) => {
                    this.$notify({
                        type: "success",
                        title: "Post modifié !",
                    });      
                    this.updatePostVue(JSONres)
                    this.$emit('close')
                })
                .catch(e => {
                    this.$notify({
                        type: "warn",
                        title: e,
                    });
                });
            },
            deletePost(){
                fetch("http://localhost:5000/api/posts/" + this.id, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + this.profil.token
                    }
                })
                .then((response) => {return response.json()})
                .then(() => this.$router.push('/'))
                .catch(e => console.log(e));
            }
        }
};
</script>

<style scoped>
    .update-container{
        width: 60%;
        height: 60%;
        top: 20%;
        left: 20%;
        position: absolute;
        background: rgba( 255, 255, 255, 0.60 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
        backdrop-filter: blur(6px);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1000;
    }
    .update-container form{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    .close-update{
        position: absolute;
        top: 5%;
        right: 5%;
        width: 25px;
        height: 25px;
        background: none;
        border: none;
        font-size: 20px;
        font-weight: 600;
        color: red;
        cursor: pointer;
    }
    .button-modify-post{
        position: absolute;
        top: 5%;
        left: 5%;
        cursor: pointer;
        border: none;
        width: 20%;
        font-size: 1rem;
        height: 2rem;
        border-radius: 20px;
        background-color: white;
        box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }

    .button-add-post:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }

    .content-container{
        padding-left: 5%;
        width: 65%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: right;
    }
    .content-container .title-input{
        border-radius: 20px;
        border: none ;
        height: 2.5rem;
        width: 50%;
        background-color: white;
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
        font-size: 1rem;
        text-align: center;
        margin-right: 5%;
    }
    .title-input:focus{
        outline: none;
    }
    .title-input:focus::placeholder{
        color: transparent;
    }
    .content-container textarea{
        padding: 2%;
        width: 90%;
        height: 80%;
        display: flex;
        justify-content: flex-end;
        place-items: center;
        border: none;
        border-radius: 20px;
        box-shadow: 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .content-container textarea:focus{
        outline: none;
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .content-container textarea:focus::placeholder{
        color: transparent;
    }
    .delete-img{
        width: 20px;
        height: 20px;
        position: absolute;
        background: none;
        border: none;
        font-size: 20px;
        font-weight: 600;
        color: red;
        cursor: pointer;
    }

    .image-container{
        width: 35%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .image-container .input-image{
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        place-items: center;
    }
    
    .image-container #postPicture{
        width: 8rem;
    }
    .image-container  .post-picture-label{
        display: grid;
        place-items: center;
        cursor: pointer;
        border-radius: 50%;
        font-size: 2em;
        border: none;
        width:  3rem;
        height: 3rem;
        background-color: white;
        box-shadow: 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
        text-align: center;
        color: red;
    }
    .image-container .post-picture-label:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .image-container #postPicture::-webkit-file-upload-button{
        display: none;
    }
    .image-container .image-preview{
        object-fit: contain;
        width: 100%;
        height: 300px;
    }
    .image-container .image-preview img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .delete-post{       
        margin-bottom: 2%;
        cursor: pointer;
        border: none;
        width: 30%;
        font-size: 1rem;
        height: 2rem;
        border-radius: 20px;
        background-color: rgb(255, 67, 67);
        color: white;
        box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .delete-post:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }


    @media screen and (max-width: 1000px){
        .button-modify-post{
            position: absolute;
            top: 86%;
            left: 40%;
        }
        .update-container{
            width: 90%;
            height: 80%;
            top: 10%;
            left: 5%;
        }
        .update-container form{
            margin-top: 5%;
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: flex-start;
        }
        .content-container{
            width: 100%;
            height: 40%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: right;
        }
        .image-container{
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
        }
        .image-container .image-preview{
            height: 200px;
        }
    }
    @media screen and (max-width: 700px){

        .button-modify-post{
            width: 40%;
            position: absolute;
            top: 86%;
            left: 30%;
        }

        .delete-post{
            width: 40%;
        }
    }
    @media screen and (max-width: 400px){
        .button-modify-post{
            width: 50%;
            left: 25%;
        }

        .delete-post{
            width: 50%;
        }
    }
</style>