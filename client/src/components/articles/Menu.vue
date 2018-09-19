<template>
  <div class="card mb-3">
      <div class="card-body">
          <h3>List Articles</h3>
          <h5 class="card-title"
          v-for="(article, i) in articles"
          :key="i">
          <router-link :to="{ name: 'articledetail', params: { id: article._id }}">{{article.title}}</router-link>
          </h5>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'menukiri',
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
