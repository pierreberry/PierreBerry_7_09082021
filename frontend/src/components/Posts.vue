<template>
<div v-if="this.posts.length">
  <div class="posts-container"  v-for="post in this.posts" :key="post.id">
      <router-link :to="{ name: 'Post', params: { id: post.id }}">
        <div class="posts-card" >
          <div class="title">
            <h3>{{post.title}}</h3>
          </div>
          <div v-if="post.picture" class="image">
            <img :src="post.picture" >
          </div>
          <div v-if="post.text" class="texte">
            <p>{{post.text}}</p>
          </div>
        </div>
      </router-link>
  </div>
</div>
  <div v-else>Aucun post</div>
</template>

<script>
export default {
  name: 'Posts',
  props: {
    posts: Array
  },
}
</script>


<style scoped>

.posts-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

a{
    width: 30%;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0 20px 0;
    text-decoration: none;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
    border-radius: 10px;
}
a:visited{
  color: black;
}
.posts-card{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.posts-card .title{
  width: 100%;
  height: 10%;
  display: grid;
  place-items: center;
  font-size: 2rem;
}

.posts-card .image{
  width: 100%;
  height: 50%;
}
.posts-card .image img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.posts-card .texte{
  width: 100%;
  height: 40%;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.posts-card p{
  width: 90%;
  text-align: justify;
}

@media screen and (max-width: 1250px){
  a{
    width: 50%;
    height: 450px;
  }
}
@media screen and (max-width: 800px){
  a{
    width: 60%;
    height: 350px;
  }
}
@media screen and (max-width: 600px){
    a{
      width: 70%;
      height: 300px;
    }
}
@media screen and (max-width: 400px){
      a{
        width: 90%;
        height: 250px;
      }
}

</style>
