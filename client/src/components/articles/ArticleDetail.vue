<template>
    <div class="card mb-3">
        <div class="card-body mb-3">
            <blockquote class="blockquote">{{article.title}}</blockquote>
            <div class="card" v-for="com in article.comments" :key="com._id">
              {{ com.comment}}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  name: 'detailarticle',
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      axios({
        url: `${this.$baseUrl}/articles/${this.id}`,
        method: 'get'
      })
        .then(found => {
          this.article = found.data
        })
    }
  },
  watch: {
    '$route' (to, from) {
      this.getArticle()
    }
  }
}
</script>
