import { Form } from "react-router-dom"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { FixedRoundButton } from "../../utils/styles/Atoms"

const Button = styled(FixedRoundButton)`
  bottom: 20px;
  right: 20px;
  font-size: 25px;
`

export default function AddButton({ actionRoute }) {
  return (
    <Form method="post" action={actionRoute}>
      <Button type="submit">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Form>
  )
}
