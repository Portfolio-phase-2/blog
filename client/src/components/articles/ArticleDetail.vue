<template>
    <div class="card mb-3">
        <div class="card-body">
            <blockquote class="blockquote">{{article.title}}</blockquote>
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
  },
  methods: {
    getArticle () {
      console.log('AAA')
      axios({
        url: `${this.$baseUrl}/articles/${this.id}`,
        method: 'get'
      })
        .then(found => {
          console.log(found.data)
          this.article = found.data
        })
    }
  },
  watch: {
    id: function () {
      this.getArticle()
    }
  }
}
</script>
