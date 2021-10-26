<template>
    <div class="add-comment">
        <form @submit.prevent="addComment" method="POST" autocomplete="off">
            <input class="input-add-comment"
                placeholder="Ajouter un commentaire"
                type="text"
                name="comment"
                v-model="comment"
            />
            <button>
                <font-awesome-icon :icon="['fas', 'paper-plane']" />
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddComment",
        props: ['id', 'showComment'],
        data() {
            return {
                comment: "",
            };
        },
        methods: {
            addComment() {
                if (!this.comment) {
                    this.$notify({
                        type: "warn",
                        title: "Champ du commentaire vide",
                    });
                    return
                }
                let comment = {
                    comment: this.comment,
                }
                let profil = JSON.parse(localStorage.getItem('token'))
                fetch("http://localhost:5000/api/posts/" + this.id + "/comments", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + profil.token
                    },
                    body: JSON.stringify(comment),
                }).then((response) => {
                    return response.json()
                })
                .then(JSONres => {
                    this.$notify({
                        type: "success",
                        title: "Commentaire créé !",
                    });
                    document.querySelector(".input-add-comment").value = ""
                    JSONres.fk_users_comments = profil.accountId
                    this.showComment(JSONres)
                })
                .catch(e => console.log(e));
            },
        },
    };
</script>

<style scoped>
    .add-comment{
        width: 100%;
        margin: 2%;
        position: fixed;
    }
    .input-add-comment{
        width: 70%;
        height: 2.5rem;
        border-radius: 20px;
        border: none ;
        background-color: white;
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
        font-size: 1rem;
        text-align: center;
    }
    .input-add-comment::placeholder{
        text-align: center;
        font-size: 1rem;
    }
    .input-add-comment:focus::placeholder{
        border: none;
        color: transparent;
    }
    .input-add-comment:focus{
        outline: none;
    }
    button{
        margin-left: 1%;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        background: rgba( 255, 255, 255, 0.60 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
        backdrop-filter: blur(4px);
        color: red;
        font-size: 1.2em;
    }
</style>