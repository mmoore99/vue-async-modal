'use strict';

var _VueAsyncModal = VueAsyncModal,
    Modal = _VueAsyncModal.Modal,
    ModalItem = _VueAsyncModal.ModalItem;


new Vue({
  el: '#app',
  methods: {
    openModal: function openModal() {
      var h = this.$createElement;

      this.$modal.open({
        component: {
          render: function render() {
            var h = arguments[0];

            return h(
              ModalItem,
              null,
              []
            );
          }
        }
      });
    }
  },
  components: {
    Modal: Modal,
    ModalItem: ModalItem
  }
});
//# sourceMappingURL=demo.js.map