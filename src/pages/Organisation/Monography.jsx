import { useSubmit } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import DocumentEditor from "../../components/DocumentEditor"
import { FixedDiv } from "../../utils/styles/Atoms"
import { EditButton, SaveButton } from "../../components/buttons"

const Wrapper = styled.div`
  width: 75%;
  margin: auto;
  background-color: white;
  min-height: 500px;
  padding: 50px;
`

export default function Monography({ organisation }) {
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(organisation.monography)
  const submit = useSubmit()

  const toggleEdit = async () => {
    if (editable) {
      submit(
        {
          monography: value,
        },
        {
          method: "post",
          action: `/organisations/${organisation.id}/update`,
        }
      )
    }
    setEditable(!editable)
  }
  return (
    <Wrapper>
      <FixedDiv top="180px" right="80px">
        {editable ? (
          <SaveButton onClick={toggleEdit} color={colors.organisation} />
        ) : (
          <EditButton onClick={toggleEdit} color={colors.organisation} />
        )}
      </FixedDiv>

      <DocumentEditor editable={editable} value={value} setValue={setValue} />
    </Wrapper>
  )
}
