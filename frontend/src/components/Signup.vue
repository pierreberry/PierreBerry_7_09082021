<template>
  <div class="login-signup">
    <h1>Rejoins nous !</h1>
    <form @submit.prevent="inscription" method="POST">
      <div class="input-form">
        <input autocomplete="off"
          placeholder="Email"
          type="email"
          name="email"
          v-model="emailAddress"
          required
        />
        <input autocomplete="off"
          placeholder="Mot de passe"
          type="password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <div v-if="passwordError">{{ passwordError }}</div>
      <button>Créer un compte</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  props: ['changeComponent'],
  data() {
    return {
      emailAddress: "",
      password: "",
      passwordError: "",
    };
  },
  methods: {
    inscription() {
      let credential = {
        emailAddress: this.emailAddress,
        password: this.password
      }
      fetch("http://localhost:5000/api/auth/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      })
      .then((response) => {
        if(response.ok) {
          return response.json()
        }
        return response.text().then(text => {throw new Error(text)})
      })
      .then(() => {
        this.$notify({
          type: "success",
          title: "Compté crée !",
        });
        this.changeComponent('Login')
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
  .login-signup{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 70%;
      height: 90%;
  }
  .login-signup form{
      display: flex;
      flex-direction: column;
      place-items: center;
      width: 100%;
      height: 70%;
  }
  .input-form{
      margin-top: 10%;
      width: 70%;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
  }
  .input-form input{
      width: 100%;
      height: 2.5rem;
      border-radius: 20px;
      border: none ;
      background-color: white;
      box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
      font-size: 1rem;
      text-align: center;
  }
  .input-form input::placeholder{
    text-align: center;
    font-size: 1rem;
  }
  .input-form input:focus::placeholder{
    border: none;
    color: transparent;
  }
  .input-form input:focus{
    outline: none;
  }

  .login-signup button{
    cursor: pointer;
    border: none;
    width: 50%;
    font-size: 1rem;
    height: 2rem;
    border-radius: 20px;
    background-color: white;
    box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
  }
  .login-signup button:active{
    box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
  }

</style>