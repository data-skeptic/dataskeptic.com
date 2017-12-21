const development = {
  isProduction: false,
  url: 'http://localhost:3000',
  port: 3000,
  apiPort: 8000
}

const production = {
  isProduction: true,
  url: 'http://localhost:3000',
  port: 3000,
  apiPort: 8000
}

const environment =
  process.env.NODE_ENV === 'production' ? production : development

const common = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.API_HOST || 'localhost',
  apiPort: process.env.API_PORT || 3030,
  app: {
    title: 'Portal'
  }
}

const config = { ...common, ...environment }

export default config
