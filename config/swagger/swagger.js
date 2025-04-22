import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Plan de viajes API',
      version: '1.0.0',
      description: 'API para el manejo de viajes y usuarios'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      },
      {
        url: 'https://swagger-tutorial.onrender.com/api'
      }
    ]
  },
  apis: ['routes/docs/*.js'] // lugar donde esta la documentacion
}

const specs = swaggerJsdoc(options)

export default app => {
  app.use(
    '/api/docs', // url donde estaran disponibles los docs
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCssUrl:
        'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css'
    })
  )
}

// temas disponibles para swagger
// theme-flattop.css;
// theme-monokai.css
// theme-material.css
// theme-muted.css
// theme-outline.css
