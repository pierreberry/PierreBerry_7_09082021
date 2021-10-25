<template>
  <div class="login-signup">
    <h1>Connecte-toi !</h1>
    <form @submit.prevent="connection" method="POST">
      <div class="input-form">
        <input
          placeholder="Email"
          type="email"
          name="email"
          v-model="emailAddress"
          required
        />
        <input
          placeholder="Mot de passe"
          type="text"
          name="password"
          v-model="password"
          required
        />
      </div>
      <button>Connexion</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      profil: null,
      emailAddress: "",
      password: "",
      passwordError: "",
      messageError: ""
    };
  },
  methods: {
    connection() {
      let credential = {
        emailAddress: this.emailAddress,
        password: this.password
      }
      fetch("http://localhost:5000/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      }).then((response) => {
        if(response.ok) {
          return response.json()
        }
        return response.text().then(text => {throw new Error(text)})
      })
      .then(data => {
        this.profil = {
          token: data.token,
          accountId: data.accountId,
          emailAddress: this.emailAddress
        }
        localStorage.setItem('token', JSON.stringify(this.profil))

        this.$notify({
          type: "success",
          title: "Connecté !",
        });
        this.$router.push('/')
      })
      .catch((e) => {
        this.$notify({
          type: "warn",
          title: e,
        });
      })
    },
  },
  mounted(){
    let data = JSON.parse(localStorage.getItem('token'))
    if (data) {      
      this.profil = {
        token: data.token,
        accountId: data.accountId,
        emailAddress: this.emailAddress
      }
    }
  },
  unmounted(){
    if (!this.profil) {
      this.$notify({
        type: "warn",
        title: "Connectez vous ou créer un compte :)",
      });
      this.$router.push('/credential')
    }
  },
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