/*!
 * vue-async-modal Flexible modal component for Vue with ability of asynchronous lazy loading
 * Version 0.0.1
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-async-modal
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define('vue-async-modal', ['exports', 'vue'], factory) :
	(factory((global.VueAsyncModal = global.VueAsyncModal || {}),global.Vue));
}(this, (function (exports,Vue) { 'use strict';

Vue = 'default' in Vue ? Vue['default'] : Vue;

var classRegExp = function (className) { return new RegExp(("(^|\\s+)" + (className.toString().trim()) + "(\\s+|$)"), 'g'); };

var hasClass = function (el, className) { return classRegExp(className).test(el.className); };

var addClass = function (el, className) {
  var classNames = className.split(' ');
  classNames.length > 1 ? each(classNames, function (className) { return addClass(el, className); })
    : hasClass(el, className) || (el.className = ((el.className) + " " + className).trim());
};

var removeClass = function (el, className) {
  el.className = el.className.replace(classRegExp(className), ' ').trim();
};

var on = function (el, events, handler, options) {
  if ( options === void 0 ) options = false;

  events.trim().split(' ').forEach(function (event) { return el.addEventListener(event, handler, options); });
};

var off = function (el, events, handler, options) {
  if ( options === void 0 ) options = false;

  events.trim().split(' ').forEach(function (event) { return el.removeEventListener(event, handler, options); });
};

var ensure = function (el, events, handler, timeout) {
  if ( timeout === void 0 ) timeout = 600;

  return domEach(el, function (el) {
  var end;

  var wrapper = function () {
    off(el, events, wrapper);
    end = true;
    handler.apply(this, arguments);
  };

  on(el, events, wrapper);

  setTimeout(function () {
    off(el, events, wrapper);
    end || handler(false, el);
  }, timeout);
});
};

var hasConsole = typeof console !== 'undefined';

var warn$1 = function (msg) { return "development" === 'development' && hasConsole && console.warn(msg); };
var error = function (msg) { return "development" === 'development' && hasConsole && console.error(msg); };

(function(){ if(document){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".modal-open { overflow: hidden; } .Modal__mask { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,0.5); } .Modal__mask.Modal__transparent { background-color: rgba(0,0,0,0); } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();










var isPromise = function (promise) { return promise instanceof Promise; };

var Modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.modals.length)?_c('div',[(_vm.backdrop)?_c('div',{class:[_vm.$style.mask, ( obj = {}, obj[_vm.$style.transparent] = _vm.backdrop === 'transparent', obj )],on:{"click":_vm.toggle}}):_vm._e(),_vm._l((_vm.modals),function(ref){
var id = ref.id;
var component = ref.component;
var props = ref.props;
var options = ref.options;
return _c(component,_vm._b({directives:[{name:"show",rawName:"v-show",value:(options.show),expression:"options.show"}],key:id,ref:"modal",refInFor:true,tag:"component"},'component',props))})],2):_vm._e()
var obj;},staticRenderFns: [],cssModules: {"mask":"Modal__mask","transparent":"Modal__transparent"},
  name: 'modal',
  props: {
    specialIds: {
      type: Array,
      default: function () { return []; }
    }
  },
  beforeCreate: function beforeCreate() {
    Object.defineProperty(Vue.prototype, '$modal', {
      value: this,
      readable: true,
      writable: "development" === 'development'
    });
  },
  data: function data() {
    return {
      currModal: null,
      modals: []
    }
  },
  computed: {
    $style: function $style() {
      return this.$options.cssModules
    },
    backdrop: function backdrop() {
      return this.currModal && this.currModal.options.backdrop
    },
    currModalId: function currModalId() {
      return this.currModal && this.currModal.id
    }
  },
  watch: {
    currModal: function (modal) { return (modal ? addClass : removeClass)(document.body, 'modal-open'); }
  },
  methods: {
    clear: function clear() {
      this.modals = [];
    },
    close: function close(modalId, destroy) {
      var this$1 = this;

      modalId = modalId || this.currModalId;
      if (!modalId) { return }
      var modal = this.getModal(modalId);
      if (!modal) { return }
      var options = modal.options;
      options.show = false;
      var callback = function () { return options.destroy || destroy
        ? this$1.removeModal(modalId, options.destroyed) : this$1.resetCurrModal(modalId); };
      var modalRef = this.getModalRef(modalId);
      var modalItem = modalRef.$children[0];
      modalItem || warn("this modal is not a Vue component, HiModal will not respect it's transition");
      var propsData = modalItem && modalItem.$options.propsData;
      propsData && propsData.transition
        ? ensure(modalRef.$el, 'animationend transitionend', callback) : callback();
    },
    resetCurrModal: function resetCurrModal(modalId) {
      modalId === this.currModalId && (this.currModal = null);
    },
    removeModal: function removeModal(modalId, destroyed) {
      var modalIndex = this.getModalIndex(modalId);
      modalIndex + 1 && this.modals.splice(modalIndex, 1);
      this.resetCurrModal(modalId);
      destroyed && destroyed();
    },
    getModal: function getModal(modalId) {
      return this.modals.find(function (m) { return m.id === modalId; })
    },
    getModalIndex: function getModalIndex(modalId) {
      return this.modals.findIndex(function (m) { return m.id === modalId; })
    },
    getModalRef: function getModalRef(modalId) {
      return this.$refs.modal[this.getModalIndex(modalId)]
    },
    mount: function mount(modal) {
      var modalId = modal.id;
      var m = this.getModal(modalId);
      var component = modal.component;
      var options = modal.options;
      var props = modal.props;
      if (m) {
        Object.assign(m.props, props);
        Object.assign(m.options, options);
        component && (m.component = component);
        modal = m;
      } else {
        if (!component) { throw new ReferenceError('no component passed on initialization') }
        modal.options = Object.assign({}, options);
        modal.props = Object.assign({}, props);
        this.modals.push(modal);
      }
      var currModalId = this.currModalId;
      if (currModalId && this.specialIds.includes(modalId)) {
        return (modal.props.backdrop = !this.currModal.options.backdrop)
      }
      currModalId === modalId || this.close();
      modal.options.show && (this.currModal = modal);
    },
    open: function open(modal) {
      var this$1 = this;

      modal.id = modal.id || 'modal_' + +new Date();
      isPromise(modal.component)
        ? modal.component.then(function (component) { return this$1.mount(Object.assign(modal, {component: component})); }) : this.mount(modal);
      return modal.id
    },
    toggle: function toggle() {
      if (this.backdrop === 'static') { return }
      var close = this.currModal.props.close;
      close ? close.apply(this.getModalRef(this.currModalId), arguments) : this.close();
    }
  }
};

(function(){ if(document){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".modal-open .ModalItem__modal { overflow-x: hidden; overflow-y: auto; } .ModalItem__modal { position: fixed; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden; z-index: 1050; -webkit-overflow-scrolling: touch; outline: 0; } .ModalItem__modal.ModalItem__full .modal-content { border: 0; border-radius: 0; box-shadow: none; } .ModalItem__modal.ModalItem__full .modal-header, .ModalItem__modal.ModalItem__full .modal-body { padding: 0; } .ModalItem__modal.ModalItem__full .modal-body { overflow-y: auto; } .ModalItem__modal .modal-dialog { position: relative; width: auto; margin: 0 auto; pointer-events: auto; max-width: 1024px; } .ModalItem__modal .modal-content { position: relative; background-color: #fff; border: 1px solid #999; border: 1px solid rgba(0,0,0,0.2); border-radius: 6px; box-shadow: 0 3px 9px rgba(0,0,0,0.5); background-clip: padding-box; outline: 0; } .ModalItem__modal .modal-header { padding: 10px; border-bottom: 1px solid #e5e5e5; } .ModalItem__modal .modal-header:before, .ModalItem__modal .modal-header:after { content: \" \"; display: table; } .ModalItem__modal .modal-header:after { clear: both; } .ModalItem__modal .modal-header .close { position: relative; z-index: 10; margin-top: -2px; } .ModalItem__modal .modal-title { margin: 0; line-height: 1.428571428571429; } .ModalItem__modal .modal-body { position: relative; padding: 10px; } .ModalItem__modal .modal-footer { padding: 10px; display: flex; } .ModalItem__modal .modal-footer:before, .ModalItem__modal .modal-footer:after { content: \" \"; display: table; } .ModalItem__modal .modal-footer:after { clear: both; } .ModalItem__modal .modal-footer .btn { flex: 1; font-size: 20px; } .ModalItem__modal .modal-footer .btn + .btn { margin-left: 10px; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();






























var ModalItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition === true ? 'bounce' : _vm.transition || undefined},on:{"before-enter":function (el) { return _vm.beforeEnter && _vm.beforeEnter(el); },"after-enter":function (el) { return _vm.afterEnter && _vm.afterEnter(el); },"enter-cancelled":function (el) { return _vm.enterCancelled && _vm.enterCancelled(el); },"before-leave":function (el) { return _vm.beforeLeave && _vm.beforeLeave(el); },"after-leave":function (el) { return _vm.afterLeave && _vm.afterLeave(el); },"leave-cancelled":function (el) { return _vm.leaveCancelled && _vm.leaveCancelled(el); }}},[_c('div',{class:[_vm.$style.modal, ( obj = {}, obj[_vm.$style.full] = _vm.full, obj )],attrs:{"id":_vm.id}},[_c('div',{staticClass:"modal-dialog"},[_c('div',{staticClass:"modal-content"},[(_vm.$slots.header)?_c('div',{staticClass:"modal-header",class:( obj$1 = {}, obj$1['border-b'] = _vm.border, obj$1 )},[_vm._t("header")],2):(_vm.label)?_c('div',{staticClass:"modal-header",class:( obj$2 = {}, obj$2['border-b'] = _vm.border, obj$2 )},[_c('button',{staticClass:"close",attrs:{"type":"button"},on:{"click":_vm.closeModal}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")]),_c('span',{staticClass:"sr-only"},[_vm._v("关闭")])]),_c('h4',{staticClass:"modal-title",domProps:{"innerHTML":_vm._s(_vm.label)}})]):_vm._e(),(_vm.$slots.body)?_vm._t("body"):_c('div',{staticClass:"modal-body"},[_vm._t("default")],2),(_vm.$slots.footer)?_c('div',{staticClass:"modal-footer",class:( obj$3 = {}, obj$3['border-t'] = _vm.border, obj$3 )},[_vm._t("footer")],2):(_vm.footer)?_c('div',{staticClass:"modal-footer",class:( obj$4 = {}, obj$4['border-t'] = _vm.border, obj$4 )},[_c('div',{staticClass:"btn btn-default",on:{"click":_vm.closeModal}},[_vm._v(_vm._s(_vm.cancelText || "取消"))]),_c('div',{staticClass:"btn",class:_vm.disabled ? 'btn-disabled' : 'btn-primary',on:{"click":_vm.confirmModal}},[_vm._v(_vm._s(_vm.confirmText || "确定"))])]):_vm._e()],2)])])])
var obj;
var obj$1;
var obj$2;
var obj$3;
var obj$4;},staticRenderFns: [],cssModules: {"modal":"ModalItem__modal","full":"ModalItem__full"},
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
    $style: function $style() {
      return this.$options.cssModules
    },
    label: function label() {
      var header = this.header;
      return /^\s*$/.test(header) ? '&nbsp;' : header
    }
  },
  methods: {
    closeModal: function closeModal() {
      this.close ? (ref = this).close.apply(ref, arguments)
        : this.$modal.close(this.id || warn$1('there is no modal id found, then the current modal will be close!'));
      var ref;
    },
    confirmModal: function confirmModal() {
      if (this.footer && this.disabled) { return }
      this.confirm ? (ref = this).confirm.apply(ref, arguments)
        : error('you should handle the click event on the confirm btn by yourself!');
      var ref;
    }
  }
};

exports.Modal = Modal;
exports.ModalItem = ModalItem;

Object.defineProperty(exports, '__esModule', { value: true });

})));
