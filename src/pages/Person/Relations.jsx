import { useState } from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import {
  DirectRelationForm,
  InverseRelationForm,
  DirectRelationAsListItem,
  InverseRelationAsListItem,
} from "../../components/RelationAtoms"

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  background-color: white;
  min-height: 500px;
  display: flex;
  flex-direction: line;
  justify-content: center;
  align-items: flex-start;
`

const ListContainer = styled.div`
  width: 85%;
  background-color: ${colors.divider};
`

const NavBar = styled.div`
  margin: 0;
  padding: 0;
  width: 15%;
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: center;
`
const StyledTab = styled.button`
  margin: 0;
  margin-bottom: 2em;
  background-color: ${(props) =>
    props.isActive ? props.color || colors.divider : "inherit"};
  width: 100%;
  border: 1px solid ${(props) => props.color || colors.divider};
  outline: none;
  cursor: pointer;
  padding: 16px;
  transition: 0.3s;
  font-size: 16px;
  &: hover {
    background-color: #ddd;
  }
`
const StyledTabContent = styled.div`
  margin: 1em;
  padding-bottom: 1em;
  display: ${(props) => (props.isActive ? "block" : "none")};
  background-color: ${(props) =>
    props.isActive ? props.color || "white" : "inherit"};
  min-height: 480px;
  wdth: 100%;
`
const H2 = styled.h2`
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: ${colors.divider};
  padding-bottom: 12px;
  margin-bottom: 12px;
`

const H3 = styled.h3`
  margin: 0;
  padding: 0;
  margin-top: 12px;
  text-align: left;
  padding-left: 2em;
  border-bottom: 1px solid ${colors.divider};
`

const ListWrapper = styled.div``

export default function Relations({
  person,
  people,
  organisations,
  sites,
  equipments,
  directRelations,
  reciprocalRelations,
}) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Wrapper>
      <ListContainer>
        <StyledTabContent isActive={activeTab === 0}>
          <H2>Relations de {person.name} avec des personnes</H2>
          <H3>Relations directes</H3>
          <ListWrapper>
            <DirectRelationForm
              actionPath={`/worlds/${person.worldId}/relations`}
              source={person}
              list={people}
              category="personToPerson"
              returnRoute={`/people/${person.id}`}
            />
            {directRelations.length > 0 &&
              directRelations
                .filter((relation) => relation.category === "personToPerson")
                .map((relation) => {
                  return (
                    <DirectRelationAsListItem
                      key={relation.id}
                      source={person}
                      relation={relation}
                      returnRoute={`/people/${person.id}`}
                    />
                  )
                })}
          </ListWrapper>

          <H3>Relations inverses</H3>
          <ListWrapper>
            <InverseRelationForm
              actionPath={`/worlds/${person.worldId}/relations`}
              list={people}
              target={person}
              category="personToPerson"
              returnRoute={`/people/${person.id}`}
            />
            {reciprocalRelations.length > 0 &&
              reciprocalRelations
                .filter((relation) => relation.category === "personToPerson")
                .map((relation) => {
                  return (
                    <InverseRelationAsListItem
                      key={relation.id}
                      relation={relation}
                      target={person}
                      returnRoute={`/people/${person.id}`}
                    />
                  )
                })}
          </ListWrapper>
        </StyledTabContent>

        <StyledTabContent isActive={activeTab === 1}>
          <H2>Relations de {person.name} avec des organisations</H2>
          <ListWrapper>
            <DirectRelationForm
              actionPath={`/worlds/${person.worldId}/relations`}
              source={person}
              list={organisations}
              category="personToOrganisation"
              returnRoute={`/people/${person.id}`}
            />
            {directRelations.length > 0 &&
              directRelations
                .filter(
                  (relation) => relation.category === "personToOrganisation"
                )
                .map((relation) => {
                  return (
                    <DirectRelationAsListItem
                      key={relation.id}
                      source={person}
                      relation={relation}
                      returnRoute={`/people/${person.id}`}
                    />
                  )
                })}
          </ListWrapper>
        </StyledTabContent>

        <StyledTabContent isActive={activeTab === 2}>
          <H2>Relations de {person.name} avec des équipements</H2>
          <ListWrapper>
            <DirectRelationForm
              actionPath={`/worlds/${person.worldId}/relations`}
              source={person}
              list={equipments}
              category="personToEquipment"
              returnRoute={`/people/${person.id}`}
            />
            {directRelations.length > 0 &&
              directRelations
                .filter((relation) => relation.category === "personToEquipment")
                .map((relation) => {
                  return (
                    <DirectRelationAsListItem
                      key={relation.id}
                      source={person}
                      relation={relation}
                      returnRoute={`/people/${person.id}`}
                    />
                  )
                })}
          </ListWrapper>
        </StyledTabContent>

        <StyledTabContent isActive={activeTab === 3}>
          <H2>Relations de {person.name} avec des lieux</H2>
          <ListWrapper>
            <DirectRelationForm
              actionPath={`/worlds/${person.worldId}/relations`}
              source={person}
              list={sites}
              category="personToSite"
              returnRoute={`/people/${person.id}`}
            />
            {directRelations.length > 0 &&
              directRelations
                .filter((relation) => relation.category === "personToSite")
                .map((relation) => {
                  return (
                    <DirectRelationAsListItem
                      key={relation.id}
                      source={person}
                      relation={relation}
                      returnRoute={`/people/${person.id}`}
                    />
                  )
                })}
          </ListWrapper>
        </StyledTabContent>
      </ListContainer>
      <NavBar>
        <StyledTab onClick={() => setActiveTab(0)} isActive={activeTab === 0}>
          Personnes
        </StyledTab>
        <StyledTab onClick={() => setActiveTab(1)} isActive={activeTab === 1}>
          Organisations
        </StyledTab>
        <StyledTab onClick={() => setActiveTab(2)} isActive={activeTab === 2}>
          Equipements
        </StyledTab>
        <StyledTab onClick={() => setActiveTab(3)} isActive={activeTab === 3}>
          Lieux
        </StyledTab>
      </NavBar>
    </Wrapper>
  )
}
