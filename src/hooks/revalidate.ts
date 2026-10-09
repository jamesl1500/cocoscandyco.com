import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidatePath } from 'next/cache'

// The public pages are prerendered, so any content edit refreshes the whole frontend.
const revalidateSite = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Not inside a Next.js request (scripts, tests) — nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateSite()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite()
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidateSite()
  return doc
}
