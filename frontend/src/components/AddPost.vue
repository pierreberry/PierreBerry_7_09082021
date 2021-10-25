<template>
    <div class="post-container">
        <form @submit.prevent="addPost" method="post" enctype="multipart/form-data">
            <div class="title-image">
                <input class="title-input"
                    placeholder="Titre"
                    type="text"
                    name="title"
                    v-model="title"
                />
                <div class="add-img">
                    <input type="file" id="postPicture" name="picture"/>
                    <label class="post-picture-label" for="postPicture">
                        <font-awesome-icon :icon="['fas', 'image']" />
                    </label>
                </div>
                
            </div>
            <textarea
                placeholder="Partage ce que tu veux !"
                type="text"
                name="text"
                v-model="text"
            />
            <button class="button-add-post">Ajouter un post</button>
        </form>
        <button class="close-update" @click="$emit('close')">X</button>
    </div>
</template>

<script>
    export default {
        name: "AddPost",
        props: ['showMyPost'],
        emits: ['close'],
        data() {
            return {
                title: "",
                text: ""
            }
        },
        methods: {
            closeModal(){
                this.$emit('close')
            },
            addPost() {
                if (!this.title) {
                    this.$notify({
                        type: "warn",
                        title: "Veuillez renseigner un titre",
                    });
                    return
                }
                const postPicture = document.getElementById('postPicture');
                let postContent = {
                    title: this.title,
                    text: this.text,
                }
                if (!(postContent.text || postPicture.files[0])) {
                    this.$notify({
                        type: "warn",
                        title: "Veuillez renseigner du texte ou une image",
                    });
                    return
                }
                var newFormData =  new FormData()
                newFormData.append('post', JSON.stringify(postContent))
                newFormData.append('image',  postPicture.files[0])
                let profil = JSON.parse(localStorage.getItem('token'))
                fetch("http://localhost:5000/api/posts/", {
                    method: "post",
                    headers: {
                        "Authorization": "Bearer " + profil.token
                    },
                    body: newFormData,
                })
                .then((response) => {
                    return response.json();
                })
                .then(JSONres => {
                    this.showMyPost(JSONres)
                })
                .catch((error) => {
                    console.log(error)
                });
            },
        },
    };
</script>

<style scoped>

    .post-container{
        width: 50%;
        height: 50%;
        top: 25%;
        left: 25%;
        position: fixed;
        background: rgba( 255, 255, 255, 0.60 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
        backdrop-filter: blur(20px);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1000;
    }
    .post-container form{
        display: flex;
        flex-direction: column;
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
    .button-add-post{
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

    .title-image{
        width: 90%;
        height: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title-image .title-input{
        border-radius: 20px;
        border: none ;
        height: 2.5rem;
        width: 40%;
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
    .title-image .add-img{
        width: 30%;
        display: flex;
        justify-content: flex-end;
        place-items: center;
    }
    .title-image  .post-picture-label{
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
    .title-image .post-picture-label:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .title-image #postPicture{
        width: 50%;
    }
    .title-image #postPicture::-webkit-file-upload-button{
        display: none;
    }
    form textarea{
        padding: 2%;
        width: 90%;
        height: 50%;
        border: none;
        border-radius: 20px;
        box-shadow: 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    form textarea:focus{
        outline: none;
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );

    }
    form textarea:focus::placeholder{
        color: transparent;
    }


    @media screen and (max-width: 1250px){
        .title-image .title-input{
            width: 50%;
        }
        .title-image .add-img{
            width: 50%;
        }
        .button-add-post{
            width: 40%;
        }
    }
    @media screen and (max-width: 600px){
        .title-image{
            width: 100%;
            flex-direction: column;
            justify-content: space-evenly;
        }

        .title-image .title-input{
            width: 80%;
        }
        .title-image .add-img{
            width: 80%;
            justify-content: center;
            place-items: center;
        }
        .title-image  .post-picture-label{
            width:  1.5rem;
            height: 1.5rem;
            font-size: 1em;
        }
    }
    @media screen and (max-width: 400px){

        .post-container{
            width: 80%;
            height: 50%;
            top: 25%;
            left: 10%;
        }

        .title-image .title-input{
            width: 90%;
        }
        .title-image .add-img{
            width: 100%;
            justify-content: center;
            place-items: center;
        }
        .title-image  .post-picture-label{
            width:  1.5rem;
            height: 1.5rem;
            font-size: 1em;
        }

        .button-add-post{
            width: 70%;
        }
    }
    
</style>