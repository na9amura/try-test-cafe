require("dotenv").config();
const createTestCafe = require("testcafe");
let testcafe = null;
let runner = null;

createTestCafe("127.0.0.1", 1337, 1338)
  .then(tc => {
    testcafe = tc;
    runner = testcafe.createRunner();
    return testcafe.createBrowserConnection();
  })
  .then(connection => {
    console.log(connection.url);
    return connection.once("ready", () => {
      runner
        .src("./tests")
        .browsers(["chrome"])
        .run()
        .then(failedCount => {
          console.log({ failedCount });
          testcafe.close();
        })
        .catch(e => {
          console.error(e);
          testcafe.close();
        });
    });
  });
