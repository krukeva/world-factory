import { Form } from "react-router-dom"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { RoundButton } from "../../utils/styles/Atoms"
import colors from "../../utils/styles/colors"

const StyledForm = styled(Form)`
  padding: 10px 0;
`

const GridTemplate = styled.div`
  margin: 5px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  gap: 25px;
`

const Button = styled(RoundButton)`
  height: 25px;
  width: 25px;
  font-size: 12px;
`
function AddButton({ onClick, type }) {
  return (
    <Button onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  )
}

function DeleteButton({ onClick, type }) {
  return (
    <Button color={colors.danger} onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  )
}

export function DirectRelationForm({
  actionPath,
  source,
  list,
  category,
  returnRoute,
}) {
  return (
    <StyledForm method="post" action={actionPath}>
      <div>
        <GridTemplate>
          {source.name}
          <input type="text" name="name" />
          <select name="targetId">
            <option value={null}>--</option>
            {list.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <AddButton type="submit" />
        </GridTemplate>

        <input type="hidden" name="category" value={category} />
        <input type="hidden" name="sourceId" value={source.id} />
        <input type="hidden" name="returnRoute" value={returnRoute} />
      </div>
    </StyledForm>
  )
}

export function InverseRelationForm({
  actionPath,
  list,
  target,
  category,
  returnRoute,
}) {
  return (
    <StyledForm method="post" action={actionPath}>
      <div>
        <GridTemplate>
          <select name="sourceId">
            <option value={null}>--</option>
            {list.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input type="text" name="name" />
          {target.name}
          <AddButton type="submit" />
        </GridTemplate>
        <input type="hidden" name="category" value={category} />
        <input type="hidden" name="targetId" value={target.id} />
        <input type="hidden" name="returnRoute" value={returnRoute} />
      </div>
    </StyledForm>
  )
}

export function DirectRelationAsListItem({ source, relation, returnRoute }) {
  return (
    <GridTemplate>
      <span>{source.name}</span> <span>{relation.name}</span>
      <span>{relation.targetName}</span>
      <Form method="post" action={`/relations/${relation.id}/delete`}>
        <input type="hidden" name="returnRoute" value={returnRoute} />
        <DeleteButton type="submit" />
      </Form>
    </GridTemplate>
  )
}

export function InverseRelationAsListItem({ relation, target, returnRoute }) {
  return (
    <GridTemplate>
      <span>{relation.sourceName}</span>
      <span>{relation.name}</span>
      <span>{target.name}</span>
      <Form method="post" action={`/relations/${relation.id}/delete`}>
        <input type="hidden" name="returnRoute" value={returnRoute} />
        <DeleteButton type="submit" />
      </Form>
    </GridTemplate>
  )
}
