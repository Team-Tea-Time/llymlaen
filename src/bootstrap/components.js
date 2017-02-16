import Vue from 'vue'

import '../theme/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import ElementUI from 'element-ui'

import AdminViewport from '../Components/Layout/Admin/Viewport'
import Content from '../Components/Layout/Content'
import PageHeader from '../Components/Layout/PageHeader'
import Separator from '../Components/Layout/Separator'
import TopBar from '../Components/Layout/TopBar'

Vue.component(AdminViewport.name, AdminViewport)
Vue.component(Content.name, Content)
Vue.component(PageHeader.name, PageHeader)
Vue.component(Separator.name, Separator)
Vue.component(TopBar.name, TopBar)

// ElementUI
locale.use(lang)
Vue.use(ElementUI)
