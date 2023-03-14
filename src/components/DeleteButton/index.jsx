import { Form } from "react-router-dom"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { FixedRoundButton } from "../../utils/styles/Atoms"

const Button = styled(FixedRoundButton)`
  top: 160px;
  right: 20px;
  background-color: red;
  font-size: 25px;
`

export default function DeleteButton({ actionRoute, returnRoute }) {
  return (
    <Form method="post" action={actionRoute}>
      <input
        type="hidden"
        name="returnRoute"
        value={returnRoute || "/worlds"}
      />
      <Button type="submit">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Form>
  )
}
