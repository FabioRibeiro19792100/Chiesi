import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function codexPersistencePlugin() {
  const filePath = path.resolve("data/chiesi-proposta-config.json");
  const legacyFilePath = path.resolve(".local/chiesi-proposta-config.json");
  const endpoint = "/__persist/chiesi-proposta-config";
  let writeQueue = Promise.resolve();

  async function readPersisted() {
    try {
      const raw = await readFile(filePath, "utf-8");
      return JSON.parse(raw);
    } catch {
      try {
        const legacyRaw = await readFile(legacyFilePath, "utf-8");
        return JSON.parse(legacyRaw);
      } catch {
        return {
          version: 3,
          admin: null,
          scenario: null,
          savedAt: null,
        };
      }
    }
  }

  async function safeWrite(parsed) {
    const serialized = JSON.stringify(parsed, null, 2) + "\n";
    JSON.parse(serialized);
    await mkdir(path.dirname(filePath), { recursive: true });
    const tmpPath = `${filePath}.tmp`;
    await writeFile(tmpPath, serialized);
    const { rename } = await import("node:fs/promises");
    await rename(tmpPath, filePath);
  }

  return {
    name: "codex-persistence-plugin",
    configureServer(server) {
      server.middlewares.use(endpoint, async (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        if (req.method === "GET") {
          res.end(JSON.stringify(await readPersisted()));
          return;
        }

        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const parsed = JSON.parse(body || "{}");
              writeQueue = writeQueue.then(() => safeWrite(parsed)).catch((err) => {
                console.warn("persist writeQueue failure:", err.message);
              });
              await writeQueue;
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ ok: false }));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), codexPersistencePlugin()],
});
