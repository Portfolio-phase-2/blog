<template>
    <div class="mb-3" >
      <div class="card mb-3" v-for="(article, i) in articles" :key="i">
        <div class="card-body">
          <h5><router-link :to="{ name: 'articledetail', params: { id: article._id }}">{{article.title}}</router-link></h5>
          <small>
              By: {{article.owner.name}} <br />
              CreatedAt: {{article.createdAt}} <br />
              {{article.comments.length}} comments in this article</small>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['user'],
  name: 'listarticle',
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
