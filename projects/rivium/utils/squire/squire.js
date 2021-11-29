import * as test from '../../build/tsc/test.js'
import * as app from '../../build/tsc/app.js'

const tst = new test.Test()
tst.testingAll()

app.main()
