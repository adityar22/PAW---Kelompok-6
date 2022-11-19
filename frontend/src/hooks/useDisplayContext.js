import { DisplayContext } from "../contexts/DisplayContext"
import { useContext } from "react"

export const useDisplayContext = () => {
  const context = useContext(DisplayContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context;
}