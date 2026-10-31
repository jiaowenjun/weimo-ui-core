import { describe, expect, it } from 'vitest'

import {
  formatMagicNumber,
  getMagicNumberProgress,
  getMagicNumberTweenValue,
  magicNumberEaseOut,
} from '../src/components/display/magic-number/magic-number-model'

describe('magicNumberEaseOut', () => {
  it('钉住两端:0 进 0 出,1 进 1 出', () => {
    expect(magicNumberEaseOut(0)).toBe(0)
    expect(magicNumberEaseOut(1)).toBe(1)
  })

  it('easeOut:中点已走过大半程,且全程单调不回退', () => {
    expect(magicNumberEaseOut(0.5)).toBeCloseTo(0.875, 12)

    let previous = magicNumberEaseOut(0)
    for (let progress = 0.01; progress <= 1; progress += 0.01) {
      const eased = magicNumberEaseOut(progress)
      expect(eased).toBeGreaterThanOrEqual(previous)
      previous = eased
    }
  })
})

describe('getMagicNumberProgress', () => {
  it('按比例换算并钳制在 0~1', () => {
    expect(getMagicNumberProgress(-10, 600)).toBe(0)
    expect(getMagicNumberProgress(0, 600)).toBe(0)
    expect(getMagicNumberProgress(300, 600)).toBe(0.5)
    expect(getMagicNumberProgress(600, 600)).toBe(1)
    expect(getMagicNumberProgress(900, 600)).toBe(1)
  })

  it('时长非法(0/负/NaN)视为瞬时到位', () => {
    expect(getMagicNumberProgress(0, 0)).toBe(1)
    expect(getMagicNumberProgress(0, -600)).toBe(1)
    expect(getMagicNumberProgress(0, Number.NaN)).toBe(1)
  })
})

describe('getMagicNumberTweenValue', () => {
  it('端点进度回到起点/终点值', () => {
    expect(getMagicNumberTweenValue(0, 100, 0)).toBe(0)
    expect(getMagicNumberTweenValue(0, 100, 1)).toBe(100)
  })

  it('升/降同构:插值只看差值与进度', () => {
    expect(getMagicNumberTweenValue(0, 100, 0.5)).toBe(50)
    expect(getMagicNumberTweenValue(100, 0, 0.5)).toBe(50)
    expect(getMagicNumberTweenValue(-40, 60, 0.5)).toBe(10)
  })

  it('先算缓动再插值:0→100 半程 easeOut 后显示 87.5', () => {
    expect(
      getMagicNumberTweenValue(0, 100, magicNumberEaseOut(0.5)),
    ).toBeCloseTo(87.5, 12)
  })
})

describe('formatMagicNumber', () => {
  it('四舍五入取整并输出字符串', () => {
    expect(formatMagicNumber(0)).toBe('0')
    expect(formatMagicNumber(1.4)).toBe('1')
    expect(formatMagicNumber(100.6)).toBe('101')
    expect(formatMagicNumber(-9.5)).toBe('-9')
  })
})
