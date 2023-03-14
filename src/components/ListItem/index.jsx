import styled from "styled-components"

import colors from "../../utils/styles/colors"

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.category ? colors[props.category] : colors.primary};
  padding: 0px 10px;
  margin: 5px 0;
  border-radius: 5px;
`

const TitleLink = styled.div`
  color: ${colors.text};
  cursor: pointer;
  padding: 10px;
`

function ListItem({ onClick, content, category }) {
  return (
    <Wrapper category={category}>
      <TitleLink onClick={onClick}>{content}</TitleLink>
    </Wrapper>
  )
}

export default ListItem
