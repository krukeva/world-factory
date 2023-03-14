import styled from "styled-components"

import colors from "../../utils/styles/colors"

const NavContainer = styled.nav`
  background-color: ${colors.darkPrimary};
  padding: 5px 20px;
  margin: 0;
`

const TitleLink = styled.p`
  color: ${colors.lightPrimary};
  cursor: pointer;
`

function Header({ onClick }) {
  return (
    <NavContainer>
      <TitleLink onClick={onClick}>Catalogue de mondes</TitleLink>
    </NavContainer>
  )
}

export default Header
