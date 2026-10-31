// 纯逻辑层:数字滚动的进度/缓动/插值/格式化数学,与渲染解耦,可独立单测
// (组件层的 rAF 循环只负责把这些函数按帧串起来)。

export type MagicNumberEasing = (progress: number) => number

// 默认缓动 easeOutCubic:起步快、收尾慢,滚动数字的惯用节奏
// (0→100 先大步跳进再逐格放缓,而非匀速流水账)。
export function magicNumberEaseOut(progress: number): number {
  return 1 - (1 - progress) ** 3
}

// 已流逝毫秒 → 钳制后的 0~1 线性进度;时长非法(0/负/NaN)视为瞬时到位。
export function getMagicNumberProgress(elapsed: number, duration: number): number {
  if (!(duration > 0)) return 1
  return Math.min(1, Math.max(0, elapsed / duration))
}

// 起点值按已缓动进度插值到目标值,升/降同构。
export function getMagicNumberTweenValue(
  from: number,
  to: number,
  easedProgress: number,
): number {
  return from + (to - from) * easedProgress
}

// 默认格式化:四舍五入取整——滚动期间逐帧呈现整数步进(0→1→2…→100);
// 千分位/小数位场景由消费方传入自定义 format。
export function formatMagicNumber(value: number): string {
  return `${Math.round(value)}`
}
