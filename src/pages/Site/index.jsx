import { useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors.js"
import EntityExplorer from "../../components/EntityExplorer.jsx/index.jsx"

import Data from "./Data.jsx"
import Monography from "./Monography.jsx"
import Relations from "./Relations.jsx"

import { getSiteList, getSite } from "../../database/sites"
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

  return { site, world, sites }
}

export default function Site() {
  let { site } = useLoaderData()
  const { world } = useLoaderData()

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
        <Relations site={site} />
      </EntityExplorer.TabContent>
    </EntityExplorer>
  )
}
