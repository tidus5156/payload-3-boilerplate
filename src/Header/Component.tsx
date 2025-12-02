import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Setting } from '@/payload-types'

export async function Header() {
  const header = await getCachedGlobal('header', 1)() as Header
  const settings = await getCachedGlobal('settings', 1)() as Setting

  return <HeaderClient header={header} settings={settings} />
}
