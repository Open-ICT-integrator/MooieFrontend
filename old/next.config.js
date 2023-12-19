module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: { 
    basePath: process.env.BASE_PATH || '' 
    //'http://145.89.192.5:3000/' 
    // switch in dev and prod
    //process.env.BASE_PATH || '' 
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })

    return config
  },
}