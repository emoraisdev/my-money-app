import mongoose from 'mongoose'

export default async function connectDB() {
  try {

    mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório"

    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB conectado com sucesso!')
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message)
    process.exit(1) // encerra o processo se não conseguir conectar
  }
}