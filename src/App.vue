<template>
  <div id="app">
    <button @click="loadModal">Load Custom Modal</button>
    <custom-modal v-if="loaded"></custom-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      loadModal() {
        this.loaded = true
      }
    },
    components: {
      CustomModal: () => import('./CustomModal.vue')
    }
  }
</script>
<style src="normalize.css"></style>
