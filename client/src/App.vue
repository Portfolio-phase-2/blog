<template>
  <div id="app">
    <Navbar :status="isLogin" :user="user" @loginin="doLogin"></Navbar>
    <div class="container">
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
  data () {
    return {
      isLogin: false,
      user: {}
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
        this.isLogin = true
      } else {
        this.isLogin = false
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
