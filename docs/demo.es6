const {Modal, ModalItem} = VueAsyncModal

new Vue({
  el: '#app',
  data: {
    msg: null
  },
  methods: {
    openModal() {
      this.msg = 'will open after 1.5s'
      setTimeout(() => {
        this.msg = 'modal opened'
      }, 2000)
      this.$modal.open({
        id: 'demo',
        props: {
          msg: this.msg
        },
        component: new Promise(resolve => {
          setTimeout(() => resolve({
            props: ['msg'],
            render: () => {
              const self = this
              return <ModalItem
                header={`Vue in 2016 - ${self.msg}`}
                footer={true}
                close={() => {
                  this.msg = 'closing'
                  setTimeout(() => {
                    this.close()
                  }, 1500)
                }}
                confirm={() => {
                  this.msg = 'will close after 2 seconds'
                  setTimeout(() => {
                    this.close()
                  }, 2000)
                }}>
                <header>
                  It’s already end of 2016! During the past 12 months, Vue’s growth has been consistently exceeding my
                  expectations — the project has grown from a relatively niche framework to one that is now often
                  compared
                  to the biggest players in the field. Let’s take a look at what happened!
                </header>

                <h2>2016 Stats Overview</h2>
                <ul>
                  <li>
                    NPM downloads: 1,943,567 total, 1,531,217 YTD (up from 382,184 in 2015, +300%)
                  </li>
                  <li>
                    Core repo GitHub stars: 37,664 total, ~26,000 YTD (up from ~7,600 in 2015, +240%)
                  </li>
                  <li>
                    Core repo Pull Requests merged: 350 total, 258 YTD (up from 70 in 2015, +268%)
                  </li>
                  <li>
                    vuejs.org page views: 21,424,759 YTD (up from 3,761,728 in 2015, +470%)
                  </li>
                  <li>
                    vuejs.org monthly active users: 358,405 (up from 77,836 in 2015, + 360%) Side note: 42% of user
                    sessions
                    are from China.
                  </li>
                  <li>
                    Chrome DevTools extension weekly active users: 84,098 (no prior year stats)
                  </li>
                </ul>

                <h2>Is It Just Hype?</h2>
                <p>
                  We certainly hope not. Vue has been around for almost 3 years now, and the growth curve has been quite
                  consistent over the past two. We have received many positive feedback from happy in-production users,
                  and
                  there had been at least two HN-front-page articles this year written by Vue users detailing their
                  positive
                  experience with Vue. That said, Vue is not, and does not intend to be “the next shiny thing you should
                  switch to ASAP” — its design goal is not about revolutionizing UI development paradigms; rather, it’s
                  about enabling more people to build for the web. Vue takes inspirations from many other excellent
                  frameworks, but aims to combine and expose these ideas in an approachable and progressive fashion so
                  that
                  more developers could benefit from them. So, don’t feel obliged to switch to it just because it’s
                  trending
                  — but do try it out to see if it makes you a happier developer!
                </p>

                <h2>Going Independent</h2>
                <p>
                  In early March I decided to work on Vue full-time independently and started a Patreon campaign, which
                  has
                  been (to my surprise) quite successful so far. It is my first time working independently without
                  having
                  to
                  report to a manager, and it has been a very liberating experience. The good part is that work no
                  longer
                  feels like work: I don’t really have to force myself to do work because what I need to do is also what
                  I
                  genuinely want to do, plus I have full control over how and when to work. On the other hand, it is
                  also
                  the bad part: it becomes quite difficult to manage the balance between life and work, especially while
                  being a new parent (yes I had a baby this year too!). This is something I’m learning to cope with and
                  hopefully will get better at next year. But overall, I feel that I am more motivated and fulfilled
                  than
                  ever before, and I’d like to express my gratitude to all the Patreon backers and sponsors for making
                  all
                  this possible.
                </p>

                <h2>Launching 2.0</h2>
                <p>
                  The work on 2.0 was a big undertaking — I had been thinking about it for a long time, but only started
                  the
                  effort thanks to the full-time switch. The entire project was rewritten from the ground up to take
                  advantage of completely different compilation/rendering strategies — but at the same time it had to
                  preserve the same development experience and a largely similar API with the previous version. This
                  also
                  meant that we had to upgrade the surrounding ecosystem of vue-router, vuex and the build toolchain to
                  work
                  with the new core, plus updating the documentation for all of them. It turned out to be much more work
                  than I anticipated: I started the first prototype of Vue 2.0 in early April, and the official launch
                  was
                  on Sep. 30th, after almost 6 months! The new release made Vue leaner, faster and more powerful with
                  the
                  new features and cross-environment capabilities. Looking back, I’m really proud of the work we’ve
                  done.
                </p>

                <h2>Beyond a Personal Project</h2>
                <p>
                  As the scope of Vue-related projects expanded, I was fortunate enough to be joined by many awesome
                  contributors from the community. Today, many core team members are actively contributing to all
                  aspects
                  of
                  the project, from core features like server-side rendering to sub-projects like the documentation
                  (vuejs.org), vue-router, vuex and official TypeScript integrations. I have been constantly humbled by
                  their enthusiasm and dedication to open source work.
                </p>
                <p>
                  Of course, the same appreciation goes to all other community contributors for participating in design
                  discussions, proposing new features, triaging issues, and submitting bug fixes. We are getting more
                  and
                  more PRs (258 this year in the core repo alone!), with quite a few of them bringing substantial
                  improvements to the codebase. It is the combination of everyone involved that is making the Vue
                  ecosystem
                  better day by day. This project wouldn’t be where it’s at now without your contributions!
                </p>

                <h2>Looking Ahead</h2>
                <p>There are still many aspects that can be improved about Vue. Here’s what’s on our list for 2017:</p>

                <h3>Improving the Test Story</h3>
                <p>
                  Based on the feedback on Twitter, many users feel that there isn’t enough information on testing Vue
                  components and applications. This is an area we will definitely focus on improving — both by providing
                  more guidance in the docs, and also by providing official testing utilities that makes it easier to
                  test
                  Vue components.
                </p>

                <h3>Polishing the Dev Experience</h3>
                <p>
                  We want to further polish the dev experience across the stack: better in-development tips and
                  warnings,
                  better server-side rendering (SSR) stack traces, performance profiling in DevTools, and better CLI
                  templates that make it easier to use SSR or build PWAs.
                </p>

                <h3>Better Discoverability for the Ecosystem</h3>
                <p>
                  The Vue ecosystem has been growing rapidly, but as a result awesome-vue has become bloated and very
                  difficult to navigate and evaluate. The team has been thinking hard about this and we are working on a
                  project to help users identify high-quality community projects: it will be curated with a higher
                  standard
                  and will provide much more detailed information for each project included.
                </p>

                <h3>Native Rendering</h3>
                <p>
                  The collaboration with Alibaba’s Weex project has made some substantial progress. Our first major goal
                  —
                  making Vue 2 the actual JavaScript runtime framework on top of Weex’s native rendering engine — has
                  been
                  completed in the latest 0.9.4 release. In 2017 there will be revamped documentations, better
                  onboarding
                  experience and API improvements based on feedback from the community and large-scale production use at
                  Alibaba.
                </p>

                <h3>Emerging Web Platform Features</h3>
                <p>
                  As new standards emerge and get implemented, we are keeping a close eye on ones that can potentially
                  bring
                  significant improvements to Vue. For example, it’s possible to leverage ES2015 Proxy to eliminate some
                  of
                  the current limitations of Vue’s reactivity system. We are also exploring the possibility of compiling
                  and
                  distributing Vue components as native Custom Elements. Right now, the biggest blocker is browser
                  compatibility — to ensure consistent behavior in all supported browsers, it’s unlikely for us to
                  prioritize these features until the support ratio reaches a significant majority. But rest assured
                  that
                  we
                  are aware of these emerging standards and already experimenting. When the time is ready, Vue will
                  swiftly
                  evolve to leverage these new platform capabilities.
                </p>

                <h3>By the Way: We Are Having a Conference in 2017!</h3>
                <p>
                  It’s still in early planning stages, but visit the site and take the survey to help us make it a great
                  event. Better yet, submit a talk to share your knowledge and experience with fellow Vue users!
                </p>

                <footer>
                  If you are interested in Vue, checkout the official site to get started, and follow us on Twitter!
                </footer>
              </ModalItem>
            }
          }), 1500)
        }),
        options: {
          backdrop: true,
          show: true
        }
      })
    },
    close() {
      this.$modal.close()
      setTimeout(() => this.msg = null, 1000)
    }
  },
  components: {
    Modal
  }
})
