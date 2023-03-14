import { useLoaderData, useSubmit } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, Form } from "formik"

import styled from "styled-components"

import colors from "../../utils/styles/colors"
import { StyledLink } from "../../utils/styles/Atoms"

import QuillEditor from "../../components/QuillEditor"

const SideBar = styled.nav`
  width: 20%;
  padding-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Main = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LargeForm = styled(Form)`
  width: 100%;
`
const Button = styled.button`
  display: block;
  margin: 2em auto;
  padding: 1em;
  border-radius: 1em;
  border-color: ${colors.lightPrimary};
  font-size: 20px;
  background-color: ${colors.primary};
  color: ${colors.lightPrimary};
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`
const Title = styled.div`
  display: flex;
  align-items: center;
`

const H1 = styled.h1`
  margin-right: 1em;
`

const H3 = styled.h3`
  margin-top: 2em;
`

const Metadata = styled.div`
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
`

const Categories = styled.div`
  flex-direction: column;
`
const Label = styled.label`
  display: block;
`
const LargeField = styled(Field)`
  font-size: 16px;
  width: 50%;
  padding: 5px;
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
      <SideBar>
        <StyledLink to=".">Synthèse</StyledLink>
        <StyledLink to="theater">Théâtre principal</StyledLink>
        <StyledLink to="context">Contexte général</StyledLink>
      </SideBar>

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
            console.log(values)
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
            <Title>
              <H1>
                {world.name ? (
                  <>{world.name}</>
                ) : (
                  <>
                    <label htmlFor="name">Nom&nbsp;: </label>
                    <LargeField
                      id="name"
                      name="name"
                      placeholder="Le monde de Sophie..."
                    />
                  </>
                )}
              </H1>
            </Title>

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
                    <Field type="radio" name="era" value="far-past" />
                    passé éloigné
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="near-past" />
                    passé récent
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="current" />
                    époque contemporaine
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="near-future" />
                    futur proche
                  </Label>
                  <Label>
                    <Field type="radio" name="era" value="far-future" />
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
            <div>
              <p>
                <strong>Mots-clefs&nbsp;:</strong>
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
            </div>

            <H3>Description</H3>
            <QuillEditor value={editorContent} setValue={setEditorContent} />

            <Button type="submit">Submit</Button>
          </LargeForm>
        </Formik>
      </Main>
    </div>
  )
}
