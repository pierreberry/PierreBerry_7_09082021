<template>
  <div id="nav">
    <router-link to="/credential">Credential</router-link> |
    <router-link to="/">Home</router-link> |
    <router-link to="/profil">Profil</router-link> 
  </div>
  <notifications />
    <router-view />
</template>



<style >

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
