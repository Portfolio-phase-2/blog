<template>
  <div id="app">
    <Navbar :status="isLogin" @loginin="doLogin"></Navbar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/headers/navbar.vue'
export default {
  components: {
    Navbar
  },
  created () {
    this.checkLogin()
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    doLogin (data) {
      this.isLogin = data
    },
    checkLogin () {
      let token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  watch: {
  }
}
</script>
