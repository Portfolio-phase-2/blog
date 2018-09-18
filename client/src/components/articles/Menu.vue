<template>
    <div class="col-md-3 col-lg-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"
                v-for="(article, i) in articles"
                :key="i">
                <router-link :to="{ name: 'articledetail', params: { id: article._id }}">{{article.title}}</router-link>
                </h5>
            </div>
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
