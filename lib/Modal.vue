<template lang="pug">
  div(v-if="modals.length")
    div(:class="$style.mask")
    component(v-for="{id, component, props, options} of modals",
    :is="component",
    :key="id",
    ref="modal",
    v-bind="props",
    v-show="props.show")
</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'modal',
    beforeCreate() {
      Object.defineProperty(Vue.prototype, '$modal', {
        value: this,
        readable: true,
        writable: process.env.NODE_ENV === 'development'
      })
    },
    data() {
      return {
        modals: []
      }
    },
    computed: {
      $style() {
        return this.$options.cssModules
      }
    },
    methods: {
      open({id, component, props, options}) {

      }
    }
  }
</script>
<style lang="stylus" module>
  .mask
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(black, .5)

    &.transparent
      background-color rgba(black, 0)
</style>
