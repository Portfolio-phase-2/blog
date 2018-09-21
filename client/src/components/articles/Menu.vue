<template>
  <div class="card mb-3">
      <div class="card-body">
          <h3>List Articles</h3>
          <h6 class="card-title"
          v-for="(article, i) in articles"
          :key="i">
          <router-link :to="{ name: 'articledetail', params: { id: article._id }}">{{article.title}}</router-link>
          </h6>
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
  mounted () {
    this.$eventHub.$on('refresharticle', pay => {
      this.getAllArticle()
    })
  },
  created () {
    this.getAllArticle()
  },
  methods: {
    getAllArticle () {
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
