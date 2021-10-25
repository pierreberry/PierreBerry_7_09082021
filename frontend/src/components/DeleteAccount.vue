<template>
    <form @submit.prevent="deleteAccount" class="form" autocomplete="off">
        <fieldset class="email-confirm">
            <legend>
                Suppression de compte
            </legend>
            <label for="emailAddress">Confirmer votre mail</label>
            <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                v-model="emailAddress"
            />
            <div class="email-confirmed">
                <p v-if="emailAddress != emailToConfirm" style="color:red">{{emailAddress}}</p>
                <p v-else style="color:green">{{emailAddress}}</p>
            </div>
        </fieldset>

        <div class="button-delete">
            <transition name="component-fade" mode="out-in">
                <button v-if="emailAddress == emailToConfirm">Supprimer le compte</button>
            </transition>
        </div>
    </form>
</template>

<script>
export default {
    name: "DeleteAccount",
    data(){
        return {
            emailToConfirm: JSON.parse(localStorage.getItem("token")).emailAddress,
            emailAddress: ""
        }
    },
    methods: {
        deleteAccount() {
            let emailConfirmation = {
                emailAddress: this.emailAddress
            }
            let profil = JSON.parse(localStorage.getItem('token'))
            fetch("http://localhost:5000/api/auth/deleteaccount/" + profil.accountId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + profil.token
                },
                body: JSON.stringify(emailConfirmation),
            })
            .then((response) => {return response.json()})
            .then(() => {
                localStorage.removeItem('token')
                this.$router.push('/credential')
            })
            .catch(e => console.log(e));
        },
    }
};
</script>

<style scoped>
    .email-confirm{
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        place-items: center;
        border: none;
    }
    .email-confirm input{
        width: 60%;
        height: 2.5rem;
        border-radius: 20px;
        border: none ;
        background-color: white;
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
        font-size: 1rem;
        text-align: center;
    }
    .email-confirm input:focus{
        outline: none;
    }
    .email-confirmed{
        width: 100%;
        height: 10%;
    }
    .button-delete{
        width: 100%;
        height: 20%;
    }
    .form button{        
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
    .form button:active{
        box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
    }
</style>

