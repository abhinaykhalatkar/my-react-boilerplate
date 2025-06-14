import net from "net";
import os from "os";
import { spawn } from "child_process";
import http from "http";

// Settings
const BASE_PORT = 3000;
const MAX_TRY = 20;
const RETRY_MS = 400;

// Check for free port
function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once("error", () => resolve(false))
      .once("listening", () => {
        server.close();
        resolve(true);
      })
      .listen(port, "0.0.0.0");
  });
}

async function findFreePort(base: number, maxTry: number): Promise<number> {
  for (let i = 0; i < maxTry; i++) {
    const port = base + i;
    // eslint-disable-next-line no-await-in-loop
    if (await checkPort(port)) {
      return port;
    }
  }
  throw new Error("No free port found!");
}

function getLocalIP(): string {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    const netInfo = nets[name];
    if (!netInfo) continue;
    for (const net of netInfo) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

function waitForServer(port: number, cb: () => void): void {
  http.get({ hostname: "localhost", port, timeout: 1000 }, (res) => {
    res.destroy();
    cb();
  }).on("error", () => {
    setTimeout(() => waitForServer(port, cb), RETRY_MS);
  });
}

async function main() {
  const port = await findFreePort(BASE_PORT, MAX_TRY);
  const env = { ...process.env, PORT: port.toString(), HOST: "0.0.0.0" };

  // Start craco and watch:tokens concurrently
  const craco = spawn("npx", ["craco", "start"], { stdio: "inherit", env, shell: true });
  const watcher = spawn("npm", ["run", "watch:tokens"], { stdio: "inherit", env, shell: true });

  // Wait for server, then print network info
  waitForServer(port, () => {
    const ip = getLocalIP();
    console.log('\nAccess URLs:');
    console.log(`  Local:            http://localhost:${port}`);
    console.log(`  On Your Network:  http://${ip}:${port}\n`);
  });

  // When craco process exits, kill watcher too
  craco.on("exit", (code) => {
    watcher.kill();
    process.exit(code || 0);
  });
}

main();
