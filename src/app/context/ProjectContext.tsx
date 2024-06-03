import React, { useState, useMemo } from "react"

import { IUserCard, Props } from "./ProjectContext.interface"

export const ProjectsContext = React.createContext({})

export const ProjectsContextWrapper = ({ children }: Props): JSX.Element => {
  const [userFirstCard, setUserFirstCard] = useState<IUserCard | undefined>(undefined)

  const actions = useMemo(
    () => ({
      setUserFirstCard: (card: any) => {
        setUserFirstCard(card)
      },
      clearUserFirstCard: () => setUserFirstCard(undefined),
    }),
    [],
  )

  return (
    <ProjectsContext.Provider
      value={{
        actions,
        userFirstCard,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export default ProjectsContextWrapper
