import { useLoaderData, Outlet, NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import { getWorld } from "../../database/worlds"

const Subheader = styled.h2`
  margin: 0;
  padding: 10px 0;
  width: 100%;
  text-align: center;
  color: ${colors.text};
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 25px;
  min-height: 650px;
`

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  text-align: left;
  background-color: ${colors.primary};
`
const BlockNavLink = styled(NavLink)`
  display: block;
  padding: 4px 10px;
  margin: 20px;
  background-color: white;
  color: ${colors.darkPrimary};
  text-decoration: none;
  font-size: 18px;
  &: visited {
    color: ${colors.darkPrimary};
  }
  &.active {
    color: ${colors.primary};
    background-color: ${colors.lightPrimary};
  }
`

const MainContainer = styled.div`
  max-height: 600px;
  overflow: auto;
  margin: auto;
  width: 100%;
  margin-top: 0;
`
const Button = styled.button`
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  margin: 0;
  margin-left: 1em;
  padding: 0;
  color: ${colors.lightPrimary};
  background-color: ${(props) => props.color || colors.primary};
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

export async function loader({ params }) {
  const world = await getWorld(params.worldId)
  if (!world) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return { world }
}

export default function World() {
  const { world } = useLoaderData()
  const navigate = useNavigate()

  // Necessary for the mapping in case world.keywords is undefined
  world.keywords = (Array.isArray(world.keywords) && world.keywords) || []

  return (
    <div>
      <Wrapper>
        <NavContainer>
          <Subheader>
            {world.name}{" "}
            <Button type="button" onClick={() => navigate("export")}>
              <FontAwesomeIcon icon={faFileExport} />
            </Button>{" "}
          </Subheader>
          <BlockNavLink to={`/worlds/${world.id}/metadata`}>
            Fiche d'identité
          </BlockNavLink>
          <BlockNavLink to={`/worlds/${world.id}/theater`}>
            Théâtre d'opération
          </BlockNavLink>
          <BlockNavLink to={`/worlds/${world.id}/context`}>
            Contexte
          </BlockNavLink>
          <BlockNavLink to={`/worlds/${world.id}/data`}>Données</BlockNavLink>
          <BlockNavLink to={`/worlds/${world.id}/situation`}>
            Situation initiale
          </BlockNavLink>
        </NavContainer>

        <MainContainer>
          <Outlet context={world} />
        </MainContainer>
      </Wrapper>
    </div>
  )
}
