<template>
    <div class="card mb-3">
        <div class="card-body">
            <h4 class="card-title">{{user.name}}</h4>
            <p class="card-text">Text</p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['user'],
  name: 'profile'
}
</script>
