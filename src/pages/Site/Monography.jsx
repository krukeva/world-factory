import { useSubmit } from "react-router-dom"
import { useState } from "react"

import DocumentEditor from "../../components/DocumentEditor"
import EditButton from "../../components/EditButton"
import SaveButton from "../../components/SaveButton"

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
    <>
      {editable ? (
        <SaveButton onClick={toggleEdit} />
      ) : (
        <EditButton onClick={toggleEdit} />
      )}
      <DocumentEditor editable={editable} value={value} setValue={setValue} />
    </>
  )
}
