import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const PERSIST_TARGETS = {
  default: {
    filePath: path.resolve("data/chiesi-proposta-config.json"),
    legacyFilePath: path.resolve(".local/chiesi-proposta-config.json"),
  },
  omni: {
    filePath: path.resolve("data/chiesi-proposta-config--omni.json"),
    legacyFilePath: null,
  },
};

function codexPersistencePlugin() {
  const endpoint = "/__persist/chiesi-proposta-config";
  let writeQueue = Promise.resolve();

  function resolveTarget(req) {
    const url = new URL(req.originalUrl || req.url || "/", "http://localhost");
    const requested = url.searchParams.get("v") || "default";
    return Object.prototype.hasOwnProperty.call(PERSIST_TARGETS, requested)
      ? PERSIST_TARGETS[requested]
      : null;
  }

  async function readPersisted(target) {
    try {
      const raw = await readFile(target.filePath, "utf-8");
      return JSON.parse(raw);
    } catch {
      if (target.legacyFilePath) {
        try {
          const legacyRaw = await readFile(target.legacyFilePath, "utf-8");
          return JSON.parse(legacyRaw);
        } catch {
          // Cai no payload vazio abaixo.
        }
      }
      return {
        version: 3,
        admin: null,
        scenario: null,
        savedAt: null,
      };
    }
  }

  async function safeWrite(target, parsed) {
    const serialized = JSON.stringify(parsed, null, 2) + "\n";
    JSON.parse(serialized);
    await mkdir(path.dirname(target.filePath), { recursive: true });
    const tmpPath = `${target.filePath}.tmp`;
    await writeFile(tmpPath, serialized);
    const { rename } = await import("node:fs/promises");
    await rename(tmpPath, target.filePath);
  }

  return {
    name: "codex-persistence-plugin",
    configureServer(server) {
      server.middlewares.use(endpoint, async (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        const target = resolveTarget(req);
        if (!target) {
          res.statusCode = 400;
          res.end(JSON.stringify({ ok: false, error: "unknown variant" }));
          return;
        }

        if (req.method === "GET") {
          res.end(JSON.stringify(await readPersisted(target)));
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
              writeQueue = writeQueue.then(() => safeWrite(target, parsed)).catch((err) => {
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
