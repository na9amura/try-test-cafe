require("dotenv").config();
const createTestCafe = require("testcafe");
let testcafe = null;

createTestCafe()
  .then(tc => {
    testcafe = tc;
    const runner = testcafe.createRunner();
    return runner.run();
  })
  .then(failedCount => {
    console.log({ failedCount });
    testcafe.close();
  })
  .catch(e => {
    console.error(e);
    testcafe.close();
  });
