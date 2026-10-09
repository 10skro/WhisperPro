#!/usr/bin/env node
// WhisperPro launcher: resolves the bundled native binary and starts it detached.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

const candidates = [
  process.env.WHISPERPRO_BIN,
  path.join(here, "..", "bin", "WhisperPro.exe"),
].filter(Boolean);

const bin = candidates.find((p) => existsSync(p));
if (!bin) {
  console.error("WhisperPro binary not found. Reinstall the package or set WHISPERPRO_BIN.");
  process.exit(1);
}

const child = spawn(bin, process.argv.slice(2), { detached: true, stdio: "ignore" });
child.unref();
console.log(`WhisperPro started (pid ${child.pid})`);
