import styled from "styled-components"

//import colors from "../../utils/styles/colors"

const Wrapper = styled.div`
  width: 75%;
  margin: auto;
  background-color: white;
  min-height: 500px;
  padding: 50px;
`

export default function Relations({ site }) {
  return (
    <Wrapper>
      <p>Ici, il y aura les relations de {site.name}</p>
    </Wrapper>
  )
}
