import { useSelector } from 'react-redux'

export function useAuthenticated() {
  const { profile } = useSelector(state => state.user)
  return (profile?.idUser && true) || false
}
