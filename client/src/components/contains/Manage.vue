<template>
    <div class="card mb-3">
        <div class="card-body">
            <h4 class="card-title">Management</h4>
            <button class="btn btn-outline-success btn-block" data-toggle="modal" data-target="#modalAddArticle">Add Article</button>
            <button v-if="user.role=='admin'" class="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#modalCategoryAdd">Add Category</button>
        </div>
        <!-- Modal add Article -->
        <div class="modal fade" id="modalAddArticle" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modelTitleId">Add Article</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <input type="text" placeholder="Title" class="form-control mb-3" v-model="title">
                            <select v-model="category" placeholder="Category" class="form-control mb-3">
                                <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
                            </select>
                            <textarea v-model="description" rows="10" placeholder="Description" class="form-control mb-3"></textarea>
                            <button type="submit" @click="savearticle" class="btn btn-outline-success btn-block mb-3" data-dismiss="modal">Save Article</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal add category -->
        <div class="modal fade" id="modalCategoryAdd" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modelTitleId">Add Category</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <input type="text" placeholder="Category" class="form-control mb-3" v-model="category">
                            <button type="submit" @click="savecategory" class="btn btn-outline-success btn-block mb-3" data-dismiss="modal">Save Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['user'],
  name: 'management',
  created () {
    this.getCategories()
  },
  data () {
    return {
      category: '',
      categories: []
    }
  },
  methods: {
    savecategory () {
      axios({
        url: `${this.$baseUrl}/categories`,
        method: 'post',
        data: {
          name: this.category
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          alert('success')
        })
    },
    savearticle () {
      axios({
        url: `${this.$baseUrl}/articles`,
        method: 'post',
        data: {
          title: this.title,
          description: this.description,
          category: this.category
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          alert('success add category')
        })
        .catch(err => console.log(err))
    },
    getCategories () {
      axios({
        url: `${this.$baseUrl}/categories`,
        method: 'get'
      })
        .then(found => {
          this.categories = found.data
        })
    }
  }
}
</script>
