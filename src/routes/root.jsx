import { Outlet, useNavigate } from "react-router-dom"

import Header from "../components/Header"

export default function Root() {
  const navigate = useNavigate()
  return (
    <>
      <Header
        onClick={() => {
          navigate("/worlds")
        }}
      />
      <Outlet />
    </>
  )
}
