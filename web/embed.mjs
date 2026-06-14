import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, 'dist')
const outCpp = resolve(__dirname, '..', 'code', 'web_html.cpp')
const outH = resolve(__dirname, '..', 'code', 'web_html.h')

// Read the built files
let css = ''
let js = ''

for (const f of readdirSync(resolve(distDir, 'assets'))) {
  if (f.endsWith('.css')) css += readFileSync(resolve(distDir, 'assets', f), 'utf-8')
  if (f.endsWith('.js')) js += readFileSync(resolve(distDir, 'assets', f), 'utf-8')
}

// Build a self-contained HTML
// %CFG_JSON% will be replaced by Arduino with {"ip":"x.x.x.x","wifi_ssid":"xxx",...}
// %INJECT_SCRIPTS% will be replaced by Arduino with any extra script tags (currently unused)
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SMS Forwarding</title>
  <script>window.__CFG__=/*%CFG_JSON%*/{}</script>
  <style>${css}</style>
</head>
<body>
  <div id="app"></div>
  <script>${js}</script>
</body>
</html>`

// Write header
writeFileSync(outH, `#ifndef WEB_HTML_H
#define WEB_HTML_H

extern const char* htmlPage;

#endif
`, 'utf-8')

// Write C++ source
const delimiter = 'rawliteral'
if (html.includes(delimiter + '(') || html.includes(')' + delimiter)) {
  console.error('ERROR: HTML contains the raw string delimiter! Change it in embed.mjs.')
  process.exit(1)
}

const cpp = `#include "config_types.h"

const char* htmlPage = R"${delimiter}(
${html}
)${delimiter}";\n`

writeFileSync(outCpp, cpp, 'utf-8')
console.log(`Embedded HTML (${(html.length / 1024).toFixed(1)} KB) -> ${outCpp}`)
