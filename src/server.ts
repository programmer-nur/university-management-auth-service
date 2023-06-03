import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, successLogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    successLogger.info('Database is connected Successfully')
    app.listen(config.prot, () => {
      successLogger.info(`Application is listening on port ${config.prot}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
}

main()
