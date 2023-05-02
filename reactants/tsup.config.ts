import * as fs from 'fs/promises'
import { transform, browserslistToTargets } from 'lightningcss'
import * as path from 'path'
import { defineConfig } from 'tsup'
import browserslist from 'browserslist'

export default defineConfig({
  dts: true,
  format: ['esm', 'cjs'],
  banner: { js: `"use client"` },
  plugins: [],
  minify: true,
  esbuildPlugins: [
    {
      name: 'css-module',
      setup(build): void {
        build.onResolve({ filter: /\.module\.css$/, namespace: 'file' }, (args) => ({
          path: `${args.path}#css-module`,
          namespace: 'css-module',
          pluginData: { pathDir: path.join(args.resolveDir, args.path) },
        }))
        build.onLoad({ filter: /#css-module$/, namespace: 'css-module' }, async (args) => {
          const { pluginData } = args as {
            pluginData: { pathDir: string }
          }

          const { code, exports } = transform({
            targets: browserslistToTargets(browserslist('>= 0.25%')),
            code: await fs.readFile(pluginData.pathDir),
            filename: pluginData.pathDir,
            cssModules: { pattern: '[name]_[local]__[hash]' },
            drafts: { nesting: true },
          })

          const mod: Record<string, string> = {}
          for (const [key, { name }] of Object.entries(exports ?? {})) mod[key] = name

          return {
            pluginData: { css: code },
            contents: `import "${pluginData.pathDir}"; export default ${JSON.stringify(mod)}`,
          }
        })
        build.onResolve({ filter: /\.module\.css$/, namespace: 'css-module' }, (args) => ({
          path: path.join(args.resolveDir, args.path, '#css-module-data'),
          namespace: 'css-module',
          pluginData: args.pluginData as { css: string },
        }))
        build.onLoad({ filter: /#css-module-data$/, namespace: 'css-module' }, (args) => ({
          contents: (args.pluginData as { css: string }).css,
          loader: 'css',
        }))
      },
    },
  ],
})
