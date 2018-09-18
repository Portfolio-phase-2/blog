<template>
    <div class="row">
        <Menu @setarticles="setarticles"></Menu>
        <div class="col-md-9 col-lg-9">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/articles/Menu.vue'
export default {
  components: {
    Menu
  },
  name: 'articles'
}
</script>

<style>

</style>
