import { useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors.js"
import EntityExplorer from "../../components/EntityExplorer/index.jsx"

import Data from "./Data.jsx"
import Monography from "./Monography.jsx"
import Relations from "./Relations.jsx"

import { getPeople } from "../../database/people.js"
import {
  getOrganisationList,
  getOrganisation,
} from "../../database/organisations"
import { getSiteList } from "../../database/sites.js"
import { getEquipmentList } from "../../database/equipments.js"
import {
  getDirectRelationList,
  getReciprocalRelationList,
} from "../../services/relationService.js"
import { getWorld } from "../../database/worlds"

export async function loader({ params }) {
  let organisation = await getOrganisation(params.organisationId)
  if (!organisation) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  let world = await getWorld(organisation.worldId)
  if (!world) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }

  // Pour les relations à créer
  let organisations = await getOrganisationList(organisation.worldId)
  let index = organisations.findIndex((orga) => orga.id === organisation.id)
  organisations.splice(index, 1)

  const people = await getPeople(organisation.worldId)
  const sites = await getSiteList(organisation.worldId)
  const equipments = await getEquipmentList(organisation.worldId)

  const directRelations = await getDirectRelationList(
    organisation.worldId,
    organisation.id
  )
  const reciprocalRelations = await getReciprocalRelationList(
    organisation.worldId,
    organisation.id
  )

  return {
    organisation,
    world,
    people,
    organisations,
    sites,
    equipments,
    directRelations,
    reciprocalRelations,
  }
}

export default function Organisation() {
  let { organisation } = useLoaderData()
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
      entity={organisation}
      entityLabel="Organisation"
      color={colors.organisation}
      tabList={["Données", "Monographie", "Relations"]}
    >
      <EntityExplorer.TabContent
        title={`Données sur l'organisation ${organisation.name}`}
      >
        <Data organisation={organisation} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent
        title={`Monographie sur l'organisation ${organisation.name}`}
      >
        <Monography organisation={organisation} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent
        title={`Relations de l'organisation ${organisation.name}`}
      >
        <Relations
          organisation={organisation}
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
