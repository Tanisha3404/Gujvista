import { useEffect } from 'react'

export function formatPageTitle(title: string): string {
  return `${title} | GujVista`
}

// hook to set the page title dynamically
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = formatPageTitle(title)
  }, [title])
}