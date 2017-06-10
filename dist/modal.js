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

(function(){ if(document){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".Modal__mask { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,0.5); } .Modal__mask.Modal__transparent { background-color: rgba(0,0,0,0); } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();










var Modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.modals.length)?_c('div',[_c('div',{class:_vm.$style.mask}),_vm._l((_vm.modals),function(ref){
var id = ref.id;
var component = ref.component;
var props = ref.props;
var options = ref.options;
return _c(component,_vm._b({directives:[{name:"show",rawName:"v-show",value:(props.show),expression:"props.show"}],key:id,ref:"modal",refInFor:true,tag:"component"},'component',props))})],2):_vm._e()},staticRenderFns: [],cssModules: {"mask":"Modal__mask","transparent":"Modal__transparent"},
  name: 'modal',
  beforeCreate: function beforeCreate() {
    Object.defineProperty(Vue.prototype, '$modal', {
      value: this,
      readable: true,
      writable: "development" === 'development'
    });
  },
  data: function data() {
    return {
      modals: []
    }
  },
  computed: {
    $style: function $style() {
      return this.$options.cssModules
    }
  },
  methods: {
    open: function open(ref) {
      var id = ref.id;
      var component = ref.component;
      var props = ref.props;
      var options = ref.options;


    }
  }
};

(function(){ if(document){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" /*# sourceMappingURL=ModalItem.vue.map */"; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();



var ModalItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.$style.modalItem})},staticRenderFns: [],};

exports.Modal = Modal;
exports.ModalItem = ModalItem;

Object.defineProperty(exports, '__esModule', { value: true });

})));
