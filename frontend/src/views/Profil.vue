<template>
  <div class="container-profil" v-if="this.profilStorage">
    <div class="profil-card">
        <img v-if="profil.profilPicture" :src="profil.profilPicture">
        <div v-if="profil.nickname && profil.name" class="nomination">
          <p>{{profil.nickname}}</p>
          <p>{{profil.name}}</p>
        </div>
      <span v-else>
        <font-awesome-icon class="pointer-profil" :icon="['fas', 'mouse-pointer']" :style="{fontSize: '2em', color: 'red'}" />
        Complète ton profil pour pouvoir continuer !
      </span>
      <button class="deconnection" @click="deconnection">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" :style="{fontSize: '2em', color: 'red'}" />
      </button>
      <button class="modif-profil" @click="showUpdateProfil = true">
        <font-awesome-icon :icon="['fas', 'pencil-alt']" :style="{fontSize: '2em', color: 'red'}" />
      </button>
    </div>
  </div>
  <div v-else>
    Crée un compte ou connecte toi !
    <button><router-link to="/credential">Page de connexion</router-link></button>
  </div>
  <transition name="component-fade" mode="out-in">
    <UpdateProfil :profil="this.profil" :updateProfilVue="updateProfilVue"  v-if="showUpdateProfil" @close="showUpdateProfil = false" />
  </transition>
</template>

<script>
"use strict"
import UpdateProfil from '../components/UpdateProfil.vue'

export default {
  name: "Profil",
  components:{
    UpdateProfil,
  },
  data() {
    return {
        profilStorage: JSON.parse(localStorage.getItem('token')),
        profil: {},
        showUpdateProfil: false
    }
  },
  mounted() {
    if (this.profilStorage) {      
      fetch("http://localhost:5000/api/profil/" + this.profilStorage.accountId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + this.profilStorage.token
        }
      })
        .then(res => res.json())
        .then(data => this.profil = data)
        .catch(err => console.log(err.message));
    }
  },
  methods: {
    deconnection() {
      localStorage.removeItem('token')
      this.$router.push('/credential')
    },
    updateProfilVue(profil){
      this.profil = profil
    }
  }
}
</script>

<style>
  .component-fade-enter-active,
  .component-fade-leave-active {
      transition: all 0.5s ease;
  }

  .component-fade-enter-from,
  .component-fade-leave-to {
      transform: scale(0);
  }
  .container-profil{
    position: absolute;
    top: 15%;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 70%;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .profil-card{
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .profil-card img{
    width: 175px;
    height: 175px;
    object-fit: contain;
    border-radius: 50%;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 2px 12px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
  }
  .profil-card .nomination{
    display: flex;
    width: 100%;
    font-size: 1.3em;
    justify-content: center;
  }
  .profil-card .nomination p{
    margin: 0 8% 0 8%;
  }
  .profil-card .deconnection{
    position: absolute;
    top: 10%;
    right: 10%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
    transition: 1.2s all;
  }
  .profil-card .deconnection::after{
    position: absolute;
    top: -85%;
    right: calc(-50% - 50%);
    content: 'Déconnection';
    width: 125px;
    height: 2em;
    border-radius: 20px;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 1px 10px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(40px) scale(0);
    transition: 0.5s transform ease-in-out;
  }
  .profil-card .deconnection:hover::after{
    transform: translateY(0px) scale(1);
  }

  .pointer-profil{
    position: absolute;
    top: 16%;
    left: 16%;
    width: 40px;
    height: 40px;
  }

  .profil-card .modif-profil{
    position: absolute;
    top: 10%;
    left: 10%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
  }

  .profil-card .modif-profil::after{
    position: absolute;
    top: -85%;
    right: calc(-50% - 50%);
    content: 'Modifier';
    width: 125px;
    height: 2em;
    border-radius: 20px;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 1px 10px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(40px) scale(0);
    transition: 0.5s transform ease-in-out;
  }
  .profil-card .modif-profil:hover::after{
    transform: translateY(0px) scale(1);
  }

  @media screen and (max-width: 1000px){
    .container-profil{
      width: 60%;
    }
  }
  @media screen and (max-width: 700px){
    .container-profil{
      width: 80%;
    }
  }
  @media screen and (max-width: 600px){
    .container-profil{
      width: 80%;
      height: 60%;
    }
  }
  @media screen and (max-width: 400px){
  }
</style>