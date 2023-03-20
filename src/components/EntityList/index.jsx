import { Form, useNavigate } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import ListItem from "../ListItem"

const ListContainer = styled.div``

const StyledH2 = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 1em;
`
const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  margin-bottom: 1em;
`

const Button = styled.button`
  background-color: ${(props) =>
    props.category ? colors[props.category] : colors.primary};
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: ${colors.text};
  cursor: pointer;
  border: none;
`

export default function EntityList({
  title,
  category,
  collection,
  worldId,
  list,
}) {
  const navigate = useNavigate()

  return (
    <ListContainer>
      <StyledH2>{title}</StyledH2>
      <SearchWrapper>
        <form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Chercher..."
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </form>
      </SearchWrapper>
      <Form method="post" action={`/worlds/${worldId}/${collection}`}>
        <Button type="submit" category={category}>
          Créer
        </Button>
      </Form>
      {list.map((item) => (
        <ListItem
          key={item.id}
          category={category}
          content={item.name}
          onClick={() => navigate(`/${collection}/${item.id}`)}
        />
      ))}
    </ListContainer>
  )
}
