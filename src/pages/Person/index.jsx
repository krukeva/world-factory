import { useLoaderData, Link } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import DeleteButton from "../../components/DeleteButton"
import Data from "./Data"
import Biography from "./Biography"
import Relations from "./Relations"

import { getPeople, getPerson } from "../../database/people"
import { getWorld } from "../../database/worlds"

const H2 = styled.h2`
  display: flex;
  flex-direction: line;
  justify-content: flex-start;
  text-align: left;
  align-items: center;
`

const StyledTab = styled.button`
  margin-left: 1em;
  background-color: ${(props) => (props.isActive ? "#ccc" : "inherit")};
  flex-grow: 1;
  border: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  &: hover {
    background-color: #ddd;
  }
`

const StyledTabList = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: line;
  align-items: center;
`

const StyledTabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  padding: 6px 12px;
`

const TabContainer = styled.div``

export async function loader({ params }) {
  let person = await getPerson(params.personId)
  if (!person) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  let world = await getWorld(person.worldId)
  if (!world) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }

  // Pour les relations à créer
  let people = await getPeople(person.worldId)

  return { person, world, people }
}

export default function Person() {
  const [activeTab, setActiveTab] = useState(0)

  let { person } = useLoaderData()
  const { world } = useLoaderData()
  //const navigate = useNavigate()

  return (
    <div className="pageContainer">
      <H2>
        <em>
          &laquo;&nbsp;
          <Link to={`/worlds/${world.id}/data`}>{world.name}</Link>
          &nbsp;&raquo;
        </em>
        &nbsp;&gt; Personnes &nbsp;&gt; {person.name}
        <StyledTabList>
          <StyledTab
            type="button"
            onClick={() => setActiveTab(0)}
            isActive={activeTab === 0}
          >
            Données
          </StyledTab>
          <StyledTab
            type="button"
            onClick={() => setActiveTab(1)}
            isActive={activeTab === 1}
          >
            Biographie
          </StyledTab>
          <StyledTab
            type="button"
            onClick={() => setActiveTab(2)}
            isActive={activeTab === 2}
          >
            Relations
          </StyledTab>
        </StyledTabList>
      </H2>
      <TabContainer>
        <StyledTabContent isActive={activeTab === 0}>
          <Data person={person} />
        </StyledTabContent>
        <StyledTabContent isActive={activeTab === 1}>
          <Biography person={person} />
        </StyledTabContent>
        <StyledTabContent isActive={activeTab === 2}>
          <Relations person={person} />
        </StyledTabContent>
      </TabContainer>

      {/* Position absolue */}
      <DeleteButton
        actionRoute={`/people/${person.id}/delete`}
        returnRoute={`/worlds/${person.worldId}/data`}
      />
    </div>
  )
}
