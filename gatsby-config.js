/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'FriendsWall',
    description: 'A social media platform where users can create accounts, share memories, and interact with each other.',
    image: 'src/assets/memories.png',
    siteUrl: 'http://localhost:8000',
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `FriendsWall`,
        short_name: `FriendsWall`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/assets/memories.png`
      }
    }
  ],
  
}
