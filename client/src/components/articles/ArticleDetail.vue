<template>
    <div class="card mb-3">
        <div class="card-body mb-3">
            <h4 class="bg-secondary text-white">{{article.title}}</h4>
              <button class="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#modalEditArticle" v-if="user._id == article.owner._id" @click="editData(article)">Edit</button>
              <button @click="deleteMyArticle(article._id)" class="btn btn-sm btn-outline-danger ml-1" v-if="user._id == article.owner._id">Delete</button>
              <br />
              <small>
              By: {{article.owner.name}} <br />
              CreatedAt: {{article.createdAt}} <br />
              {{article.comments.length}} comments in this article</small>
            <hr />
            <div v-html="article.description" class="mb-3"></div>
            <h5 class="bg-secondary text-white" v-if="article.comments.length>0">Comments</h5>
            <div class="card mb-3" v-for="com in article.comments" :key="com._id">
              <strong>{{com.owner.name}} said: </strong>
              <blockquote>{{com.comment}}</blockquote>
              <a href="#" class="text-danger" v-if="user._id == com.owner._id" @click="deleteComment(com._id)">Delete</a>
            </div>
            <div v-if="user._id">
              <textarea class="form-control mb-3" placeholder="Comment here..." v-model="comment"></textarea>
              <button class="btn btn-outline-success btn-sm float-right" @click="saveComment(article._id)">Comment</button>
            </div>
        </div>
        <!-- Modal edit Article -->
        <div class="modal fade" id="modalEditArticle" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modelTitleId">Edit Article</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                    </div>
                    <div class="modal-body">
                      <input type="text" v-model="editArtikel.title" class="form-control mb-3">
                      <textarea v-model="editArtikel.description" class="form-control mb-3"></textarea>
                      <button data-dismiss="modal" class="btn btn-outline-success mb-3 float-right" @click="updateArticle">Update Article</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id', 'user'],
  name: 'detailarticle',
  data () {
    return {
      article: {
        owner: {
          _id: ''
        },
        comments: []
      },
      comment: '',
      editArtikel: {}
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    deleteMyArticle (id) {
      axios({
        url: `${this.$baseUrl}/articles/${this.id}`,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.$router.push('/')
          this.getArticle()
          let pay = { status: true, message: 'Success for delete an article' }
          this.$eventHub.$emit('notifikasy', pay)
        })
        .catch(err => console.log(err))
    },
    getArticle () {
      axios({
        url: `${this.$baseUrl}/articles/${this.id}`,
        method: 'get'
      })
        .then(found => {
          this.article = found.data
        })
        .catch(err => console.log(err))
    },
    saveComment (article) {
      axios({
        url: `${this.$baseUrl}/comments/${article}`,
        method: 'post',
        data: {
          comment: this.comment
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.getArticle()
          this.comment = ''
          let pay = { status: true, message: 'Success for add a comment' }
          this.$eventHub.$emit('notifikasy', pay)
          this.$eventHub.$emit('refresharticle', true)
        })
        .catch(err => console.log(err))
    },
    deleteComment (id) {
      axios({
        url: `${this.$baseUrl}/comments/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.getArticle()
          this.$eventHub.$emit('refresharticle', true)
          let pay = { status: true, message: 'Success for delete a comment' }
          this.$eventHub.$emit('notifikasy', pay)
        })
        .catch(err => console.log(err))
    },
    editData (payload) {
      this.editArtikel = payload
    },
    updateArticle () {
      axios({
        url: `${this.$baseUrl}/articles/${this.id}`,
        method: 'put',
        data: {
          title: this.editArtikel.title,
          description: this.editArtikel.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.$router.push('/')
          this.$eventHub.$emit('refresharticle', true)
          this.getArticle()
          let pay = { status: true, message: 'Success for update an article' }
          this.$eventHub.$emit('notifikasy', pay)
        })
        .catch(err => console.log(err))
    }
  },
  watch: {
    '$route' (to, from) {
      this.getArticle()
    }
  }
}
</script>
