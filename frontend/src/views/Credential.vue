<template>
    <div class="crendential-container">
        <transition name="component-fade" mode="out-in">
            <keep-alive>
                <component :changeComponent="changeComponent" v-bind:is="currentComponent"></component>
            </keep-alive>
        </transition>
        <transition name="component-fade" mode="out-in">
            <button v-if="getCurrentComponent() == 'Signup'" @click="currentComponent='Login'">J'ai déjà un compte</button>
            <button v-else @click="currentComponent='Signup'">Je crée un compte</button>
        </transition>
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
    name: "Crendential",
    components: {
        'Login': Login,
        'Signup': Signup 
    },
    data(){
        return{
            currentComponent: "Login"
        }
    },
    methods: {
        getCurrentComponent() {
            return this.currentComponent
        },
        changeComponent(newComponent){
            this.currentComponent = newComponent
            return this.currentComponent
        }
    },
}
</script>

<style scoped>

.component-fade-enter-active,
.component-fade-leave-active {
    transition: transform 0.5s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
    transform: rotate3d(0, 1, 0, 90deg);
}

.crendential-container{
    position: absolute;
    top: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 50%;
    background: rgba( 255, 255, 255, 0.60 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.40 );
    backdrop-filter: blur(4px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.crendential-container button{
    cursor: pointer;
    border: none;
    width: 50%;
    font-size: 1rem;
    height: 2rem;
    border-radius: 20px;
    background-color: white;
    box-shadow:  0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
}
.crendential-container button:active{
    box-shadow: inset 0 2px 5px 0 rgba( 31, 38, 135, 0.40 );
}

@media screen and (max-width: 1250px){
    .crendential-container{
    width: 40%;
    }
}
@media screen and (max-width: 800px){
    .crendential-container{
    width: 60%;
    }
}
@media screen and (max-width: 600px){
    .crendential-container{
    width: 80%;
    }
}
@media screen and (max-width: 400px){
    .crendential-container{
        width: 90%;
    }
}
</style>