import { useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors.js"
import EntityExplorer from "../../components/EntityExplorer/index.jsx"

import Data from "./Data.jsx"
import Monography from "./Monography.jsx"
import Relations from "./Relations.jsx"

import { getPeople } from "../../database/people"
import { getOrganisationList } from "../../database/organisations.js"
import { getSiteList, getSite } from "../../database/sites"
import { getEquipmentList } from "../../database/equipments.js"
import {
  getDirectRelationList,
  getReciprocalRelationList,
} from "../../services/relationService.js"
import { getWorld } from "../../database/worlds"

export async function loader({ params }) {
  let site = await getSite(params.siteId)
  if (!site) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  let world = await getWorld(site.worldId)
  if (!world) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }

  // Pour les relations à créer
  let sites = await getSiteList(site.worldId)
  let index = sites.findIndex((place) => place.id === site.id)
  sites.splice(index, 1)

  const people = await getPeople(site.worldId)
  const organisations = await getOrganisationList(site.worldId)
  const equipments = await getEquipmentList(site.worldId)

  const directRelations = await getDirectRelationList(site.worldId, site.id)
  const reciprocalRelations = await getReciprocalRelationList(
    site.worldId,
    site.id
  )

  return {
    site,
    world,
    directRelations,
    reciprocalRelations,
    people,
    organisations,
    sites,
    equipments,
  }
}

export default function Site() {
  let { site } = useLoaderData()
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
      entity={site}
      entityLabel="Lieux"
      color={colors.site}
      tabList={["Données", "Monographie", "Relations"]}
    >
      <EntityExplorer.TabContent>
        <Data site={site} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent>
        <Monography site={site} />
      </EntityExplorer.TabContent>
      <EntityExplorer.TabContent>
        <Relations
          site={site}
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
