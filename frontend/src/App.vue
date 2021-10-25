<template>
  <div id="nav">
    <router-link class="sign-in" to="/credential">
      <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
    </router-link> |
    <router-link class="home" to="/">
      <font-awesome-icon :icon="['fas', 'home']" />
    </router-link> |
    <router-link  class="profil" to="/profil">
      <font-awesome-icon :icon="['fas', 'user']" />
    </router-link> 
  </div>
  <notifications />
  <router-view />
</template>



<style>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  place-items: center;
  height: 100%;
  width: 100%;
}

#nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 30%;
  height: 3rem;
  background: rgba( 255, 255, 255, 0.60 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
  backdrop-filter: blur(4px);
  border-radius: 50px 50px 0px 0px;
  z-index: 1000;
}

#nav a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
  font-size: 2rem;
}

  .sign-in::after{
    position: absolute;
    content: 'Connexion';
    width: 20%;
    top: -80%;
    font-size: .5em;
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
  .sign-in:hover::after{
    transform: translateY(0px) scale(1);
  }

  .home::after{
    position: absolute;
    content: 'Accueil';
    width: 20%;
    top: -80%;
    font-size: .5em;
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
  .home:hover::after{
    transform: translateY(0px) scale(1);
  }

  .profil::after{
    position: absolute;
    content: 'Profil';
    width: 20%;
    top: -80%;
    font-size: .5em;
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

  .profil:hover::after{
    transform: translateY(0px) scale(1);
  }
#nav a.router-link-exact-active {
  color: red;
}

@media screen and (max-width: 1250px)
{
  #nav {
    width: 80%;
  }
}
@media screen and (max-width: 400px)
{
  #nav {
    width: 100%;
  }
}
</style>
