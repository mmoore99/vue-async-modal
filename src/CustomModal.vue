<template>
  <modal>
    <template slot="header">
      <h4 class="modal-title">I'm a custom modal!</h4>
    </template>
    More Content Header!
    <template slot="footer">
      Just My Footer
    </template>
  </modal>
</template>
<script>
  import Modal from './components/Modal.vue'

  export default {
    beforeMount() {
    },
    components: {
      Modal
    }
  }
</script>
