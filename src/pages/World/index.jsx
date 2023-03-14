import { useLoaderData, Outlet, NavLink, useSubmit } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import EditableTitle from "../../components/EditableTitle"
import { getWorld } from "../../database/worlds"

const Subheader = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.text};
  background-color: ${colors.primary};
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 25px;
  min-height: 600px;
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
`

const MainContainer = styled.div`
  max-height: 600px;
  overflow: auto;
  margin: auto;
  width: 100%;
  margin-top: 0;
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
  const submit = useSubmit()

  // Necessary for the mapping in case world.keywords is undefined
  world.keywords = (Array.isArray(world.keywords) && world.keywords) || []

  return (
    <div>
      <Subheader>
        <EditableTitle
          formKey="name"
          initialValue={world.name}
          onSubmit={async (newName) => {
            submit(newName, {
              method: "post",
              action: `/worlds/${world.id}/update`,
            })
          }}
        />
      </Subheader>

      <Wrapper>
        <NavContainer>
          <BlockNavLink to={`/worlds/${world.id}`}>
            Fiche d'identité
          </BlockNavLink>
          <BlockNavLink to={`theater`}>Théâtre d'opération</BlockNavLink>
          <BlockNavLink to={`context`}>Contexte</BlockNavLink>
          <BlockNavLink to={`data`}>Données</BlockNavLink>
        </NavContainer>

        <MainContainer>
          <Outlet context={world} />
        </MainContainer>
      </Wrapper>
    </div>
  )
}
