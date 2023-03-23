import { useOutletContext, useNavigate } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import { FixedDiv } from "../../utils/styles/Atoms"
import { EditButton } from "../../components/buttons"

import QuillReader from "../../components/QuillReader"

const labelTranslator = {
  world: "le monde entier",
  contient: "un continent",
  region: "quelques pays",
  country: "un pays",
  subcountry: "une zone à l'intérieur d'un pays",
  city: "une ville",
  farPast: "passé éloigné",
  nearPast: "passé récent",
  current: "contemporaine",
  nearFuture: "futur proche",
  farFuture: "future lointain",
  unknown: "indéterminé",
  real: "réel",
  alternate: "alternative",
  fictional: "fictionnelle",
}

const Wrapper = styled.div`
  text-align: left;
`
const H3 = styled.h3`
  margin: 1em 0;
  padding: 0;
`
const H4 = styled.h4`
  margin: 1em 0;
  padding: 0;
`
const Metadata = styled.div`
  margin: 0;
  padding: 0 2em;
  background-color: ${colors.lightPrimary};
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  & p {
    margin: 0;
    padding: 1em 0;
  }
`
const KeyWords = styled.div`
  margin: 0;
  padding: 0 2em;
  background-color: ${colors.lightPrimary};
  display: block;
  & p {
    margin: 0;
    padding: 1em 0;
  }
`

const Description = styled.div`
  margin: 0;
  padding: 0;
  background-color: ${colors.lightPrimary};
  min-height: 200px;
  text-align: left;
  padding: 1%;
`

export default function WorldMetadata() {
  const world = useOutletContext()
  const navigate = useNavigate()

  // Necessary for the mapping in case world.keywords is undefined
  world.keywords = (Array.isArray(world.keywords) && world.keywords) || []

  return (
    <div className="pageContainer">
      <H3>Fiche d'identité</H3>
      <FixedDiv top="80px" right="40px">
        <EditButton onClick={() => navigate(`/worlds/${world.id}/edit`)} />
      </FixedDiv>

      <Wrapper>
        <H4>Description</H4>

        <Description>
          {world.description && world.description.length > 0 ? (
            <>
              <QuillReader value={world.description} />
            </>
          ) : (
            <>
              <em>aucune description...</em>
            </>
          )}
        </Description>

        <H4>Métadonnées</H4>
        <Metadata>
          <p>
            Echelle&nbsp;:{" "}
            {world.scale !== "undefined" ? (
              <span>{labelTranslator[world.scale] || world.scale}</span>
            ) : (
              <em>non déterminée</em>
            )}
          </p>
          <p>
            Période&nbsp;:{" "}
            {world.era !== "undefined" ? (
              <span>{labelTranslator[world.era] || world.era}</span>
            ) : (
              <em>non déterminée</em>
            )}
          </p>
          <p>
            Géopolitique&nbsp;:{" "}
            {world.geopolitics !== "undefined" ? (
              <span>
                {labelTranslator[world.geopolitics] || world.geopolitics}
              </span>
            ) : (
              <em>non déterminée</em>
            )}
          </p>
        </Metadata>
        <KeyWords>
          <p>
            Mots-clefs&nbsp;:{" "}
            {world.keywords && world.keywords.length > 0 ? (
              world.keywords.map((keyword, index) => {
                return (
                  <span key={index}>
                    {keyword}
                    {index < world.keywords.length - 1 && ", "}
                  </span>
                )
              })
            ) : (
              <em>aucun mot-clef</em>
            )}
          </p>
        </KeyWords>
      </Wrapper>
    </div>
  )
}
