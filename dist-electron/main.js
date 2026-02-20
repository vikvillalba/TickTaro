import { ipcMain as l, BrowserWindow as s, app as i, screen as p } from "electron";
import { fileURLToPath as R } from "node:url";
import o from "node:path";
const m = o.dirname(R(import.meta.url));
process.env.APP_ROOT = o.join(m, "..");
const a = process.env.VITE_DEV_SERVER_URL, P = o.join(process.env.APP_ROOT, "dist-electron"), w = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = a ? o.join(process.env.APP_ROOT, "public") : w;
let e;
function f() {
  e = new s({
    width: 376,
    height: 497,
    icon: o.join(process.env.VITE_PUBLIC, "icon.png"),
    alwaysOnTop: !0,
    frame: !1,
    webPreferences: {
      preload: o.join(m, "preload.mjs")
    },
    resizable: !1,
    maximizable: !1
  }), l.on("resize-window", (d, r, c) => {
    e == null || e.setSize(r, c);
  });
  const n = () => {
    if (!e) return;
    const d = e.getBounds(), r = p.getDisplayMatching(d), c = p.getPrimaryDisplay(), _ = r.id !== c.id;
    e.webContents.send("screen-change", _);
  };
  let t = null;
  const u = () => {
    t && clearTimeout(t), t = setTimeout(() => {
      n();
    }, 100);
  };
  e.on("move", u), e.on("focus", n), e.setAlwaysOnTop(!0, "floating"), e.setWindowButtonVisibility(!1), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), a ? e.loadURL(a) : e.loadFile(o.join(w, "index.html"));
}
l.on("close-window", () => {
  const n = s.getFocusedWindow();
  n && n.close();
});
l.on("minimize-window", () => {
  const n = s.getFocusedWindow();
  n && n.minimize();
});
i.on("window-all-closed", () => {
  process.platform !== "darwin" && (i.quit(), e = null);
});
i.on("activate", () => {
  s.getAllWindows().length === 0 && f();
});
i.whenReady().then(f);
export {
  P as MAIN_DIST,
  w as RENDERER_DIST,
  a as VITE_DEV_SERVER_URL
};
