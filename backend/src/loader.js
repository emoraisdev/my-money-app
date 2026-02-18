import server from './config/server.js';
import connectDB from './config/database.js';
import routes from './config/routes.js'

async function startServer() {
  try {
    // Conecta ao MongoDB
    await connectDB()

    // Carrega rotas
    routes(server)

    // Inicia o servidor
    const port = process.env.PORT || 3003
    server.listen(port, () => {
      console.log(`BACKEND rodando na porta ${port}`)
    })
    
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err)
  }
}

startServer()