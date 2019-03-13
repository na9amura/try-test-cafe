const nodeStatic = require("node-static");
const fileServer = new nodeStatic.Server("./public");

// サンプル用にサーバを立てる
const __server = require("http")
  .createServer((req, res) => {
    req.addListener("end", () => fileServer.serve(req, res)).resume();
  })
  .listen(8080);

fixture("LocalTest")
  .page("http://localhost:8080/")
  .after(async ctx => __server.close());

test("assert page title", async t => {
  const title = await t.eval(() => window.document.querySelector("title").text);
  await t.expect(title).eql("samplepage");
});
