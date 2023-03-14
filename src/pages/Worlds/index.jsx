import { useLoaderData } from "react-router-dom"
//import { useEffect } from "react"
//import { fileOpen, fileSave } from "browser-fs-access"
import styled from 'styled-components'

import Card from "../../components/Card"
import AddButton from "../../components/AddButton"
import { getWorlds } from "../../database/worlds"
import { StyledNavLink } from "../../utils/styles/Atoms"

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")
    const worlds = await getWorlds(q)
    return { worlds, q }
}

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    grid-auto-rows: minmax(300px, auto);
    align-items: center;
    justify-items: center;
`
/*
const readFile = async ()=> {
  const blob = await fileOpen({
    mimeTypes: ['application/json'],
  });
  const result = JSON.parse(await blob.text())
  await importWorlds(result.worlds)
}
*/
/*
const writeFile = async ( db )=> {
  const blob = new Blob([JSON.stringify({worlds: db})], {
    type: 'application/json' // or whatever your Content-Type is
  });
  await fileSave(blob, {
    fileName: 'db.json',
    extensions: ['.json'],
  });
}
*/

export default function WorldList() {
  const { worlds } = useLoaderData()

  return (
    <div className="pageContainer">
      {worlds.length ? (
        <CardsContainer>             
          { worlds.map((world) => (
                    <StyledNavLink to={`/worlds/${world.id}`} key={world.id}>
                        <Card
                            label={"Réel, contemporain"}
                            title={world.name || "no name"}
                            //picture={world.picture || ""}
                        />
                    </StyledNavLink>
          ))}
        </CardsContainer>
      ) : (
        <p>
          <i>Il n'y a aucun monde dans la base de données.</i>
        </p>
      )}
      <AddButton actionRoute={`/worlds/create`} />    
    </div>
  );
}