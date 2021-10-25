import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faPencilAlt, 
    faPlus, 
    faSignOutAlt, 
    faImage, 
    faPaperPlane, 
    faMousePointer, 
    faCheck, 
    faTimes,
    faSignInAlt,
    faHome,
    faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from '@kyvg/vue3-notification'


library.add(
    faPencilAlt,
    faPlus,
    faSignOutAlt,
    faImage,
    faPaperPlane,
    faMousePointer,
    faCheck,
    faTimes,
    faSignInAlt,
    faHome,
    faUser);

createApp(App)
    .use(router)
    .use(Notifications)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
