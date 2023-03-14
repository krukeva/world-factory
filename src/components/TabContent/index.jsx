import { useState } from "react"
import styled from "styled-components"

import QuillEditor from "../QuillEditor"
import QuillReader from "../QuillReader"
import EditButton from "../EditButton"

const TabWrapper = styled.div`
  padding: 1em;
`
const ToggleBar = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: right;
  padding-bottom: 1em;
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
      <ToggleBar>
        <EditButton onClick={toggleEdit} />
      </ToggleBar>
      {editable ? (
        <QuillEditor value={value} setValue={setValue} />
      ) : (
        <QuillReader value={value} />
      )}
    </TabWrapper>
  )
}
