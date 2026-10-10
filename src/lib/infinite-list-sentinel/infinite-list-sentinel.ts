export const DEFAULT_INFINITE_LIST_ROOT_MARGIN = '240px 0px'

export type InfiniteListSentinelObserver = {
  disconnect: () => void
  observe: (element: Element) => void
}

export type InfiniteListSentinelObserverFactory = (
  callback: (entries: readonly { isIntersecting: boolean }[]) => void,
  options: IntersectionObserverInit,
) => InfiniteListSentinelObserver

export type ObserveInfiniteListSentinelOptions = {
  createObserver?: InfiniteListSentinelObserverFactory
  enabled: boolean
  onLoadMore: () => unknown
  rootMargin?: string
  sentinel: Element | null
}

export function observeInfiniteListSentinel({
  createObserver,
  enabled,
  onLoadMore,
  rootMargin = DEFAULT_INFINITE_LIST_ROOT_MARGIN,
  sentinel,
}: ObserveInfiniteListSentinelOptions) {
  if (!enabled || !sentinel) return undefined
  if (!createObserver && typeof IntersectionObserver === 'undefined') {
    return undefined
  }

  const observerFactory = createObserver ?? ((callback, options) =>
    new IntersectionObserver((entries) => callback(entries), options))
  const observer = observerFactory(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return

      void onLoadMore()
    },
    { rootMargin },
  )

  observer.observe(sentinel)

  return () => {
    observer.disconnect()
  }
}
