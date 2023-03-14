import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

import { RoundButton } from "../../utils/styles/Atoms"

export default function SaveButton({ onClick }) {
  return (
    <RoundButton onClick={onClick}>
      <FontAwesomeIcon icon={faFloppyDisk} />
    </RoundButton>
  )
}
