import { useParams, useNavigate } from 'react-router-dom'

export default function User() {
  const { id } = useParams()
  const nav = useNavigate()
  return (
    <div>
      <h1>User {id}</h1>
      <p>Example route param: {id}</p>
      <button onClick={() => nav(-1)}>Go back</button>
      <button onClick={() => nav('/')}>Go home</button>
    </div>
  )
}