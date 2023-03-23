import { useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors.js"
import EntityExplorer from "../../components/EntityExplorer/index.jsx"

import Data from "./Data.jsx"
import Monography from "./Monography.jsx"
import Relations from "./Relations.jsx"

import { getPeople } from "../../database/people"
import { getOrganisationList } from "../../database/organisations.js"
import { getSiteList } from "../../database/sites.js"
import { getEquipmentList, getEquipment } from "../../database/equipments"
import {
  getDirectRelationList,
  getReciprocalRelationList,
} from "../../services/relationService.js"
import { getWorld } from "../../database/worlds"

export async function loader({ params }) {
  let equipment = await getEquipment(params.equipmentId)
  if (!equipment) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  let world = await getWorld(equipment.worldId)
  if (!world) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }

  // Pour les relations à créer
  let equipments = await getEquipmentList(equipment.worldId)
  let index = equipments.findIndex((piece) => piece.id === equipment.id)
  equipments.splice(index, 1)

  const people = await getPeople(equipment.worldId)
  const organisations = await getOrganisationList(equipment.worldId)
  const sites = await getSiteList(equipment.worldId)

  const directRelations = await getDirectRelationList(
    equipment.worldId,
    equipment.id
  )
  const reciprocalRelations = await getReciprocalRelationList(
    equipment.worldId,
    equipment.id
  )

  return {
    equipment,
    world,
    directRelations,
    reciprocalRelations,
    people,
    organisations,
    sites,
    equipments,
  }
}

export default function Equipment() {
  let { equipment } = useLoaderData()
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
      entity={equipment}
      entityLabel="Objet ou équipement"
      color={colors.equipment}
      tabList={["Données", "Monographie", "Relations"]}
    >
      <EntityExplorer.TabContent
        title={`Données sur l'équipement ${equipment.name}`}
      >
        <Data equipment={equipment} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent
        title={`Monographie sur l'équipement ${equipment.name}`}
      >
        <Monography equipment={equipment} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent
        title={`Relations de l'équipement ${equipment.name}`}
      >
        <Relations
          equipment={equipment}
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
