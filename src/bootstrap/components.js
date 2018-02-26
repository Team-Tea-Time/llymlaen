import Vue from 'vue'

import '../themes/default/index.scss'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import ElementUI from 'element-ui'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import FontAwesome from '@fortawesome/fontawesome'
import FontAwesomeFreeSolid from '@fortawesome/fontawesome-free-solid'

import AdminViewport from '../Components/Layout/Admin/Viewport'
import Separator from '../Components/Layout/Separator'
import TopBar from '../Components/Layout/TopBar'
import Viewport from '../Components/Layout/Viewport'

FontAwesome.library.add(FontAwesomeFreeSolid)

Vue.component(AdminViewport.name, AdminViewport)
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)
Vue.component(Separator.name, Separator)
Vue.component(TopBar.name, TopBar)
Vue.component(Viewport.name, Viewport)

// ElementUI
locale.use(lang)
Vue.use(ElementUI)
