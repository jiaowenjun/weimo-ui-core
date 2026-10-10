import { useEffect, useRef } from 'react'

import {
  DEFAULT_INFINITE_LIST_ROOT_MARGIN,
  observeInfiniteListSentinel,
} from './infinite-list-sentinel'

export type UseInfiniteListSentinelOptions = {
  hasNextPage: boolean | undefined
  isFetchNextPageError: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => unknown
  rootMargin?: string
}

export function useInfiniteListSentinel({
  hasNextPage,
  isFetchNextPageError,
  isFetchingNextPage,
  onLoadMore,
  rootMargin = DEFAULT_INFINITE_LIST_ROOT_MARGIN,
}: UseInfiniteListSentinelOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const enabled = Boolean(hasNextPage) &&
    !isFetchingNextPage &&
    !isFetchNextPageError

  useEffect(
    () => observeInfiniteListSentinel({
      enabled,
      onLoadMore,
      rootMargin,
      sentinel: sentinelRef.current,
    }),
    [enabled, onLoadMore, rootMargin],
  )

  return sentinelRef
}
