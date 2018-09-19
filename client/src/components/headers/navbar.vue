<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
      <a class="navbar-brand" href="/">Tulisin</a>
      <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">My Articles</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
              <a class="dropdown-item" href="#">Action 1</a>
              <a class="dropdown-item" href="#">Action 2</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" v-if="!status" href="#" data-toggle="modal" data-target="#modalLogin"> Sign In </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="status" href="#"> {{user.name}} </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="status" href="#" @click="doLogout"> Sign Out </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="!status" href="#" data-toggle="modal" data-target="#modalRegister">Register</a>
          </li>
          <!-- Modal login -->
          <div :class="{modal: true, fade: true}" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="modelTitleId">Sign in, please</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <input type="email" v-model="email" placeholder="Email" class="form-control mb-3" required autofocus>
                    <input type="password" v-model="password" class="form-control mb-3" placeholder="Password">
                    <button type="submit" @click="doLogin" data-dismiss="modal" class="btn btn-outline-dark btn-block mb-3">Sign In</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal register -->
          <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="modelTitleId">Sign Up for free</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form action="">
                      <input type="text" placeholder="Full Name" class="form-control mb-3" required autofocus>
                      <input type="email" placeholder="Email" class="form-control mb-3" required>
                      <input type="password" class="form-control mb-3" placeholder="Password">
                      <button type="submit" data-dismiss="modal" class="btn btn-outline-dark btn-block mb-3">Sign Up</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </ul>
      </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navbar',
  props: ['status', 'user'],
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    doLogin (a) {
      if (a.isTrusted) {
        axios({
          url: `${this.$baseUrl}/users/signin`,
          method: 'post',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(found => {
            let token = found.data.token
            localStorage.setItem('token', token)
            this.$emit('loginin', true)
          })
          .catch(err => console.log(err))
      } else {
        alert('Not true')
      }
    },
    doLogout () {
      localStorage.removeItem('token')
      this.$emit('loginin', false)
    }
  }
}
</script>
