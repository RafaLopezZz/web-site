import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const astroCli = fileURLToPath(new URL("../node_modules/astro/bin/astro.mjs", import.meta.url));
const playwrightCli = fileURLToPath(new URL("../node_modules/@playwright/test/cli.js", import.meta.url));
const previewUrl = "http://127.0.0.1:4321/web-site/";
const previewEnvironment = {
  ...process.env,
  PUBLIC_WEB3FORMS_KEY: "playwright-web3forms-key",
  PUBLIC_HCAPTCHA_SITEKEY: "playwright-hcaptcha-sitekey",
};

let previewProcess;
let testProcess;
let stopping = false;

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function isPreviewReachable() {
  try {
    await fetch(previewUrl, { signal: AbortSignal.timeout(500) });
    return true;
  } catch {
    return false;
  }
}

async function waitForPreview() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (previewProcess.exitCode !== null) {
      throw new Error(`Astro preview exited before becoming ready (exit ${previewProcess.exitCode}).`);
    }
    if (await isPreviewReachable()) return;
    await delay(100);
  }

  throw new Error(`Astro preview did not become ready at ${previewUrl} within 30 seconds.`);
}

async function stopOwnedProcess(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;

  child.kill("SIGTERM");
  const exited = once(child, "exit");
  const timedOut = delay(5_000).then(() => "timeout");
  if (await Promise.race([exited, timedOut]) === "timeout" && child.exitCode === null) {
    child.kill("SIGKILL");
    await once(child, "exit");
  }
}

async function shutdown(exitCode) {
  if (stopping) return;
  stopping = true;
  await stopOwnedProcess(testProcess);
  await stopOwnedProcess(previewProcess);
  process.exitCode = exitCode;
}

for (const [signal, exitCode] of [["SIGINT", 130], ["SIGTERM", 143]]) {
  process.once(signal, () => {
    void shutdown(exitCode);
  });
}

try {
  if (await isPreviewReachable()) {
    throw new Error(`Cannot start E2E: ${previewUrl} is already in use. The existing server was not reused or stopped.`);
  }

  previewProcess = spawn(process.execPath, [astroCli, "preview", "--host", "127.0.0.1"], {
    cwd: root,
    env: previewEnvironment,
    stdio: "inherit",
  });
  await waitForPreview();

  testProcess = spawn(process.execPath, [playwrightCli, "test", ...process.argv.slice(2)], {
    cwd: root,
    env: process.env,
    stdio: "inherit",
  });
  const [exitCode, signal] = await once(testProcess, "exit");
  await shutdown(exitCode ?? (signal ? 1 : 0));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  await shutdown(1);
}
