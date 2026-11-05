import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function dbJsonPlugin() {
  return {
    name: 'db-json-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/inquiries' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const dbPath = path.resolve(__dirname, 'db.json')
              let db = { inquiries: [] }
              if (fs.existsSync(dbPath)) {
                try {
                  db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
                } catch {
                  db = { inquiries: [] }
                }
              }
              const newEntry = {
                id: 'NOV-' + Date.now().toString(36).toUpperCase(),
                createdAt: new Date().toISOString(),
                ...data,
              }
              if (!Array.isArray(db.inquiries)) db.inquiries = []
              db.inquiries.unshift(newEntry)
              fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8')

              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 201
              res.end(JSON.stringify({ success: true, inquiry: newEntry }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
          return
        }

        if (req.url === '/api/inquiries' && req.method === 'GET') {
          try {
            const dbPath = path.resolve(__dirname, 'db.json')
            let db = { inquiries: [] }
            if (fs.existsSync(dbPath)) {
              db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
            }
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(db))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), dbJsonPlugin()],
})
