import {
  useOutletContext,
  useLoaderData,
  Form,
  useNavigate,
} from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"

import ListItem from "../../components/ListItem"
import EntityList from "../../components/EntityList"

import { getPeople } from "../../database/people"
import { getOrganisationList } from "../../database/organisations"
import { getSiteList } from "../../database/sites"
import { getEquipmentList } from "../../database/equipments"

const H3 = styled.h3`
  margin: 1em 0;
  padding: 0;
`

const StyledTab = styled.button`
  margin-left: 1em;
  background-color: ${(props) => (props.isActive ? colors.divider : "inherit")};
  border: 1px solid ${colors.divider};
  flex-grow: 1;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  &: hover {
    background-color: #ddd;
  }
`

const StyledTabList = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: line;
  align-items: center;
  width: 100%;
`

const StyledTabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  background-color: ${(props) => (props.isActive ? colors.divider : "inherit")};
  padding: 32px 12px 6px 12px;
  border-top: none;
`

const TabContainer = styled.div``

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
`

export async function loader({ params }) {
  let people = await getPeople(params.worldId)
  let organisations = await getOrganisationList(params.worldId)
  let sites = await getSiteList(params.worldId)
  let equipments = await getEquipmentList(params.worldId)
  return { people, organisations, sites, equipments }
}

export default function WorldData() {
  const [activeTab, setActiveTab] = useState(0)
  const world = useOutletContext()
  const { people, organisations, sites, equipments } = useLoaderData()

  return (
    <div className="pageContainer">
      <H3>Base de connaissances</H3>

      <StyledTabList>
        <StyledTab
          type="button"
          onClick={() => setActiveTab(0)}
          isActive={activeTab === 0}
        >
          Listes
        </StyledTab>
        <StyledTab
          type="button"
          onClick={() => setActiveTab(1)}
          isActive={activeTab === 1}
        >
          Graphes
        </StyledTab>
        <StyledTab
          type="button"
          onClick={() => setActiveTab(2)}
          isActive={activeTab === 2}
        >
          Cartes
        </StyledTab>
      </StyledTabList>

      <TabContainer>
        <StyledTabContent isActive={activeTab === 0}>
          <Wrapper>
            <EntityList
              title="Personnes"
              category="person"
              collection="people"
              worldId={world.id}
              list={people}
            />

            <EntityList
              title="Organisations"
              category="organisation"
              collection="organisations"
              worldId={world.id}
              list={organisations}
            />

            <EntityList
              title="Lieux"
              category="site"
              collection="sites"
              worldId={world.id}
              list={sites}
            />

            <EntityList
              title="Equipements"
              category="equipment"
              collection="equipments"
              worldId={world.id}
              list={equipments}
            />
          </Wrapper>
        </StyledTabContent>

        {/*Graphe*/}
        <StyledTabContent isActive={activeTab === 1}>
          <h3>Graphe</h3>
        </StyledTabContent>

        {/*Cartes*/}
        <StyledTabContent isActive={activeTab === 2}>
          <h3>Cartes</h3>
        </StyledTabContent>
      </TabContainer>
    </div>
  )
}
