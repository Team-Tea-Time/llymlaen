import Vue from 'vue'

import '../theme/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import {
  Button,
  Card,
  Col,
  Dialog,
  Form,
  FormItem,
  Input,
  Loading,
  Option,
  Row,
  Select
} from 'element-ui'

import Content from '../Components/Layout/Content'
import PageHeader from '../Components/Layout/PageHeader'
import Separator from '../Components/Layout/Separator'
import TopBar from '../Components/Layout/TopBar'

Vue.component(Content.name, Content)
Vue.component(PageHeader.name, PageHeader)
Vue.component(Separator.name, Separator)
Vue.component(TopBar.name, TopBar)

// ElementUI
locale.use(lang)
Vue.use(Button)
Vue.use(Card)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Option)
Vue.use(Row)
Vue.use(Select)
