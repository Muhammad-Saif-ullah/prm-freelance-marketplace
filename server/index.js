import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});

[helmet(), cors(), morgan('combined'), express.json({ limit: '10mb' }), limiter].forEach(middleware => app.use(middleware))

app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/v1', (req, res) => {
  res.json({ 
    message: 'OK',
    timestamp: new Date().toISOString()
  })
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})