import { useSubmit } from "react-router-dom"
import { useState, useEffect } from "react"
import { Formik, Field, Form } from "formik"

import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { FixedDiv } from "../../utils/styles/Atoms"
import DataTemplate from "./DataTemplate"
import { EditButton, SubmitButton } from "../../components/buttons"

const StyledKeyword = styled.span`
  display: inline-block;
  background-color: ${colors.organisation};
  padding: 0 0.5em;
  margin: 0 0.5em;
`

export default function Data({ organisation }) {
  const [editData, setEditData] = useState(false)
  const [newKeyword, setNewKeyword] = useState("")
  const [newKeywords, setNewKeywords] = useState([])
  const submit = useSubmit()

  // Necessary for the mapping in case site.keywords is undefined
  organisation.keywords =
    (Array.isArray(organisation.keywords) && organisation.keywords) || []

  useEffect(() => {
    if (!organisation.name || organisation.name === "") {
      setEditData(true)
    }
  }, [organisation.name])

  return (
    <>
      {editData ? (
        <Formik
          initialValues={{
            name: organisation.name || "",
            keywords: [...organisation.keywords],
          }}
          onSubmit={async (newData) => {
            newData.keywords = newData.keywords.join("|")
            setNewKeywords([])
            submit(newData, {
              method: "post",
              action: `/organisations/${organisation.id}/update`,
            })
            setEditData(!setEditData)
          }}
        >
          <Form>
            <DataTemplate>
              <DataTemplate.Name>
                <Field type="text" name="name" />
              </DataTemplate.Name>
              <DataTemplate.KeyWords>
                {[...organisation.keywords, ...newKeywords].map(
                  (keyWord, index) => {
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
                  }
                )}
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
            </DataTemplate>

            <FixedDiv top="180px" right="80px">
              <SubmitButton type="submit" color={colors.organisation} />
            </FixedDiv>
          </Form>
        </Formik>
      ) : (
        <>
          <FixedDiv top="180px" right="80px">
            <EditButton
              onClick={() => setEditData(true)}
              color={colors.organisation}
            />
          </FixedDiv>
          <DataTemplate>
            <DataTemplate.Name>
              <span>{organisation.name || ""}</span>
            </DataTemplate.Name>
            <DataTemplate.KeyWords>
              {organisation.keywords &&
                organisation.keywords.map((keyword, index) => (
                  <span key={index}>
                    {keyword}
                    {index < organisation.keywords.length - 1 && ", "}
                  </span>
                ))}
            </DataTemplate.KeyWords>
          </DataTemplate>
        </>
      )}
    </>
  )
}
