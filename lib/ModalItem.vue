<template lang="pug">
  transition(:name="transition === true ? 'bounce' : transition || undefined",
  @before-enter="el => beforeEnter && beforeEnter(el)",
  @after-enter="el => afterEnter && afterEnter(el)",
  @enter-cancelled="el => enterCancelled && enterCancelled(el)",
  @before-leave="el => beforeLeave && beforeLeave(el)",
  @after-leave="el => afterLeave && afterLeave(el)",
  @leave-cancelled="el => leaveCancelled && leaveCancelled(el)")
    div(:class="[$style.modal, {[$style.full]: full}]", :id="id")
      .modal-dialog
        .modal-content
          // header
          .modal-header(v-if="$slots.header", :class="{['border-b']: border}")
            slot(name="header")
          .modal-header(v-else-if="label", :class="{['border-b']: border}")
            button.close(type="button", @click="closeModal")
              span(aria-hidden="true") ×
              span.sr-only 关闭
            h4.modal-title(v-html="label")
          // body
          slot(v-if="$slots.body", name="body")
          .modal-body(v-else)
            slot
          // footer
          .modal-footer(v-if="$slots.footer", :class="{['border-t']: border}")
            slot(name="footer")
          .modal-footer(v-else-if="footer", :class="{['border-t']: border}")
            .btn.btn-default(@click="closeModal") {{ cancelText || "取消" }}
            .btn(:class="disabled ? 'btn-disabled' : 'btn-primary'", @click="confirmModal") {{ confirmText || "确定" }}
</template>
<script>
  import {warn, error} from './utils'

  export default {
    name: 'modal-item',
    props: {
      id: [Number, String],
      header: String,
      disabled: Boolean,
      footer: Boolean,
      border: {
        type: Boolean,
        default: true
      },
      full: Boolean,
      transition: [Boolean, String],
      close: Function,
      confirm: Function,
      confirmText: String,
      cancelText: String,
      beforeEnter: Function,
      afterEnter: Function,
      enterCancelled: Function,
      beforeLeave: Function,
      afterLeave: Function,
      leaveCancelled: Function
    },
    computed: {
      $style() {
        return this.$options.cssModules
      },
      label() {
        const header = this.header
        return /^\s*$/.test(header) ? '&nbsp;' : header
      }
    },
    methods: {
      closeModal() {
        this.close ? this.close(...arguments)
          : this.$modal.close(this.id || warn('there is no modal id found, then the current modal will be close!'))
      },
      confirmModal() {
        if (this.footer && this.disabled) return
        this.confirm ? this.confirm(...arguments)
          : error('you should handle the click event on the confirm btn by yourself!')
      }
    }
  }
</script>
<style lang="stylus" module>
  clearfix()
    &:before,
    &:after
      content " "
      display table
    &:after
      clear both

  :global(.modal-open) .modal
    overflow-x hidden
    overflow-y auto

  .modal
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    overflow hidden
    z-index 1050
    -webkit-overflow-scrolling touch
    outline 0

    &.full
      :global
        .modal-content
          border 0
          border-radius 0
          box-shadow none

        .modal-header,
        .modal-body
          padding 0

        .modal-body
          overflow-y auto

    :global
      .modal-dialog
        position relative
        width auto
        margin 0 auto
        pointer-events auto
        max-width 1024px

      .modal-content
        position relative
        background-color #fff
        border 1px solid #999
        border 1px solid rgba(0, 0, 0, .2)
        border-radius 6px
        box-shadow 0 3px 9px rgba(0, 0, 0, .5)
        background-clip padding-box
        outline 0

      .modal-header
        padding 10px
        border-bottom 1px solid #e5e5e5
        clearfix()

      .modal-header .close
        position relative
        z-index 10
        margin-top -2px

      .modal-title
        margin 0
        line-height (20 / 14)

      .modal-body
        position relative
        padding 10px

      .modal-footer
        padding 10px
        clearfix()
        display flex

        .btn
          flex 1
          font-size 20px

          + .btn
            margin-left 10px
</style>
