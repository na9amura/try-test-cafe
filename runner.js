require("dotenv").config();
const createTestCafe = require("testcafe");
const fs = require("fs");
let testcafe = null;

createTestCafe("localhost", 1337, 1338)
  .then(tc => {
    const tests = fs.readdirSync("./tests").map(path => `./tests/${path}`);

    testcafe = tc;
    const runner = testcafe.createRunner();
    return runner
      .src(tests)
      .browsers(["chrome"])
      .run();
  })
  .then(failedCount => {
    console.log({ failedCount });
    testcafe.close();
  })
  .catch(e => {
    console.error(e);
    testcafe.close();
  });
