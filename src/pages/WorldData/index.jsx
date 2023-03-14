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

import { getPeople } from "../../database/people"
import { getOrganisationList } from "../../database/organisations"
import { getSiteList } from "../../database/sites"
import { getEquipmentList } from "../../database/equipments"

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
`

const StyledTabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  background-color: ${(props) => (props.isActive ? colors.divider : "inherit")};
  padding: 32px 12px 6px 12px;
  border-top: none;
`

const TabContainer = styled.div``

const StyledH2 = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 1em;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
`

const ListContainer = styled.div``

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  margin-bottom: 1em;
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
  const navigate = useNavigate()

  return (
    <div className="pageContainer">
      <h3>
        <em>&laquo;&nbsp;{world.name}&nbsp;&raquo; </em> -- Données
      </h3>

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
            <ListContainer>
              <StyledH2>Personnes</StyledH2>
              <SearchWrapper>
                <form id="search-form" role="search">
                  <input
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Chercher..."
                    type="search"
                    name="q"
                  />
                  <div id="search-spinner" aria-hidden hidden={true} />
                  <div className="sr-only" aria-live="polite"></div>
                </form>
                <Form method="post" action={`/worlds/${world.id}/people`}>
                  <button type="submit">Créer</button>
                </Form>
              </SearchWrapper>
              {people.map((person) => (
                <ListItem
                  key={person.id}
                  category="person"
                  content={person.name}
                  onClick={() => navigate(`/people/${person.id}`)}
                />
              ))}
            </ListContainer>
            <ListContainer>
              <StyledH2>Organisations</StyledH2>
              <SearchWrapper>
                <form id="search-form" role="search">
                  <input
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Chercher..."
                    type="search"
                    name="q"
                  />
                  <div id="search-spinner" aria-hidden hidden={true} />
                  <div className="sr-only" aria-live="polite"></div>
                </form>
                <Form
                  method="post"
                  action={`/worlds/${world.id}/organisations`}
                >
                  <button type="submit">Créer</button>
                </Form>
              </SearchWrapper>
              {organisations.map((organisation) => (
                <ListItem
                  key={organisation.id}
                  category="organisation"
                  content={organisation.name}
                  onClick={() => navigate(`/organisations/${organisation.id}`)}
                />
              ))}
            </ListContainer>
            <ListContainer>
              <StyledH2>Sites</StyledH2>
              <SearchWrapper>
                <form id="search-form" role="search">
                  <input
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Chercher..."
                    type="search"
                    name="q"
                  />
                  <div id="search-spinner" aria-hidden hidden={true} />
                  <div className="sr-only" aria-live="polite"></div>
                </form>
                <Form method="post" action={`/worlds/${world.id}/sites`}>
                  <button type="submit">Créer</button>
                </Form>
              </SearchWrapper>
              {sites.map((site) => (
                <ListItem
                  key={site.id}
                  category="site"
                  content={site.name}
                  onClick={() => navigate(`/sites/${site.id}`)}
                />
              ))}
            </ListContainer>
            <ListContainer>
              <StyledH2>Equipements</StyledH2>
              <SearchWrapper>
                <form id="search-form" role="search">
                  <input
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Chercher..."
                    type="search"
                    name="q"
                  />
                  <div id="search-spinner" aria-hidden hidden={true} />
                  <div className="sr-only" aria-live="polite"></div>
                </form>
                <Form method="post" action={`/worlds/${world.id}/equipments`}>
                  <button type="submit">Créer</button>
                </Form>
              </SearchWrapper>
              {equipments.map((equipment) => (
                <ListItem
                  key={equipment.id}
                  category="equipment"
                  content={equipment.name}
                  onClick={() => navigate(`/equipments/${equipment.id}`)}
                />
              ))}
            </ListContainer>
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
