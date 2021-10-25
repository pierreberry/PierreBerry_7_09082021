<template>
    <div class="update-container">
        <div class="update-profil">
            <form @submit.prevent="uptadeProfil" class="form" enctype="multipart/form-data" autocomplete="off">
                <fieldset class="name-nickname">
                    <span>Prénom</span> <input
                        :placeholder="profil.nickname"
                        type="text"
                        name="nickname"
                        v-model="nickname"
                    />
                    <span>Nom</span> <input
                        :placeholder="profil.name"
                        type="text"
                        name="name"
                        v-model="name"
                    />
                </fieldset>
                <fieldset class="image-profil">
                    <div class="img-profil">
                        <label for="profilPicture">
                            <img v-if="url" :src="url">                            
                            <img v-else :src="profil.profilPicture">
                        </label>
                    </div>
                    <div class="img-input">
                        <input type="file" id="profilPicture" name="image" @change="onFileChange" />
                    </div>
                </fieldset>
                <button>Modifier le profil</button>
            </form>
        </div>
        <div class="delete-account">
            <DeleteAccount />
        </div>
        <button class="close-update" @click="$emit('close')">X</button>
    </div>
</template>

<script>
import DeleteAccount from '../components/DeleteAccount.vue'

    export default {
        name: "UpdateProfil",
        props: ['showUpdateProfil', 'profil', 'updateProfilVue'],
        emits: ['close'],
        components: {
            DeleteAccount
        },
        data(){
            return {
                name: "",
                nickname: "",
                url: ""
            }
        },
        methods: {
            closeModal(){
                this.$emit('close')
            },
            onFileChange(e) {
                let file = e.target.files[0];
                this.url = URL.createObjectURL(file);
            },
            uptadeProfil() {
                let profilUpdate = {
                    name: this.name,
                    nickname: this.nickname
                }
                var formData =  new FormData()
                formData.append('profil', JSON.stringify(profilUpdate)) 
                var profilPicture = document.getElementById('profilPicture');
                formData.append('image',  profilPicture.files?.[0])
                let profil = JSON.parse(localStorage.getItem('token'))
                fetch("http://localhost:5000/api/profil/update/" + profil.accountId, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + profil.token
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
                    this.updateProfilVue(JSONres)
                    this.$emit('close')
                })
                .catch(e => {
                    this.$notify({
                        type: "warn",
                        title: e,
                    });
                });
            },
        }
};
</script>

<style scoped>
    .update-container{
        width: 50%;
        height: 50%;
        top: 25%;
        left: 25%;
        position: absolute;
        background: rgba( 255, 255, 255, 0.60 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
        backdrop-filter: blur(23px);
        border-radius: 10px;
        display: flex;
        flex-direction: row;
    }
    .update-container .update-profil{
        width: 50%;
    }
    .update-profil form{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: space-evenly;
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
    .update-profil .form{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .update-profil .form .name-nickname{
        width: 100%;
        height: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        place-items: center;
        border: none;
    }

    .name-nickname input{
        width: 70%;
        height: 2.5rem;
        border-radius: 20px;
        border: none ;
        background-color: white;
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
        font-size: 1rem;
        text-align: center;
    }
    .name-nickname input::placeholder{
        text-align: center;
        font-size: 1rem;
    }
    .name-nickname input:focus::placeholder{
        border: none;
        color: transparent;
    }
    .name-nickname input:focus{
        outline: none;
    }
    .update-profil .form .image-profil{
        width: 100%;
        height: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        place-items: center;
        border: none;
    }
    .update-profil .form .image-profil .img-profil{        
        width: 100%;
        height: 40%;
    }
    .update-profil .form .image-profil .img-profil img{        
        width: 80px;
        height: 80px;
        cursor: pointer;
        transition: 0.2s transform ease-in;
        border-radius: 50%;
        background: rgba( 255, 255, 255, 0.60 );
        box-shadow: 0 2px 12px 0 rgba( 31, 38, 135, 0.40 );
        backdrop-filter: blur(4px);
    }
    .update-profil .form .image-profil .img-profil img:hover{
        transform: scale(1.2);
    }
    .update-profil .form .image-profil .img-input{
        width: 100%;
        height: 40%;
        display: grid;
        place-items: center;
    }
    .update-profil .form .image-profil .img-input input{
        padding: 2%;
    }
    .update-profil .form .image-profil input::-webkit-file-upload-button{        
        cursor: pointer;
        border: none;
        font-size: 1rem;
        height: 2rem;
        border-radius: 20px;
        background-color: white;
        box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .update-profil .form .image-profil input::-webkit-file-upload-button:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .form button{        
        cursor: pointer;
        border: none;
        width: 50%;
        font-size: 1rem;
        height: 2rem;
        border-radius: 20px;
        background-color: white;
        box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .form button:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }

    .update-container .delete-account{
        width: 50%;
        display: flex;
        align-items: center;
    }
    .delete-account form{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 50%;
        align-items: center;
        justify-content: space-around;
    }

    @media screen and (max-width: 1250px){
        .update-container{
            width: 70%;
            top: 25%;
            left: 15%;
        }
    }
    @media screen and (max-width: 800px){
        .update-container{
            width: 85%;
            top: 25%;
            left: 7.5%;
        }
    }
    @media screen and (max-width: 600px){

        .update-container{
            width: 90%;
            left: 5%;
            flex-direction: column;
        }
        .update-container .update-profil{
            width: 100%;
            height: 65%;
        }

        .update-profil .form .name-nickname{
            width: 100%;
            height: 20%;
            flex-direction: row;
            justify-content: space-evenly;
        }
        fieldset span{
            display: none;
        }
        .name-nickname input{
            width: 35%;
        }
        .update-profil .form .image-profil{
            height: 60%;
        }


        .update-container .delete-account{
            width: 100%;
            height: 35%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
        }
        .delete-account form{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: space-around;
        }
    }
    @media screen and (max-width: 400px){
    }
</style>