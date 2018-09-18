<template>
    <div class="card mb-3" >
        <div class="card-body">
            ini
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
