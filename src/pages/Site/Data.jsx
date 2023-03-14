import { useSubmit } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, Form } from "formik"

import DataTemplate from "./DataTemplate"
import EditButton from "../../components/EditButton"
import SubmitButton from "../../components/SubmitButton"

export default function Data({ site }) {
  const [editData, setEditData] = useState(false)
  const submit = useSubmit()

  return (
    <>
      {editData ? (
        <Formik
          initialValues={{ name: site.name || "" }}
          onSubmit={async (newData) => {
            submit(newData, {
              method: "post",
              action: `/sites/${site.id}/update`,
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
            <p>nom&nbsp;: {site.name}</p>
          </DataTemplate.Header>
          {/*}
          <DataTemplate.DataBlock>
            <p>toto</p>
          </DataTemplate.DataBlock>
          <DataTemplate.DataBlock>
            <p>toto</p>
          </DataTemplate.DataBlock>
          <DataTemplate.DataBlock>
            <p>toto</p>
          </DataTemplate.DataBlock>
                */}
        </DataTemplate>
      )}
    </>
  )
}
