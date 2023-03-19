import { useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors.js"
import EntityExplorer from "../../components/EntityExplorer.jsx/index.jsx"

import Data from "./Data.jsx"
import Monography from "./Monography.jsx"
import Relations from "./Relations.jsx"

import { getEquipmentList, getEquipment } from "../../database/equipments"
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

  return { equipment, world, equipments }
}

export default function Equipment() {
  let { equipment } = useLoaderData()
  const { world } = useLoaderData()

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
        <Relations equipment={equipment} />
      </EntityExplorer.TabContent>
    </EntityExplorer>
  )
}
