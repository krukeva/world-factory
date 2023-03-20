import { useLoaderData, useSubmit, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { Formik, Field, Form } from "formik"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import { FixedDiv } from "../../utils/styles/Atoms"
import { EditButton, SubmitButton } from "../../components/buttons"

import { getRelation } from "../../database/relations"
import { getWorld } from "../../database/worlds"

const DataField = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  display: flex;
  flex-direction: line;
  justify-content: flex-start;
  text-align: left;
`

const FieldLabel = styled.div`
  width: 150px;
  margin: 0;
  padding: 5px;
`
const FieldValue = styled.div`
  border-bottom: 2px solid ${colors.primary};
  padding: 5px;
  margin: 0;
  min-width: 100px;
`

export async function loader({ params }) {
  const relation = await getRelation(params.relationId)
  if (!relation) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  const world = relation.worldId ? await getWorld(relation.worldId) : null
  return { relation, world }
}

export default function Story() {
  const { relation } = useLoaderData()
  const [editData, setEditData] = useState(false)
  const submit = useSubmit()

  useEffect(() => {
    if (!relation.name || relation.name === "") {
      setEditData(true)
    }
  }, [relation.name])

  return (
    <div className="pageContainer withBackground">
      {editData ? (
        <Formik
          initialValues={{
            name: relation.name || "",
          }}
          onSubmit={async (newData) => {
            submit(newData, {
              method: "post",
              action: `/relations/${relation.id}/update`,
            })
            setEditData(false)
          }}
        >
          <Form>
            <DataField>
              <FieldLabel>
                <label htmlFor="name">Label&nbsp;: </label>
              </FieldLabel>
              <FieldValue>
                <Field type="text" name="name" />
              </FieldValue>
            </DataField>

            <FixedDiv top="80px" right="80px">
              <SubmitButton type="submit" />
            </FixedDiv>
          </Form>
        </Formik>
      ) : (
        <>
          <FixedDiv top="80px" right="80px">
            <EditButton onClick={() => setEditData(true)} />
          </FixedDiv>

          <DataField>
            <FieldLabel>
              <label htmlFor="name">Label&nbsp;: </label>
            </FieldLabel>
            <FieldValue>
              <span>{relation.name}</span>
            </FieldValue>
          </DataField>
        </>
      )}
      <Outlet context={relation} />
    </div>
  )
}
