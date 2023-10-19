// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// src/vite_plugins/svgstore.js
import path from "path";
import fs from "fs";
import store from "svgstore";
import { optimize } from "svgo";
var svgstore = (options = {}) => {
  const inputFolder = options.inputFolder || "src/assets/icons";
  return {
    name: "svgstore",
    resolveId(id) {
      if (id === "@svgstore") {
        return "svg_bundle.js";
      }
    },
    load(id) {
      if (id === "svg_bundle.js") {
        const sprites = store(options);
        const iconsDir = path.resolve(inputFolder);
        for (const file of fs.readdirSync(iconsDir)) {
          const filepath = path.join(iconsDir, file);
          const svgid = path.parse(file).name;
          let code2 = fs.readFileSync(filepath, { encoding: "utf-8" });
          sprites.add(svgid, code2);
        }
        const { data: code } = optimize(sprites.toString({ inline: options.inline }), {
          plugins: [
            "cleanupAttrs",
            "removeDoctype",
            "removeComments",
            "removeTitle",
            "removeDesc",
            "removeEmptyAttrs",
            { name: "removeAttrs", params: { attrs: "(data-name|data-xxx)" } }
          ]
        });
        return `const div = document.createElement('div')
div.innerHTML = \`${code}\`
const svg = div.getElementsByTagName('svg')[0]
if (svg) {
  svg.style.position = 'absolute'
  svg.style.width = 0
  svg.style.height = 0
  svg.style.overflow = 'hidden'
  svg.setAttribute("aria-hidden", "true")
}
// listen dom ready event
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.firstChild) {
    document.body.insertBefore(div, document.body.firstChild)
  } else {
    document.body.appendChild(div)
  }
})`;
      }
    }
  };
};

// vite.config.ts
import Unocss from "unocss/vite";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    svgstore(),
    Unocss()
  ],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://121.196.236.94:3000/"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3ZpdGVfcGx1Z2lucy9zdmdzdG9yZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXENvZGVcXFxcTXktVnVlMy1Ib29rcy1Db21wb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RlXFxcXE15LVZ1ZTMtSG9va3MtQ29tcG9uZW50c1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZS9NeS1WdWUzLUhvb2tzLUNvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IHsgc3Znc3RvcmUgfSBmcm9tICcuL3NyYy92aXRlX3BsdWdpbnMvc3Znc3RvcmUnO1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBzdmdzdG9yZSgpLFxuICAgIFVub2NzcygpLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGkvdjEnOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjEuMTk2LjIzNi45NDozMDAwLycsXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RlXFxcXE15LVZ1ZTMtSG9va3MtQ29tcG9uZW50c1xcXFxzcmNcXFxcdml0ZV9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RlXFxcXE15LVZ1ZTMtSG9va3MtQ29tcG9uZW50c1xcXFxzcmNcXFxcdml0ZV9wbHVnaW5zXFxcXHN2Z3N0b3JlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Db2RlL015LVZ1ZTMtSG9va3MtQ29tcG9uZW50cy9zcmMvdml0ZV9wbHVnaW5zL3N2Z3N0b3JlLmpzXCI7LyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgc3RvcmUgZnJvbSAnc3Znc3RvcmUnIC8vIFx1NzUyOFx1NEU4RVx1NTIzNlx1NEY1QyBTVkcgU3ByaXRlc1xuaW1wb3J0IHsgb3B0aW1pemUgfSBmcm9tICdzdmdvJyAvLyBcdTc1MjhcdTRFOEVcdTRGMThcdTUzMTYgU1ZHIFx1NjU4N1x1NEVGNlxuXG5leHBvcnQgY29uc3Qgc3Znc3RvcmUgPSAob3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IGlucHV0Rm9sZGVyID0gb3B0aW9ucy5pbnB1dEZvbGRlciB8fCAnc3JjL2Fzc2V0cy9pY29ucyc7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3N2Z3N0b3JlJyxcbiAgICByZXNvbHZlSWQoaWQpIHtcbiAgICAgIGlmIChpZCA9PT0gJ0BzdmdzdG9yZScpIHtcbiAgICAgICAgcmV0dXJuICdzdmdfYnVuZGxlLmpzJ1xuICAgICAgfVxuICAgIH0sXG4gICAgbG9hZChpZCkge1xuICAgICAgaWYgKGlkID09PSAnc3ZnX2J1bmRsZS5qcycpIHtcbiAgICAgICAgY29uc3Qgc3ByaXRlcyA9IHN0b3JlKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBpY29uc0RpciA9IHBhdGgucmVzb2x2ZShpbnB1dEZvbGRlcik7XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmcy5yZWFkZGlyU3luYyhpY29uc0RpcikpIHtcbiAgICAgICAgICBjb25zdCBmaWxlcGF0aCA9IHBhdGguam9pbihpY29uc0RpciwgZmlsZSk7XG4gICAgICAgICAgY29uc3Qgc3ZnaWQgPSBwYXRoLnBhcnNlKGZpbGUpLm5hbWVcbiAgICAgICAgICBsZXQgY29kZSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlcGF0aCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KTtcbiAgICAgICAgICBzcHJpdGVzLmFkZChzdmdpZCwgY29kZSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGRhdGE6IGNvZGUgfSA9IG9wdGltaXplKHNwcml0ZXMudG9TdHJpbmcoeyBpbmxpbmU6IG9wdGlvbnMuaW5saW5lIH0pLCB7XG4gICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgJ2NsZWFudXBBdHRycycsICdyZW1vdmVEb2N0eXBlJywgJ3JlbW92ZUNvbW1lbnRzJywgJ3JlbW92ZVRpdGxlJywgJ3JlbW92ZURlc2MnLFxuICAgICAgICAgICAgJ3JlbW92ZUVtcHR5QXR0cnMnLFxuICAgICAgICAgICAgeyBuYW1lOiBcInJlbW92ZUF0dHJzXCIsIHBhcmFtczogeyBhdHRyczogXCIoZGF0YS1uYW1lfGRhdGEteHh4KVwiIH0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuZGl2LmlubmVySFRNTCA9IFxcYCR7Y29kZX1cXGBcbmNvbnN0IHN2ZyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJylbMF1cbmlmIChzdmcpIHtcbiAgc3ZnLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICBzdmcuc3R5bGUud2lkdGggPSAwXG4gIHN2Zy5zdHlsZS5oZWlnaHQgPSAwXG4gIHN2Zy5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIilcbn1cbi8vIGxpc3RlbiBkb20gcmVhZHkgZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShkaXYsIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZClcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdilcbiAgfVxufSlgXG4gICAgICB9XG4gICAgfVxuICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLG9CQUFvQjtBQUNyVCxPQUFPLFNBQVM7OztBQ0FoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZ0JBQWdCO0FBRWxCLElBQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNO0FBQ3hDLFFBQU0sY0FBYyxRQUFRLGVBQWU7QUFDM0MsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVSxJQUFJO0FBQ1osVUFBSSxPQUFPLGFBQWE7QUFDdEIsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLLElBQUk7QUFDUCxVQUFJLE9BQU8saUJBQWlCO0FBQzFCLGNBQU0sVUFBVSxNQUFNLE9BQU87QUFDN0IsY0FBTSxXQUFXLEtBQUssUUFBUSxXQUFXO0FBQ3pDLG1CQUFXLFFBQVEsR0FBRyxZQUFZLFFBQVEsR0FBRztBQUMzQyxnQkFBTSxXQUFXLEtBQUssS0FBSyxVQUFVLElBQUk7QUFDekMsZ0JBQU0sUUFBUSxLQUFLLE1BQU0sSUFBSSxFQUFFO0FBQy9CLGNBQUlBLFFBQU8sR0FBRyxhQUFhLFVBQVUsRUFBRSxVQUFVLFFBQVEsQ0FBQztBQUMxRCxrQkFBUSxJQUFJLE9BQU9BLEtBQUk7QUFBQSxRQUN6QjtBQUNBLGNBQU0sRUFBRSxNQUFNLEtBQUssSUFBSSxTQUFTLFFBQVEsU0FBUyxFQUFFLFFBQVEsUUFBUSxPQUFPLENBQUMsR0FBRztBQUFBLFVBQzVFLFNBQVM7QUFBQSxZQUNQO0FBQUEsWUFBZ0I7QUFBQSxZQUFpQjtBQUFBLFlBQWtCO0FBQUEsWUFBZTtBQUFBLFlBQ2xFO0FBQUEsWUFDQSxFQUFFLE1BQU0sZUFBZSxRQUFRLEVBQUUsT0FBTyx1QkFBdUIsRUFBRTtBQUFBLFVBQ25FO0FBQUEsUUFDRixDQUFDO0FBQ0QsZUFBTztBQUFBLG9CQUNLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWlCZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBRGpEQSxPQUFPLFlBQVk7QUFHbkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQSxRQUNULFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJjb2RlIl0KfQo=
