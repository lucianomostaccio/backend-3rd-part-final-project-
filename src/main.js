import { PORT } from "./config/config.js";

import { connect } from './database/database.js'
import { app } from './app/app.js'

// initialize server
// @ts-ignore
await connect()

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`);
});




