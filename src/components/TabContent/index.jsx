import { useState } from "react"
import styled from "styled-components"

import QuillEditor from "../QuillEditor"
import QuillReader from "../QuillReader"
import { FixedDiv } from "../../utils/styles/Atoms"
import { EditButton, SaveButton } from "../../components/buttons"

const TabWrapper = styled.div`
  padding: 1em;
  min-height: 400px;
`

export default function TabContent({ initialValue, update }) {
  const [editable, setEditable] = useState(false)
  const [value, setValue] = useState(initialValue)

  const toggleEdit = async () => {
    if (editable) {
      await update(value)
    }
    setEditable(!editable)
  }
  return (
    <TabWrapper>
      <FixedDiv top="180px" right="60px">
        {editable ? (
          <SaveButton onClick={toggleEdit} />
        ) : (
          <EditButton onClick={toggleEdit} />
        )}
      </FixedDiv>
      {editable ? (
        <QuillEditor value={value} setValue={setValue} />
      ) : (
        <QuillReader value={value} />
      )}
    </TabWrapper>
  )
}
