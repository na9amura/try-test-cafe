require("dotenv").config();
const createTestCafe = require("testcafe");
let testcafe = null;

createTestCafe("localhost", 1337, 1338)
  .then(tc => {
    testcafe = tc;
    const runner = testcafe.createRunner();
    return runner
      .src("local-test.js")
      .browsers(["browserstack:Edge@15.0:Windows 10"])
      .run();
  })
  .then(res => {
    console.log({ res });
    testcafe.close();
  })
  .catch(e => {
    console.error(e);
    testcafe.close();
  });
