'use strict';

var _VueAsyncModal = VueAsyncModal,
    Modal = _VueAsyncModal.Modal,
    ModalItem = _VueAsyncModal.ModalItem;


new Vue({
  el: '#app',
  data: {
    msg: null
  },
  methods: {
    openModal: function openModal() {
      var _this = this;

      var h = this.$createElement;

      this.msg = 'will open after 1.5s';
      setTimeout(function () {
        _this.msg = 'modal opened';
      }, 2000);
      this.$modal.open({
        id: 'demo',
        props: {
          msg: this.msg
        },
        component: new Promise(function (resolve) {
          setTimeout(function () {
            return resolve({
              props: ['msg'],
              render: function render() {
                var self = _this;
                return h(
                  ModalItem,
                  {
                    attrs: {
                      header: 'Vue in 2016 - ' + self.msg,
                      footer: true,
                      close: function close() {
                        _this.msg = 'closing';
                        setTimeout(function () {
                          _this.close();
                        }, 1500);
                      },
                      confirm: function confirm() {
                        _this.msg = 'will close after 2 seconds';
                        setTimeout(function () {
                          _this.close();
                        }, 2000);
                      } }
                  },
                  [h(
                    'header',
                    null,
                    ['It\u2019s already end of 2016! During the past 12 months, Vue\u2019s growth has been consistently exceeding my expectations \u2014 the project has grown from a relatively niche framework to one that is now often compared to the biggest players in the field. Let\u2019s take a look at what happened!']
                  ), h(
                    'h2',
                    null,
                    ['2016 Stats Overview']
                  ), h(
                    'ul',
                    null,
                    [h(
                      'li',
                      null,
                      ['NPM downloads: 1,943,567 total, 1,531,217 YTD (up from 382,184 in 2015, +300%)']
                    ), h(
                      'li',
                      null,
                      ['Core repo GitHub stars: 37,664 total, ~26,000 YTD (up from ~7,600 in 2015, +240%)']
                    ), h(
                      'li',
                      null,
                      ['Core repo Pull Requests merged: 350 total, 258 YTD (up from 70 in 2015, +268%)']
                    ), h(
                      'li',
                      null,
                      ['vuejs.org page views: 21,424,759 YTD (up from 3,761,728 in 2015, +470%)']
                    ), h(
                      'li',
                      null,
                      ['vuejs.org monthly active users: 358,405 (up from 77,836 in 2015, + 360%) Side note: 42% of user sessions are from China.']
                    ), h(
                      'li',
                      null,
                      ['Chrome DevTools extension weekly active users: 84,098 (no prior year stats)']
                    )]
                  ), h(
                    'h2',
                    null,
                    ['Is It Just Hype?']
                  ), h(
                    'p',
                    null,
                    ['We certainly hope not. Vue has been around for almost 3 years now, and the growth curve has been quite consistent over the past two. We have received many positive feedback from happy in-production users, and there had been at least two HN-front-page articles this year written by Vue users detailing their positive experience with Vue. That said, Vue is not, and does not intend to be \u201Cthe next shiny thing you should switch to ASAP\u201D \u2014 its design goal is not about revolutionizing UI development paradigms; rather, it\u2019s about enabling more people to build for the web. Vue takes inspirations from many other excellent frameworks, but aims to combine and expose these ideas in an approachable and progressive fashion so that more developers could benefit from them. So, don\u2019t feel obliged to switch to it just because it\u2019s trending \u2014 but do try it out to see if it makes you a happier developer!']
                  ), h(
                    'h2',
                    null,
                    ['Going Independent']
                  ), h(
                    'p',
                    null,
                    ['In early March I decided to work on Vue full-time independently and started a Patreon campaign, which has been (to my surprise) quite successful so far. It is my first time working independently without having to report to a manager, and it has been a very liberating experience. The good part is that work no longer feels like work: I don\u2019t really have to force myself to do work because what I need to do is also what I genuinely want to do, plus I have full control over how and when to work. On the other hand, it is also the bad part: it becomes quite difficult to manage the balance between life and work, especially while being a new parent (yes I had a baby this year too!). This is something I\u2019m learning to cope with and hopefully will get better at next year. But overall, I feel that I am more motivated and fulfilled than ever before, and I\u2019d like to express my gratitude to all the Patreon backers and sponsors for making all this possible.']
                  ), h(
                    'h2',
                    null,
                    ['Launching 2.0']
                  ), h(
                    'p',
                    null,
                    ['The work on 2.0 was a big undertaking \u2014 I had been thinking about it for a long time, but only started the effort thanks to the full-time switch. The entire project was rewritten from the ground up to take advantage of completely different compilation/rendering strategies \u2014 but at the same time it had to preserve the same development experience and a largely similar API with the previous version. This also meant that we had to upgrade the surrounding ecosystem of vue-router, vuex and the build toolchain to work with the new core, plus updating the documentation for all of them. It turned out to be much more work than I anticipated: I started the first prototype of Vue 2.0 in early April, and the official launch was on Sep. 30th, after almost 6 months! The new release made Vue leaner, faster and more powerful with the new features and cross-environment capabilities. Looking back, I\u2019m really proud of the work we\u2019ve done.']
                  ), h(
                    'h2',
                    null,
                    ['Beyond a Personal Project']
                  ), h(
                    'p',
                    null,
                    ['As the scope of Vue-related projects expanded, I was fortunate enough to be joined by many awesome contributors from the community. Today, many core team members are actively contributing to all aspects of the project, from core features like server-side rendering to sub-projects like the documentation (vuejs.org), vue-router, vuex and official TypeScript integrations. I have been constantly humbled by their enthusiasm and dedication to open source work.']
                  ), h(
                    'p',
                    null,
                    ['Of course, the same appreciation goes to all other community contributors for participating in design discussions, proposing new features, triaging issues, and submitting bug fixes. We are getting more and more PRs (258 this year in the core repo alone!), with quite a few of them bringing substantial improvements to the codebase. It is the combination of everyone involved that is making the Vue ecosystem better day by day. This project wouldn\u2019t be where it\u2019s at now without your contributions!']
                  ), h(
                    'h2',
                    null,
                    ['Looking Ahead']
                  ), h(
                    'p',
                    null,
                    ['There are still many aspects that can be improved about Vue. Here\u2019s what\u2019s on our list for 2017:']
                  ), h(
                    'h3',
                    null,
                    ['Improving the Test Story']
                  ), h(
                    'p',
                    null,
                    ['Based on the feedback on Twitter, many users feel that there isn\u2019t enough information on testing Vue components and applications. This is an area we will definitely focus on improving \u2014 both by providing more guidance in the docs, and also by providing official testing utilities that makes it easier to test Vue components.']
                  ), h(
                    'h3',
                    null,
                    ['Polishing the Dev Experience']
                  ), h(
                    'p',
                    null,
                    ['We want to further polish the dev experience across the stack: better in-development tips and warnings, better server-side rendering (SSR) stack traces, performance profiling in DevTools, and better CLI templates that make it easier to use SSR or build PWAs.']
                  ), h(
                    'h3',
                    null,
                    ['Better Discoverability for the Ecosystem']
                  ), h(
                    'p',
                    null,
                    ['The Vue ecosystem has been growing rapidly, but as a result awesome-vue has become bloated and very difficult to navigate and evaluate. The team has been thinking hard about this and we are working on a project to help users identify high-quality community projects: it will be curated with a higher standard and will provide much more detailed information for each project included.']
                  ), h(
                    'h3',
                    null,
                    ['Native Rendering']
                  ), h(
                    'p',
                    null,
                    ['The collaboration with Alibaba\u2019s Weex project has made some substantial progress. Our first major goal \u2014 making Vue 2 the actual JavaScript runtime framework on top of Weex\u2019s native rendering engine \u2014 has been completed in the latest 0.9.4 release. In 2017 there will be revamped documentations, better onboarding experience and API improvements based on feedback from the community and large-scale production use at Alibaba.']
                  ), h(
                    'h3',
                    null,
                    ['Emerging Web Platform Features']
                  ), h(
                    'p',
                    null,
                    ['As new standards emerge and get implemented, we are keeping a close eye on ones that can potentially bring significant improvements to Vue. For example, it\u2019s possible to leverage ES2015 Proxy to eliminate some of the current limitations of Vue\u2019s reactivity system. We are also exploring the possibility of compiling and distributing Vue components as native Custom Elements. Right now, the biggest blocker is browser compatibility \u2014 to ensure consistent behavior in all supported browsers, it\u2019s unlikely for us to prioritize these features until the support ratio reaches a significant majority. But rest assured that we are aware of these emerging standards and already experimenting. When the time is ready, Vue will swiftly evolve to leverage these new platform capabilities.']
                  ), h(
                    'h3',
                    null,
                    ['By the Way: We Are Having a Conference in 2017!']
                  ), h(
                    'p',
                    null,
                    ['It\u2019s still in early planning stages, but visit the site and take the survey to help us make it a great event. Better yet, submit a talk to share your knowledge and experience with fellow Vue users!']
                  ), h(
                    'footer',
                    null,
                    ['If you are interested in Vue, checkout the official site to get started, and follow us on Twitter!']
                  )]
                );
              }
            });
          }, 1500);
        }),
        options: {
          backdrop: true,
          show: true
        }
      });
    },
    close: function close() {
      var _this2 = this;

      this.$modal.close();
      setTimeout(function () {
        return _this2.msg = null;
      }, 1000);
    }
  },
  components: {
    Modal: Modal
  }
});
//# sourceMappingURL=demo.js.map