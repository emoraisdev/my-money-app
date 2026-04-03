import server from './config/server.js';
import connectDB from './config/database.js';
import routes from './config/routes.js'
import handleError from './api/error/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  try {
    
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não definido");
    }

    // Conecta ao MongoDB
    await connectDB()

    // Carrega rotas
    routes(server)

    server.use(handleError);

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