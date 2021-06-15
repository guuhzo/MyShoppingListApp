import React, { createContext, useCallback, useState } from 'react'
import { useContext } from 'react'

import getRealm from '../services/database'

interface IDbContext {
  realm: Realm
  openDb(): Promise<void>
}

const DbContext = createContext<IDbContext>({} as IDbContext)

const DbProvider: React.FC = ({children}) => {
  const [realm, setRealm] = useState<Realm>(getRealm)

  const openDb = useCallback(async () => {
    const realm = getRealm

    setRealm(realm)
  }, [])

  return (
    <DbContext.Provider value={{ openDb, realm }}>
      {children}
    </DbContext.Provider>
  )
}

function useRealm(): IDbContext {
  const context = useContext(DbContext)

  if (!context) throw Error('useRealm must be inside DbProvider')

  return context
}

export { useRealm, DbProvider}