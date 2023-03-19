import { useLoaderData, useSubmit } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, Form } from "formik"

import styled from "styled-components"

import colors from "../../utils/styles/colors"

import QuillEditor from "../../components/QuillEditor"
import { FixedDiv } from "../../utils/styles/Atoms"
import { SubmitButton } from "../../components/buttons"

const Main = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LargeForm = styled(Form)`
  width: 100%;
`

const DataField = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  display: flex;
  flex-direction: line;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
`
const FieldValue = styled.div`
  border-bottom: 2px solid ${colors.primary};
  padding: 5px;
  margin: 0;
  width: 100%;
`

const StyledField = styled(Field)`
  font-size: 20px;
  width: 100%;
  padding: 5px;
`

const H4 = styled.h4`
  margin: 1em 0;
  padding: 0;
`

const Metadata = styled.div`
  margin: 0;
  padding: 0 2em;
  background-color: ${colors.lightPrimary};
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  & p {
    margin: 0;
    padding: 1em 0;
  }
`

const Categories = styled.div`
  flex-direction: column;
`

const KeyWords = styled.div`
  margin: 0;
  padding: 0 2em;
  background-color: ${colors.lightPrimary};
  display: block;
  & p {
    margin: 0;
    padding: 1em 0;
  }
`

const Description = styled.div`
  margin: 0;
  padding: 0;
  background-color: ${colors.lightPrimary};
  min-height: 200px;
  text-align: left;
  padding: 1%;
`

const Label = styled.label`
  display: block;
`

const StyledKeyword = styled.span`
  display: inline-block;
  background-color: ${colors.lightPrimary};
  padding: 0 0.5em;
  margin: 0 0.5em;
`

export default function WorldEdit() {
  const { world } = useLoaderData()
  const submit = useSubmit()
  const [editorContent, setEditorContent] = useState(world.description || "")
  const [newKeyword, setNewKeyword] = useState("")
  const [newKeywords, setNewKeywords] = useState([])

  // Necessary for the mapping in case world.keywords is undefined
  world.keywords = (Array.isArray(world.keywords) && world.keywords) || []

  return (
    <div className="pageContainerWithNav">
      <Main>
        <Formik
          initialValues={{
            name: world.name,
            scale: world.scale,
            era: world.era,
            geopolitics: world.geopolitics,
            keywords: [...world.keywords, ...newKeywords],
          }}
          onSubmit={async (values) => {
            values.keywords = values.keywords.join("|")
            submit(
              { ...values, description: editorContent },
              {
                method: "post",
                action: `/worlds/${world.id}/update`,
              }
            )
          }}
        >
          <LargeForm>
            <H4>
              <label htmlFor="name">Nom</label>
            </H4>
            <DataField>
              <FieldValue>
                <StyledField type="text" name="name" />
              </FieldValue>
            </DataField>

            <H4>Métadonnées</H4>
            <Metadata>
              <div>
                <p>
                  <strong>Echelle</strong>
                </p>
                <Categories>
                  <Label>
                    <Field type="radio" name="scale" value="world" />
                    le monde entier
                  </Label>
                  <Label>
                    <Field type="radio" name="scale" value="continent" />
                    un continent
                  </Label>
                  <Label>
                    <Field type="radio" name="scale" value="region" />
                    quelque pays
                  </Label>
                  <Label>
                    <Field type="radio" name="scale" value="country" />
                    un pays
                  </Label>
                  <Label>
                    <Field type="radio" name="scale" value="subcountry" />
                    un zone à l'intérieur d'un pays
                  </Label>
                  <Label>
                    <Field type="radio" name="scale" value="city" />
                    une ville
                  </Label>
                </Categories>
              </div>
              <div>
                <p>
                  <strong>Période</strong>
                </p>
                <Categories>
                  <Label>
                    <Field type="radio" name="era" value="farPast" />
                    passé éloigné
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="nearPast" />
                    passé récent
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="current" />
                    époque contemporaine
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="nearFuture" />
                    futur proche
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="farFuture" />
                    futur lointain
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="unknown" />
                    indéterminé
                  </Label>
                </Categories>
              </div>
              <div>
                <div>
                  <p>
                    <strong>Géopolitique</strong>
                  </p>
                  <Categories>
                    <Label>
                      <Field type="radio" name="geopolitics" value="real" />
                      le monde réel
                    </Label>
                    <Label>
                      <Field
                        type="radio"
                        name="geopolitics"
                        value="alternate"
                      />
                      une uchronie
                    </Label>
                    <Label>
                      <Field
                        type="radio"
                        name="geopolitics"
                        value="fictional"
                      />
                      un monde fictionel
                    </Label>
                  </Categories>
                </div>
              </div>
            </Metadata>

            <H4>Description</H4>
            <Description>
              <QuillEditor value={editorContent} setValue={setEditorContent} />
            </Description>

            <H4>Mots-clefs</H4>
            <KeyWords>
              <p>
                {[...world.keywords, ...newKeywords].map((keyWord, index) => {
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
              </p>

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
            </KeyWords>

            <FixedDiv top="180px" right="80px">
              <SubmitButton type="submit" />
            </FixedDiv>
          </LargeForm>
        </Formik>
      </Main>
    </div>
  )
}
