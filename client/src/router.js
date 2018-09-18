import Vue from 'vue'
import Router from 'vue-router'
import Article from './views/Article.vue'
import ListArticle from '@/components/articles/ListArticle.vue'
import ArticleDetail from '@/components/articles/ArticleDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Article,
      children: [ {
        path: '/',
        name: 'listarticles',
        component: ListArticle
      }, {
        path: '/:id',
        name: 'articledetail',
        props: true,
        component: ArticleDetail
      }]
    }
  ]
})
