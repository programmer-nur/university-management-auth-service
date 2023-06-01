import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database is connected Successfully')
    app.listen(config.prot, () => {
      console.log(`Application is listening on port ${config.prot}`)
    })
  } catch (error) {
    console.log('Failed to connect database', error)
  }
}

main()
