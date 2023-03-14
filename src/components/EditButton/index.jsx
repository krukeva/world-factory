import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import { FixedRoundButton } from "../../utils/styles/Atoms"

const Button = styled(FixedRoundButton)`
  top: 150px;
  right: 50px;
  font-size: 25px;
`

export default function EditButton({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <FontAwesomeIcon icon={faPen} />
    </Button>
  )
}
