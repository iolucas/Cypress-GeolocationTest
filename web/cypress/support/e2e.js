import '@mmisty/cypress-allure-adapter'
import { addCommands } from 'cypress-mongodb/dist/index-browser'
addCommands()

import './commands'
