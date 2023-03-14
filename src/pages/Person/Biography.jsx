import { useSubmit } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import DocumentEditor from "../../components/DocumentEditor"
import EditButton from "../../components/EditButton"
import SaveButton from "../../components/SaveButton"

const ToggleBar = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-start;
`

const H3 = styled.h3`
  margin-right: 1em;
`

export default function Biography({ person }) {
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(person.bio)
  const submit = useSubmit()

  const toggleEdit = async () => {
    if (editable) {
      submit(
        {
          bio: value,
        },
        {
          method: "post",
          action: `/people/${person.id}/update`,
        }
      )
    }
    setEditable(!editable)
  }

  return (
    <>
      <ToggleBar>
        <H3>Note biographique sur {person.name}</H3>
        {editable ? (
          <SaveButton onClick={toggleEdit} />
        ) : (
          <EditButton onClick={toggleEdit} />
        )}
      </ToggleBar>
      <DocumentEditor editable={editable} value={value} setValue={setValue} />
    </>
  )
}
