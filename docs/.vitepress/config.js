import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/SyoAngularAsk/",
  title: "SyoAngularAsk",
  description: "Docs para AngularJS",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Apresentação', link: '/presentation' },
      { text: 'Instalação', link: '/install' },
      { text: 'Tutorial', link: '/tutorial/hello-angularjs' }
    ],

    sidebar: {
      "/": {
          text: 'Docs',
          items: [
            { text: 'Apresentação', link: '/presentation' },
            { text: 'Instalação', link: '/install' },
            { text: 'Tutorial', link: '/tutorial/hello-angularjs' }
          ]
      },
      '/tutorial/': {
          text: 'Tutorial',
          items: [
            { text: 'Hello AngularJS', link: '/tutorial/hello-angularjs' },
            { text: 'Templates e funcionalidades', link: '/tutorial/templates-and-features' },
          ]
        }
      },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FelipeRhoden/SyoAngularAsk' }
    ]
  }
})
