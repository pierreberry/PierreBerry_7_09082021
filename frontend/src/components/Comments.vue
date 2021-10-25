<template>
  <div class="comments-container">
    <div class="comments" v-for="comment in this.comments" :key="comment.id">
      <div  class="comment">
        <p>{{ comment.comment }} {{comment.active}}
          <span v-if="comment.fk_users_comments === owner"> -
            <button  @click="commentUpdate(comment.id)" >
              <font-awesome-icon :icon="['fas', 'pencil-alt']" :style="{color: 'red'}" />
            </button>
          </span>
        </p>
      </div>
    </div>
  </div>
  <transition name="component-fade" mode="out-in">
    <UpdateComment 
      :id="this.id" 
      :commentId="this.idToUpdate" 
      :updateCommentVue="updateCommentVue" 
      :deleteCommentVue="deleteCommentVue" 
      v-if="onUpdate" @close="onUpdate = false"
    />
  </transition>
</template>

<script>
import UpdateComment from './UpdateComment.vue'

export default {
    name: 'Comments',
    props: ['id', 'comments', 'updateCommentVue' , 'deleteCommentVue'],
    components: { UpdateComment },
    data() {
      return {
        owner: JSON.parse(localStorage.getItem('token')).accountId,
        onUpdate: false,
        idToUpdate: null,
      }
    },
    updated(){
      /* const commentOwned = this.comments.filter(comment => comment.fk_users_comments === this.owner)
      let commentOwnedParsed = JSON.parse(JSON.stringify(commentOwned))
      commentOwnedParsed.forEach(function (element) {
        element.active = "false";
      }); */
      //console.log(this.comments)
    },
    methods: {
      commentUpdate(id){
        this.onUpdate = true
        this.idToUpdate = id
      }
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

  .comments-container{
    width: 100%;
    padding-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
  }
  .comments{
    padding-bottom: 1%;
    margin: 2% 0 2% 0;
    width: 70%;
    border-bottom: 1px solid;
  }
  button{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
  }

  @media screen and (max-width: 600px){
    .comments-container{
      padding-top: 15%;
      text-align: justify;
    }
  }
</style>