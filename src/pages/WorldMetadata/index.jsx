import { useOutletContext, useNavigate } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import EditButton from "../../components/EditButton"
import QuillReader from "../../components/QuillReader"

const Metadata = styled.div`
  background-color: ${colors.lightPrimary};
  display: flex;
  flex-direction: line;
  justify-content: space-around;
`

const KeyWords = styled.div`
  display: block;
  padding-left: 2em;
`

const Description = styled.div`
  margin: 2em auto;
  background-color: ${colors.lightPrimary};
  min-height: 200px;
  text-align: left;
  padding: 1%;
`

const Title = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;
  padding: 0 5em;
`
const StyledKeyword = styled.span`
  display: inline-block;
  background-color: ${colors.lightPrimary};
  padding: 0 0.5em;
  margin: 0 0.5em;
`

export default function WorldMetadata() {
  const world = useOutletContext()
  const navigate = useNavigate()

  // Necessary for the mapping in case world.keywords is undefined
  world.keywords = (Array.isArray(world.keywords) && world.keywords) || []

  return (
    <div className="pageContainer">
      <h3>Fiche d'identité</h3>
      <Title>
        <EditButton onClick={() => navigate(`/worlds/${world.id}/edit`)} />
      </Title>

      <Metadata>
        <p>Echelle&nbsp;: {world.scale}</p>
        <p>Période&nbsp;: {world.era}</p>
        <p>Géopolitique&nbsp;: {world.geopolitics}</p>
      </Metadata>
      <KeyWords>
        <p>
          Mots-clefs&nbsp;:{" "}
          {world.keywords
            ? world.keywords.map((keyWord, index) => {
                return <StyledKeyword key={index}>{keyWord}</StyledKeyword>
              })
            : ""}
        </p>
      </KeyWords>

      <Description>
        <h4>Description</h4>
        {world.description ? (
          <QuillReader value={world.description} />
        ) : (
          <>
            <em>Une courte description...</em>
          </>
        )}
      </Description>
    </div>
  )
}
