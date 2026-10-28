import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/* 「组件不依赖消费方 reset」契约：官方站点均引 tailwind preflight，会把
   UA 默认样式透出类问题永久遮蔽；CI 亦无浏览器可断言计算样式，故退而
   锁定组件源码必须自带归零声明（背景半边=frosted 灰盘，边框半边=ghost 描边）。 */
const css = readFileSync(
  new URL('../src/components/controls/icon-button/icon-button.css', import.meta.url),
  'utf8',
)

function variantDeclarations(variant: 'ghost' | 'frosted') {
  const rule = css.match(
    new RegExp(`^  \\.icon-button--${variant} \\{([\\s\\S]*?)\\n  \\}`, 'm'),
  )
  expect(rule, `.icon-button--${variant} 基础规则必须存在`).toBeTruthy()
  return rule![1]
}

describe('icon-button 不依赖消费方 reset', () => {
  it('ghost 自带背景与边框归零（无 preflight 站点不透 UA 描边）', () => {
    const declarations = variantDeclarations('ghost')
    expect(declarations).toMatch(/background:\s*transparent/)
    expect(declarations).toMatch(/border:\s*none/)
  })

  it('frosted 自带透明底（无 preflight 站点不透 UA 灰盘）', () => {
    expect(variantDeclarations('frosted')).toMatch(/background-color:\s*transparent/)
  })
})
