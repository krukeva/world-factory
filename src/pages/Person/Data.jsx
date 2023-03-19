import { useSubmit } from "react-router-dom"
import { useState, useEffect } from "react"
import { Formik, Field, Form } from "formik"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import { FixedDiv } from "../../utils/styles/Atoms"
import DataTemplate from "./DataTemplate"
import { EditButton, SubmitButton } from "../../components/buttons"
import dataScheme from "./dataScheme"
const dataBlocks = Object.keys(dataScheme)

const StyledKeyword = styled.span`
  display: inline-block;
  background-color: ${colors.person};
  padding: 0 0.5em;
  margin: 0 0.5em;
`

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
  border-bottom: 2px solid ${colors.person};
  padding: 5px;
  margin: 0;
  min-width: 100px;
`

function getInitialValues(person) {
  let initialValue = {
    name: person.name || "",
    activity: person.activity || "",
    keywords: [...person.keywords],
  }
  for (let i = 0; i < dataBlocks.length; i++) {
    let keyList = dataScheme[dataBlocks[i]].fields
    for (let j = 0; j < keyList.length; j++) {
      initialValue[keyList[j].name] = person[keyList[j].name] || ""
    }
  }
  console.log(initialValue)
  return initialValue
}

export default function Data({ person }) {
  const [editData, setEditData] = useState(false)
  const [newKeyword, setNewKeyword] = useState("")
  const [newKeywords, setNewKeywords] = useState([])
  const submit = useSubmit()

  // Necessary for the mapping in case site.keywords is undefined
  person.keywords = (Array.isArray(person.keywords) && person.keywords) || []

  useEffect(() => {
    if (!person.name || person.name === "") {
      setEditData(true)
    }
  }, [person.name])

  return (
    <>
      {editData ? (
        <Formik
          initialValues={getInitialValues(person)}
          onSubmit={async (newData) => {
            newData.keywords = newData.keywords.join("|")
            //console.log(newData)
            setNewKeywords([])
            submit(newData, {
              method: "post",
              action: `/people/${person.id}/update`,
            })
            setEditData(!setEditData)
          }}
        >
          <Form>
            <DataTemplate>
              <DataTemplate.Name>
                <Field type="text" name="name" />
              </DataTemplate.Name>
              <DataTemplate.Activity>
                <Field type="text" name="activity" />
              </DataTemplate.Activity>
              <DataTemplate.KeyWords>
                {[...person.keywords, ...newKeywords].map((keyWord, index) => {
                  return (
                    <StyledKeyword key={index}>
                      <label>
                        <Field
                          type="checkbox"
                          name="keywords"
                          value={keyWord}
                        />
                        {keyWord}
                      </label>
                    </StyledKeyword>
                  )
                })}
                <p>
                  <label>Ajouter un mot-clef&nbsp;: </label>
                  <input
                    type="text"
                    name="newWord"
                    value={newKeyword}
                    onChange={(e) => {
                      setNewKeyword(e.target.value)
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      if (newKeyword.length) {
                        setNewKeywords([...newKeywords, newKeyword])
                        setNewKeyword("")
                      }
                    }}
                  >
                    OK
                  </button>
                </p>
              </DataTemplate.KeyWords>
              {dataBlocks.map((block) => {
                return (
                  <DataTemplate.DataBlock
                    key={block}
                    title={dataScheme[block].label}
                  >
                    {dataScheme[block].fields.map((field) => {
                      return (
                        <DataField key={field.label}>
                          <FieldLabel>
                            <label htmlFor={field.name}>
                              {field.label}&nbsp;:{" "}
                            </label>
                          </FieldLabel>
                          <FieldValue>
                            <Field type="text" name={field.name} />
                          </FieldValue>
                        </DataField>
                      )
                    })}
                  </DataTemplate.DataBlock>
                )
              })}
            </DataTemplate>

            <FixedDiv top="180px" right="80px">
              <SubmitButton type="submit" color={colors.person} />
            </FixedDiv>
          </Form>
        </Formik>
      ) : (
        <>
          <FixedDiv top="180px" right="80px">
            <EditButton
              onClick={() => setEditData(true)}
              color={colors.person}
            />
          </FixedDiv>
          <DataTemplate>
            <DataTemplate.Name>
              <span>{person.name || ""}</span>
            </DataTemplate.Name>
            <DataTemplate.Activity>
              <span>{person.activity || ""}</span>
            </DataTemplate.Activity>
            <DataTemplate.KeyWords>
              {person.keywords &&
                person.keywords.map((keyword, index) => (
                  <span key={index}>
                    {keyword}
                    {index < person.keywords.length - 1 && ", "}
                  </span>
                ))}
            </DataTemplate.KeyWords>
            {dataBlocks.map((block) => {
              return (
                <DataTemplate.DataBlock
                  key={block}
                  title={dataScheme[block].label}
                >
                  {dataScheme[block].fields.map((field) => {
                    return (
                      <DataField key={field.label}>
                        <FieldLabel>{field.label}&nbsp;: </FieldLabel>
                        <FieldValue>{person[field.name]}</FieldValue>
                      </DataField>
                    )
                  })}
                </DataTemplate.DataBlock>
              )
            })}
          </DataTemplate>
        </>
      )}
    </>
  )
}
