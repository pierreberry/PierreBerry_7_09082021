<template>
  <div class="home">
    <transition name="component-fade" mode="out-in">
      <AddPost :showMyPost="showMyPost" v-if="showAddPost" @close="showAddPost = false" />
    </transition>
      <Posts :posts="posts" />
    <button class="addPost" @click="showAddPost = true">
      <font-awesome-icon :icon="['fas', 'plus']" :style="{fontSize: '2em', color: 'red'}" />
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'
import AddPost from "@/components/AddPost.vue";

export default {
  name: 'Home',
  components: {
    Posts,
    AddPost
  },
  data() {
    return{
      posts: [],
      showAddPost: false
    }
  },
  methods: {
    showMyPost(post) {
      this.posts.push(post)
      this.$emit('close')
    }
  },
  beforeMount(){
    if(!localStorage.getItem('token')){
      this.$router.push("/credential")
    }
  },
  mounted() {
    fetch("http://localhost:5000/api/posts")
        .then(res => res.json())
        .then(data => this.posts = data )        
        .catch(err => console.log(err.message))
  },
}
</script>

<style scoped>

  .component-fade-enter-active,
  .component-fade-leave-active {
      transition: all 0.5s ease;
  }

  .component-fade-enter-from,
  .component-fade-leave-to {
      transform: scale(0);
  }

  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .addPost{
    position: absolute;
    top: 10%;
    left: 25%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
  }

  @media screen and (max-width: 1250px){
    .addPost{
      top: 5%;
      left: 10%;
    }
  }
  @media screen and (max-width: 800px){
    .addPost{
      top: 90%;
      left: 85%;
    }
  }
  @media screen and (max-width: 400px){
  }
</style>