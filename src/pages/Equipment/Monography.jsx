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

export default function Monography({ equipment }) {
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(equipment.monography)
  const submit = useSubmit()

  const toggleEdit = async () => {
    if (editable) {
      submit(
        {
          monography: value,
        },
        {
          method: "post",
          action: `/equipments/${equipment.id}/update`,
        }
      )
    }
    setEditable(!editable)
  }
  return (
    <Wrapper>
      <FixedDiv top="180px" right="80px">
        {editable ? (
          <SaveButton onClick={toggleEdit} color={colors.equipment} />
        ) : (
          <EditButton onClick={toggleEdit} color={colors.equipment} />
        )}
      </FixedDiv>
      <DocumentEditor editable={editable} value={value} setValue={setValue} />
    </Wrapper>
  )
}
