import { useSubmit } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import DocumentEditor from "../../components/DocumentEditor"
import { FixedDiv } from "../../utils/styles/Atoms"
import { EditButton, SaveButton } from "../../components/buttons"

const Template = styled.div`
  width: 75%;
  margin: auto;
  background-color: white;
  min-height: 500px;
  padding: 50px;
`

export default function Monography({ site }) {
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(site.monography)
  const submit = useSubmit()

  const toggleEdit = async () => {
    if (editable) {
      submit(
        {
          monography: value,
        },
        {
          method: "post",
          action: `/sites/${site.id}/update`,
        }
      )
    }
    setEditable(!editable)
  }
  return (
    <Template>
      <FixedDiv top="180px" right="80px">
        {editable ? (
          <SaveButton onClick={toggleEdit} color={colors.site} />
        ) : (
          <EditButton onClick={toggleEdit} color={colors.site} />
        )}
      </FixedDiv>

      <DocumentEditor editable={editable} value={value} setValue={setValue} />
    </Template>
  )
}
