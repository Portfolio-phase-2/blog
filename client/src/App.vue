<template>
  <div id="app">
    <Navbar :status="isLogin" :user="user" @loginin="doLogin"></Navbar>
    <div class="container">
      <div v-html="message"></div>
      <router-view :user="user"/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/headers/navbar.vue'
import axios from 'axios'
export default {
  components: {
    Navbar
  },
  created () {
    this.checkLogin()
  },
  mounted () {
    this.$eventHub.$on('notifikasy', pay => {
      console.log(pay)
      if (pay.status === true) {
        this.message = `<div class="alert alert-success alert-dismissible fade show" role="alert">
          ${pay.message}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`
      } else {
        this.message = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          ${pay.message}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`
      }
    })
  },
  data () {
    return {
      isLogin: false,
      user: {
        _id: ''
      },
      message: ''
    }
  },
  methods: {
    doLogin (data) {
      this.isLogin = data
      axios({
        url: `${this.$baseUrl}/users/one`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          this.user = found.data
        })
        .catch(err => console.log(err))
    },
    checkLogin () {
      let token = localStorage.getItem('token')
      if (token) {
        axios({
          url: `${this.$baseUrl}/users/one`,
          method: 'get',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(found => {
            this.doLogin(true)
          })
          .catch(err => console.log(err))
        // cek token valid atau kagak kata bg rama
      } else {
        this.doLogin(false)
        this.user = {}
      }
    }
  },
  watch: {
    isLogin () {
      if (!this.isLogin) {
        this.user = {}
      }
    }
  }
}
</script>
