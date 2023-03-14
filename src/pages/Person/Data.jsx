import { useSubmit } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, Form } from "formik"
import styled from "styled-components"

import colors from "../../utils/styles/colors"

import EditButton from "../../components/EditButton"
import SubmitButton from "../../components/SubmitButton"
import DataTemplate from "./DataTemplate"

const ToggleBar = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: flex-start;
`
const H3 = styled.h3`
  margin-right: 1em;
`

const DataWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  background-color: ${colors.lightPrimary};
  padding: 0 1em;
  margin-bottom: 1em;
`

const dataScheme = {
  header: [
    {
      name: "name",
      label: "Désignation",
    },
    {
      name: "activity",
      label: "Rôle",
    },
    {
      name: "pseudo",
      label: "Pseudonyme",
    },
  ],
  identity: [
    {
      name: "surname",
      label: "Nom de famille",
    },
    {
      name: "firstName",
      label: "Prénom",
    },
    {
      name: "nickmane",
      label: "Surnom",
    },
    {
      name: "dateOfBirth",
      label: "Date de naissance",
    },
    {
      name: "sexe",
      label: "Sexe",
    },
    {
      name: "citizenship",
      label: "Nationalité",
    },
    {
      name: "maritalStatus",
      label: "Statut matromonial",
    },
    {
      name: "address",
      label: "Adresse",
    },
  ],
  appearance: [
    {
      name: "hair",
      label: "Cheveux",
    },
    {
      name: "eyes",
      label: "Yeux",
    },
    {
      name: "sign",
      label: "Signe distinctif",
    },
  ],
}

function getInitialValues(scheme, person) {
  const groupKeys = Object.keys(scheme)
  let initialValue = {}
  for (let i = 0; i < groupKeys.length; i++) {
    let keyList = scheme[groupKeys[i]]
    for (let j = 0; j < keyList.length; j++) {
      initialValue[keyList[j].name] = person[keyList[j].name] || ""
    }
  }
  return initialValue
}

export default function Data({ person }) {
  const [editData, setEditData] = useState(false)
  const submit = useSubmit()

  return (
    <>
      <ToggleBar>
        <H3>Fiche de données sur {person.name}</H3>{" "}
        {!editData && <EditButton onClick={() => setEditData(!editData)} />}
      </ToggleBar>
      <DataWrapper>
        {editData ? (
          <Formik
            initialValues={getInitialValues(dataScheme, person)}
            onSubmit={async (newData) => {
              submit(newData, {
                method: "post",
                action: `/people/${person.id}/update`,
              })
              setEditData(!setEditData)
            }}
          >
            <Form>
              <DataTemplate>
                <DataTemplate.Header>
                  {dataScheme.header.map((field, index) => {
                    return (
                      <FieldWrapper key={index}>
                        <label htmlFor={field.name}>
                          {field.label}&nbsp;:{" "}
                        </label>
                        <Field type="text" name={field.name} />
                      </FieldWrapper>
                    )
                  })}
                </DataTemplate.Header>

                <DataTemplate.Identity>
                  {dataScheme.identity.map((field, index) => {
                    return (
                      <FieldWrapper key={index}>
                        <label htmlFor={field.name}>
                          {field.label}&nbsp;:{" "}
                        </label>
                        <Field type="text" name={field.name} />
                      </FieldWrapper>
                    )
                  })}
                </DataTemplate.Identity>

                <DataTemplate.Appearence>
                  {dataScheme.appearance.map((field, index) => {
                    return (
                      <FieldWrapper key={index}>
                        <label htmlFor={field.name}>
                          {field.label}&nbsp;:{" "}
                        </label>
                        <Field type="text" name={field.name} />
                      </FieldWrapper>
                    )
                  })}
                </DataTemplate.Appearence>

                <DataTemplate.Footer>
                  <SubmitButton />
                </DataTemplate.Footer>
              </DataTemplate>
            </Form>
          </Formik>
        ) : (
          <DataTemplate>
            <DataTemplate.Header>
              {dataScheme.header.map((field, index) => {
                return (
                  <FieldWrapper key={index}>
                    <p>{field.label}&nbsp;:</p>
                    <p>
                      {person[field.name] || (
                        <em>aucune information disponible</em>
                      )}
                    </p>
                  </FieldWrapper>
                )
              })}
            </DataTemplate.Header>

            <DataTemplate.Identity>
              {dataScheme.identity.map((field, index) => {
                return (
                  <FieldWrapper key={index}>
                    <p>{field.label}&nbsp;:</p>
                    <p>
                      {person[field.name] || (
                        <em>aucune information disponible</em>
                      )}
                    </p>
                  </FieldWrapper>
                )
              })}
            </DataTemplate.Identity>

            <DataTemplate.Appearence>
              {dataScheme.appearance.map((field, index) => {
                return (
                  <FieldWrapper key={index}>
                    <p>{field.label}&nbsp;:</p>
                    <p>
                      {person[field.name] || (
                        <em>aucune information disponible</em>
                      )}
                    </p>
                  </FieldWrapper>
                )
              })}
            </DataTemplate.Appearence>
          </DataTemplate>
        )}
      </DataWrapper>
    </>
  )
}
