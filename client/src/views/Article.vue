<template>
    <div class="row">
        <div class="col-md-3 col-lg-3">
            <Profile :user="user" v-if="user.name"></Profile>
            <Management :user="user" v-if="user.name"></Management>
            <Menu></Menu>
        </div>
        <div class="col-md-9 col-lg-9">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/articles/Menu.vue'
import Management from '@/components/contains/Manage.vue'
import Profile from '@/components/contains/Profile.vue'
export default {
  props: ['user'],
  components: {
    Menu, Management, Profile
  },
  name: 'articles'
}
</script>

<style>

</style>
