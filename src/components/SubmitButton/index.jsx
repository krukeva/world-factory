import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import { RoundButton } from "../../utils/styles/Atoms"

export default function SubmitButton({ onClick }) {
  return (
    <RoundButton onClick={onClick} type="submit">
      <FontAwesomeIcon icon={faCheck} />
    </RoundButton>
  )
}
