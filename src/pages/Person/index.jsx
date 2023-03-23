import { useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors.js"
import EntityExplorer from "../../components/EntityExplorer/index.jsx"

import Data from "./Data"
import Biography from "./Biography"
import Relations from "./Relations"

import { getPeople, getPerson } from "../../database/people"
import { getOrganisationList } from "../../database/organisations.js"
import { getSiteList } from "../../database/sites.js"
import { getEquipmentList } from "../../database/equipments.js"
import {
  getDirectRelationList,
  getReciprocalRelationList,
} from "../../services/relationService.js"
import { getWorld } from "../../database/worlds"

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
  let index = people.findIndex((guy) => guy.id === person.id)
  people.splice(index, 1)

  const organisations = await getOrganisationList(person.worldId)
  const sites = await getSiteList(person.worldId)
  const equipments = await getEquipmentList(person.worldId)

  const directRelations = await getDirectRelationList(person.worldId, person.id)
  const reciprocalRelations = await getReciprocalRelationList(
    person.worldId,
    person.id
  )

  return {
    person,
    world,
    directRelations,
    reciprocalRelations,
    people,
    organisations,
    sites,
    equipments,
  }
}

export default function Person() {
  let { person } = useLoaderData()
  const {
    world,
    directRelations,
    reciprocalRelations,
    people,
    organisations,
    sites,
    equipments,
  } = useLoaderData()

  return (
    <EntityExplorer
      world={world}
      entity={person}
      entityLabel="Personnes"
      color={colors.person}
      tabList={["Données", "Biographie", "Relations"]}
    >
      <EntityExplorer.TabContent>
        <Data person={person} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent>
        <Biography person={person} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent>
        <Relations
          person={person}
          directRelations={directRelations}
          reciprocalRelations={reciprocalRelations}
          people={people}
          organisations={organisations}
          sites={sites}
          equipments={equipments}
        />
      </EntityExplorer.TabContent>
    </EntityExplorer>
  )
}
