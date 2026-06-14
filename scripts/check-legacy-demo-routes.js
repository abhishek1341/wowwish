const http = require("http");

const BASE_URL = process.env.WOWWISH_BASE_URL || "http://localhost:3000";

const legacyDemoRoutes = [
  "/birthday",
  "/birthday-bestie",
  "/birthday-yaari",
  "/anniversary",
  "/anniversary-cute",
  "/anniversary-elegant",
  "/proposal",
  "/proposal-cute",
  "/proposal-luxury",
];

function checkRoute(route) {
  const url = new URL(route, BASE_URL);

  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 15000 }, (res) => {
      res.resume();
      resolve({ route, statusCode: res.statusCode });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({ route, error: "timeout" });
    });

    req.on("error", (error) => {
      resolve({ route, error: error.code || error.message });
    });
  });
}

async function main() {
  console.log(`Checking legacy demo routes at ${BASE_URL}`);

  const results = [];
  for (const route of legacyDemoRoutes) {
    results.push(await checkRoute(route));
  }

  const failures = results.filter((result) => result.statusCode !== 200);

  for (const result of results) {
    if (result.statusCode === 200) {
      console.log(`OK   ${result.route} 200`);
    } else {
      console.log(`FAIL ${result.route} ${result.statusCode || result.error}`);
    }
  }

  if (failures.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
