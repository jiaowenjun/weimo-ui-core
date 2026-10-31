import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

// 自引用入口(src 按 'weimo-ui-core/...' 包名导入自身公开 API)依赖 tsconfig paths
// 映射回 src,才能在无 dist 的干净检出(CI)里通过 typecheck;本机 dist 存在时
// tsc 会走 exports 兜底,漏配只红 CI 不红本地,极易漏检——此契约在本地提前拦住
// 这类漂移。2026-10-27 tooltip 提交漏配 coss/tooltip 导致 CI 连红,2026-10-31 起设防。

const packageRoot = fileURLToPath(new URL('../', import.meta.url))
const tsconfig = JSON.parse(await readFile(join(packageRoot, 'tsconfig.json'), 'utf8'))
const paths = tsconfig.compilerOptions?.paths ?? {}

const selfImportPattern = /(?:from\s+|import\(\s*)['"]weimo-ui-core\/([^'"]+)['"]/g

async function collectSourceFiles(directory) {
  const files = []

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) files.push(...(await collectSourceFiles(path)))
    else if (/\.[cm]?tsx?$/.test(entry.name)) files.push(path)
  }

  return files
}

const usedEntries = new Map()

for (const file of await collectSourceFiles(join(packageRoot, 'src'))) {
  const text = await readFile(file, 'utf8')

  for (const match of text.matchAll(selfImportPattern)) {
    usedEntries.set(`weimo-ui-core/${match[1]}`, relative(packageRoot, file))
  }
}

const missing = [...usedEntries.keys()].filter((entry) => !(entry in paths))

assert.deepEqual(
  missing,
  [],
  `以下自引用入口缺 tsconfig paths 映射,干净检出 typecheck 必红:
${missing.map((entry) => `  ${entry} (首见于 ${usedEntries.get(entry)})`).join('\n')}
请在 tsconfig.json compilerOptions.paths 补对应 "./src/<源文件>" 条目`,
)

const dangling = Object.entries(paths)
  .filter(([, targets]) => !targets.some((target) => existsSync(join(packageRoot, target))))
  .map(([entry]) => entry)

assert.deepEqual(
  dangling,
  [],
  `以下 paths 映射指向不存在的文件(入口改名/删除后须同步):
  ${dangling.join('\n  ')}`,
)
