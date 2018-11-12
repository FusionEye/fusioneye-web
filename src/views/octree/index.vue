<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div> -->
    <!-- <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <iframe src="http://192.168.1.12" frameborder="0" width="100%" height="900" allowtransparency></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
