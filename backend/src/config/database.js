import mongoose from 'mongoose'

const mongoUrl = 'mongodb://localhost:27017/mymoney'

export async function connectDB() {
  try {
    await mongoose.connect(mongoUrl)
    console.log('MongoDB conectado com sucesso!')
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message)
    process.exit(1) // encerra o processo se não conseguir conectar
  }
}