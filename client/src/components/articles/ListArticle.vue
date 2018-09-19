<template>
    <div class="mb-3" >
      <div class="card mb-3" v-for="(article, i) in articles" :key="i">
        <div class="card-body">
          <h5><router-link :to="{ name: 'articledetail', params: { id: article._id }}">{{article.title}}</router-link></h5>
          <hr>
          <div v-html="article.description"></div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'listarticle',
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.getAllArticle()
  },
  methods: {
    getAllArticle () {
      console.log('object')
      axios({
        url: `${this.$baseUrl}/articles`,
        method: 'get'
      })
        .then(found => {
          this.articles = found.data
        })
    }
  }
}
</script>

<style>

</style>
