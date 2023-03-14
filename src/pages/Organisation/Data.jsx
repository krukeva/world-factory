import { useSubmit } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, Form } from "formik"

import DataTemplate from "./DataTemplate"
import EditButton from "../../components/EditButton"
import SubmitButton from "../../components/SubmitButton"

export default function Data({ organisation }) {
  const [editData, setEditData] = useState(false)
  const submit = useSubmit()

  return (
    <>
      {editData ? (
        <Formik
          initialValues={{ name: organisation.name || "" }}
          onSubmit={async (newData) => {
            submit(newData, {
              method: "post",
              action: `/organisations/${organisation.id}/update`,
            })
            setEditData(!setEditData)
          }}
        >
          <Form>
            <DataTemplate>
              <DataTemplate.Header>
                <label htmlFor="name">Nom&nbsp;: </label>
                <Field type="text" name="name" />
              </DataTemplate.Header>
            </DataTemplate>

            <SubmitButton />
          </Form>
        </Formik>
      ) : (
        <DataTemplate>
          <DataTemplate.Header>
            <EditButton onClick={() => setEditData(!editData)} />
            <p>nom&nbsp;: {organisation.name}</p>
          </DataTemplate.Header>
        </DataTemplate>
      )}
    </>
  )
}
