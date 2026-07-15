import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
})

export default withNextra({
  trailingSlash: false,
  turbopack: {
    root: process.cwd(),
  },
})
