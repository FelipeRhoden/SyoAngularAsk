import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SyoAngularAsk",
  description: "Docs para AngularJS",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Apresentação', link: '/presentation' },
      { text: 'Tutorial', link: '/tutorial/hello-angularjs' }
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Apresentação', link: '/presentation' },
          { text: 'Tutorial', link: '/tutorial/hello-angularjs' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FelipeRhoden/SyoAngularAsk' }
    ]
  }
})
