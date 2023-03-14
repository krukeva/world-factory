import { Form, useLoaderData, useNavigate } from "react-router-dom"
import styled from 'styled-components'

const StyledH3 = styled.h3`
    width: 98%;
    padding-left: 2%;
    text-align: left;
`

const StyledForm = styled(Form)`
    width: 90%;
    padding-left: 8%;
    padding-right: 2%;
`

const StyledField = styled.div`
    width: 100%;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: top;
    alin-items: top;
`

const ButtonArea = styled.div`
    width: 60%;
    margin: 2em auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    alin-items: top;
`

const StyledTextarea = styled.textarea`
  margin-top: 1em;
  margin-bottom: 2em;   
  padding: 1em;
  width: 95%;
`

export default function WorldContext() {
  const { world } = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className="subPageContainer">
      <StyledH3>Contexte général</StyledH3>
      <StyledForm method="post" id="world-form">
        <StyledField>
          <span>Synthèse</span>
          <StyledTextarea
            name="1"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
        <StyledField>
          <span>Situation politique</span>
          <StyledTextarea
            name="2"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
        <StyledField>
          <span>Enjeux économiques</span>
          <StyledTextarea
            name="3"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
        <StyledField>
          <span>Organisation et potentiel militaires</span>
          <StyledTextarea
            name="4"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
        <StyledField>
          <span>Enjeux sociaux et sociétaux</span>
          <StyledTextarea
            name="5"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
        <StyledField>
          <span>Infrastructures</span>
          <StyledTextarea
            name="6"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
        <StyledField>
          <span>Réseaux d'informations et de communication</span>
          <StyledTextarea
            name="7"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
        <StyledField>
          <span>Compléments</span>
          <StyledTextarea
            name="8"
            rows={6}
          >{world.description}</StyledTextarea>
        </StyledField>
      <ButtonArea>
        <button type="submit">Save</button>
        <button
            type="button"
            onClick={() => {
                navigate(-1);
              }}
        >
            Cancel
        </button>
      </ButtonArea>
        </StyledForm>
      </div>
  )
}