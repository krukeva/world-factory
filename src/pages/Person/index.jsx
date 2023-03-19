import { useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors.js"
import EntityExplorer from "../../components/EntityExplorer.jsx/index.jsx"

import Data from "./Data"
import Biography from "./Biography"
import Relations from "./Relations"

import { getPeople, getPerson } from "../../database/people"
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

  return { person, world, people }
}

export default function Person() {
  let { person } = useLoaderData()
  const { world } = useLoaderData()

  return (
    <EntityExplorer
      world={world}
      entity={person}
      entityLabel="Peronnes"
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
        <Relations person={person} />
      </EntityExplorer.TabContent>
    </EntityExplorer>
  )
}
