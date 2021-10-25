<template>
  <div class="post-container" v-if="post">
    <div class="post-card">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
      </div>
      <div v-if="post.picture" class="post-picture">
        <img :src="post.picture">
      </div>
      <div v-if="post.text" class="post-text">
        <p>{{ post.text }}</p>
      </div>
    </div>
    <div class="comment-container">
      <AddComment :id="id" :showComment="showComment"/>
      <Comments :id="id" :comments="comments" :updateCommentVue="updateCommentVue" :deleteCommentVue="deleteCommentVue" />
    </div>
  </div>
  <transition name="component-fade" mode="out-in">
    <UpdatePost :updatePostVue="updatePostVue" :id="id" v-if="showUpdatePost" @close="showUpdatePost = false" />
  </transition>
    <button class="modifPost" v-if="isOwner" @click="showUpdatePost = true">
      <font-awesome-icon :icon="['fas', 'pencil-alt']" :style="{fontSize: '2em', color: 'red'}" />
    </button>
</template>

<script>

import Comments from "@/components/Comments.vue";
import AddComment from '../components/AddComment.vue';
import UpdatePost from '../components/UpdatePost.vue';

export default {
  name:"Post",
  props: ['id', 'postContent'],
  components:{
    Comments,
    AddComment,
    UpdatePost
  },
    
  data() {
    return {
      profil: JSON.parse(localStorage.getItem('token')),
      post: {},
      isOwner: false,
      showUpdatePost: false,
      comments: [],
    };
  },
  methods: {
    showComment(comment) {
      this.comments.push(comment)
    },
    updatePostVue(post){
      this.post = post
    },
    deleteCommentVue(index){
      let pos = this.comments.findIndex((obj => obj.id == index))
      this.comments.splice(pos, 1)
    },
    updateCommentVue(index, content){
      let pos = this.comments.findIndex((obj => obj.id == index))
      this.comments[pos].comment = content
    }
  },
  mounted() {
    //!!! FETCH GET POST !!!//
    fetch("http://localhost:5000/api/posts/" + this.id, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.profil.token
      }
    })
      .then(res => res.json())
      .then(data => {
        this.post = data
        if (data.fk_users_profil === this.profil.accountId) {
          this.isOwner = true
        }
      })
      .catch(err => console.log(err.message));
    
    //!!! FETCH GET COMMENT !!!//
    fetch("http://localhost:5000/api/posts/" + this.id + "/comments", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.profil.token
      }
    })
    .then(res => res.json())
    .then(data =>  {
      this.comments = data
    })
    .catch(err => console.log(err.message));

  },

};
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
  .post-container{
    width: 100%;
    min-height: 90vh;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 0 3% 0; 
  }
  .post-card{
    width: 40%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(20px);
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto; 
  }
  .post-card .post-title{
    width: 100%;
    min-height: 5rem;
    display: grid;
    place-items: center;
  }
  .post-card .post-picture{
    width: 70%;
    height: 300px;
  }
  .post-card .post-picture img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .post-card .post-text{
    text-align: justify;
    margin: 5% 0 5% 0;
    padding: 2%;
    width: 80%;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 1px 10px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(20px);;
  }

  .modifPost{
    position: absolute;
    top: 5%;
    left: 5%;
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
  .modifPost::after{
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
  .modifPost:hover::after{
    transform: translateY(0px) scale(1);
  }

  .comment-container{
    width: 40%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(20px);
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
  }

  @media screen and (max-width: 1000px){
    .post-container{
      flex-direction: column;
    }

    .post-card{
      width: 80%;
      margin: 5% 0 5% 0;
    }
    .comment-container{
      width: 80%;
      margin: 0% 0 5% 0;
    }
  }
</style>