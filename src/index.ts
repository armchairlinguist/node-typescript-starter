import app from './App'
import log from './utils/logger';

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    return log.error(err)
  }

  return log.info(`server is listening on ${port}`)
})
