import { useLoaderData } from "react-router-dom"

import EntityExplorer from "../../components/EntityExplorer.jsx/index.jsx"

import Data from "./Data.jsx"
import Monography from "./Monography.jsx"
import Relations from "./Relations.jsx"

import { getWorld } from "../../database/worlds"
import {
  getOrganisationList,
  getOrganisation,
} from "../../database/organisations"

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

  return { organisation, world, organisations }
}

export default function Organisation() {
  let { organisation } = useLoaderData()
  const { world } = useLoaderData()

  return (
    <EntityExplorer
      world={world}
      entity={organisation}
      entityLabel="Organisation"
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
        <Relations organisation={organisation} />
      </EntityExplorer.TabContent>
    </EntityExplorer>
  )
}
