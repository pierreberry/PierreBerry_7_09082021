<template>
<div class="update-container">
    <form @submit.prevent="uptadeComment">
        <textarea
            :placeholder="commentUpdate.comment"
            type="text"
            name="comment"
            v-model="commentUpdate.comment"
        />
        <button>Modifier le commentaire</button>
    </form>
    <button class="delete-comment" @click="deleteComment">Supprimer le commentaire</button>
    <button class="close-update" @click="$emit('close')">X</button>
</div>
    
</template>

<script>
    export default {
        name: "ModifyComment",
        props: ['id', 'commentId','updateCommentVue' ,'deleteCommentVue'],
        emits: ['close'],
        data(){
            return {
                commentUpdate: {
                    comment: ""
                }
            }
        },
        mounted() {
            let profil = JSON.parse(localStorage.getItem('token'))
            fetch("http://localhost:5000/api/posts/" + this.id + "/comments/" + this.commentId, {
                method: "GET",
                headers: {
                "Authorization": "Bearer " + profil.token
                }
            })
            .then(res => res.json())
            .then(data => this.commentUpdate.comment = data.comment)
            .catch(err => console.log(err.message));
        },
        methods: {
            closeModal(){
                this.$emit('close')
            },
            uptadeComment() {
                let profil = JSON.parse(localStorage.getItem('token'))
                fetch("http://localhost:5000/api/posts/" + this.id + "/comments/" + this.commentId, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + profil.token
                    },
                    body: JSON.stringify(this.commentUpdate)
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
                    title: "Commentaire modifié !",
                    });
                    this.updateCommentVue(JSONres.id, JSONres.comment)
                    this.$emit("close")
                })
                .catch(e => {
                    this.$notify({
                        type: "warn",
                        title: e,
                    });
                });
            },
            deleteComment() {
                let profil = JSON.parse(localStorage.getItem('token'))
                fetch("http://localhost:5000/api/posts/" + this.id + "/comments/" + this.commentId, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + profil.token
                    }
                })
                .then((response) => {return response.json()})
                .then((JSONres) => {
                    this.deleteCommentVue(JSONres)
                    this.$emit("close")
                })
                .catch(e => console.log(e));
            },
        }
};
</script>

<style scoped>
    .update-container{
        position: fixed;
        width: 80%;
        height: 50%;
        top: 25%;
        left: 10%;
        background: rgba( 255, 255, 255, 0.60 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
        backdrop-filter: blur(15px);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        place-items: center;
    }
    .update-container form{
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        place-items: center;
    }
    .update-container form textarea {
        width: 90%;
        min-height: 70%;
        place-items: center;
        border: none;
        border-radius: 20px;
        box-shadow: 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
        padding: 2%;
    }
    .update-container form textarea:focus{
        outline: none;
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }

    form button{
        cursor: pointer;
        border: none;
        width: 50%;
        font-size: 1rem;
        height: 2rem;
        border-radius: 20px;
        background-color: white;
        box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }

    form button:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }

    .delete-comment{       
        margin-bottom: 2%;
        cursor: pointer;
        border: none;
        width: 50%;
        font-size: 1rem;
        height: 2rem;
        border-radius: 20px;
        background-color: rgb(255, 67, 67);
        color: white;
        box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
    .delete-comment:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
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

    @media screen and (max-width: 600px){
        form button{
            width: 60%;
        }
        .delete-comment{
            width: 60%;
        }
    }
    @media screen and (max-width: 500px){
        form button{
            width: 80%;
        }
        .delete-comment{
            width: 80%;
        }
    }
</style>