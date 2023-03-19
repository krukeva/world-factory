import { useLoaderData, Form } from "react-router-dom"

import GridContainer from "../../utils/templates/GridContainer"
import { FixedDiv } from "../../utils/styles/Atoms"
import WorldCard from "../../components/WorldCard"
import { AddButton } from "../../components/buttons"
import { getWorlds } from "../../database/worlds"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const worlds = await getWorlds(q)
  return { worlds, q }
}

export default function WorldList() {
  const { worlds } = useLoaderData()

  return (
    <>
      <GridContainer numberOfColumns="3">
        {worlds.map((world) => (
          <WorldCard key={world.id} world={world} />
        ))}
      </GridContainer>
      <FixedDiv bottom="50px" right="50px">
        <Form method="post" action={"/worlds/create"}>
          <AddButton type="submit" />
        </Form>
      </FixedDiv>
    </>
  )
}
