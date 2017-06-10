const {Modal, ModalItem} = VueAsyncModal

new Vue({
  el: '#app',
  methods: {
    openModal() {
      this.$modal.open({
        component: {
          render() {
            return <ModalItem/>
          }
        }
      })
    }
  },
  components: {
    Modal,
    ModalItem
  }
})
