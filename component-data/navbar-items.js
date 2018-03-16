export const mainMenuItems = [
  // { type: 'item', title: 'Welcome', link: '/' },
  { type: 'item', title: 'Upload', link: '/upload' },
  { type: 'item', title: 'Map', link: '/map' },
  { type: 'item', title: 'Pathview', link: '/pathview' },
  {
    type: 'item',
    title: 'Help',
    link: '/help',
    submenu: [
      { type: 'item', title: 'Tutorial', link: '/help/tutorial' },
      { type: 'item', title: 'About', link: '/help/about' }
    ]
  }
];

// export const endMenuButtons = [
//   { type: 'item', title: 'Tutorial', link: '/help/tutorial' },
//   { type: 'item', title: 'About', link: '/help/about' }
// ];
export const endMenuButtons = [
  {
    type: 'button',
    title: 'Tweet',
    link: 'https://twitter.com/samhinshaw',
    // className: 'button is-info',
    className: 'button is-light',
    icon: 'fab fa-twitter'
  },
  {
    type: 'button',
    title: 'Github',
    link: 'https://github.com/samhinshaw/metabridge_node',
    className: 'button is-light',
    icon: 'fab fa-github'
  }
];
