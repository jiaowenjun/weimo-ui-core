import type { ReactNode } from 'react'

type ComponentCardTitleProps = {
  children: ReactNode
  componentName: string
}

/** 组件卡片标题:中文名 + 等宽组件类名(样式见 app.css 的 .docs-component-class)。 */
export function ComponentCardTitle({
  children,
  componentName,
}: ComponentCardTitleProps) {
  return (
    <>
      {children}{' '}
      <code className="docs-component-class">{componentName}</code>
    </>
  )
}
