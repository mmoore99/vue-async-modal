<template lang="pug">
  div(v-if="modals.length")
    div(v-if="backdrop", :class="[$style.mask, {[$style.transparent]: backdrop === 'transparent'}]", @click="toggle")
    component(v-for="{id, component, props, options} of modals",
    :is="component",
    :key="id",
    ref="modal",
    v-bind="props",
    v-show="options.show")
</template>
<script>
  import Vue from 'vue'

  import {addClass, removeClass, ensure} from './utils'

  const isPromise = promise => promise instanceof Promise

  export default {
    name: 'modal',
    props: {
      specialIds: {
        type: Array,
        default: () => []
      }
    },
    beforeCreate() {
      Object.defineProperty(Vue.prototype, '$modal', {
        value: this,
        readable: true,
        writable: process.env.NODE_ENV === 'development'
      })
    },
    data() {
      return {
        currModal: null,
        modals: []
      }
    },
    computed: {
      $style() {
        return this.$options.cssModules
      },
      backdrop() {
        return this.currModal && this.currModal.options.backdrop
      },
      currModalId() {
        return this.currModal && this.currModal.id
      }
    },
    watch: {
      currModal: modal => (modal ? addClass : removeClass)(document.body, 'modal-open')
    },
    methods: {
      clear() {
        this.modals = []
      },
      close(modalId, destroy) {
        modalId = modalId || this.currModalId
        if (!modalId) return
        const modal = this.getModal(modalId)
        if (!modal) return
        const {options} = modal
        options.show = false
        const callback = () => options.destroy || destroy
          ? this.removeModal(modalId, options.destroyed) : this.resetCurrModal(modalId)
        const modalRef = this.getModalRef(modalId)
        const modalItem = modalRef.$children[0]
        modalItem || warn(`this modal is not a Vue component, HiModal will not respect it's transition`)
        const propsData = modalItem && modalItem.$options.propsData
        propsData && propsData.transition
          ? ensure(modalRef.$el, 'animationend transitionend', callback) : callback()
      },
      resetCurrModal(modalId) {
        modalId === this.currModalId && (this.currModal = null)
      },
      removeModal(modalId, destroyed) {
        const modalIndex = this.getModalIndex(modalId)
        modalIndex + 1 && this.modals.splice(modalIndex, 1)
        this.resetCurrModal(modalId)
        destroyed && destroyed()
      },
      getModal(modalId) {
        return this.modals.find(m => m.id === modalId)
      },
      getModalIndex(modalId) {
        return this.modals.findIndex(m => m.id === modalId)
      },
      getModalRef(modalId) {
        return this.$refs.modal[this.getModalIndex(modalId)]
      },
      mount(modal) {
        const modalId = modal.id
        const m = this.getModal(modalId)
        const {component} = modal
        const {options, props} = modal
        if (m) {
          Object.assign(m.props, props)
          Object.assign(m.options, options)
          component && (m.component = component)
          modal = m
        } else {
          if (!component) throw new ReferenceError('no component passed on initialization')
          modal.options = {...options}
          modal.props = {...props}
          this.modals.push(modal)
        }
        const currModalId = this.currModalId
        if (currModalId && this.specialIds.includes(modalId)) {
          return (modal.props.backdrop = !this.currModal.options.backdrop)
        }
        currModalId === modalId || this.close()
        modal.options.show && (this.currModal = modal)
      },
      open(modal) {
        modal.id = modal.id || 'modal_' + +new Date()
        isPromise(modal.component)
          ? modal.component.then(component => this.mount(Object.assign(modal, {component}))) : this.mount(modal)
        return modal.id
      },
      toggle() {
        if (this.backdrop === 'static') return
        const close = this.currModal.props.close
        close ? close.apply(this.getModalRef(this.currModalId), arguments) : this.close()
      }
    }
  }
</script>
<style lang="stylus" module>
  :global(.modal-open)
    overflow hidden

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
