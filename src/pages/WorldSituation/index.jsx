import { useOutletContext, useSubmit } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, Form } from "formik"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark, faPen } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import DocumentEditor from "../../components/DocumentEditor"
import { FixedDiv } from "../../utils/styles/Atoms"
import { EditButton, SaveButton } from "../../components/buttons"

const H3 = styled.h3`
  margin: 1em 0;
  padding: 0;
`

const Wrapper = styled.div`
  width: 75%;
  margin: auto;
  background-color: white;
  min-height: 500px;
  padding: 50px;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: line;
  align-items: center;
  justify-content: space-around;
  border: 2px solid ${colors.primary};
`

const DataField = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: line;
  justify-content: flex-start;
  text-align: left;
`

const FieldLabel = styled.div`
  width: 80px;
  margin: 0;
  padding: 5px;
`
const FieldValue = styled.div`
  padding: 5px;
  margin: 0;
  min-width: 100px;
`
const Button = styled.button`
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  margin: 0;
  margin-left: 1em;
  padding: 2px;
  color: ${colors.lightPrimary};
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.color || colors.primary};
  -webkit-appearance: none;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

export default function WorldSituation() {
  const world = useOutletContext()
  const [editable, setEditable] = useState(false)
  const [editDateTime, setEditDateTime] = useState(false)
  const [value, setValue] = useState(
    (world.situation && world.situation.document) || ""
  )
  const submit = useSubmit()

  const toggleEdit = async () => {
    if (editable) {
      const situation = {
        ...world.situation,
        document: value,
      }
      submit(
        { situation: JSON.stringify(situation) },
        {
          method: "post",
          action: `/worlds/${world.id}/update/situation`,
          header: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    setEditable(!editable)
  }

  return (
    <div className="pageContainer">
      <H3>Point de situation</H3>
      {editDateTime ? (
        <Formik
          initialValues={{
            date: (world.situation && world.situation.date) || "1960-01-01",
            time: (world.situation && world.situation.time) || "12:00",
          }}
          onSubmit={async (newData) => {
            const situation = {
              ...world.situation,
              date: newData.date,
              time: newData.time,
            }
            submit(
              { situation: JSON.stringify(situation) },
              {
                method: "post",
                action: `/worlds/${world.id}/update/situation`,
                header: {
                  "Content-Type": "application/json",
                },
              }
            )
            setEditDateTime(false)
          }}
        >
          <StyledForm>
            <DataField>
              <FieldLabel>
                <label htmlFor="date">Date&nbsp;: </label>
              </FieldLabel>
              <FieldValue>
                <Field type="date" name="date" />
              </FieldValue>
            </DataField>
            <DataField>
              <FieldLabel>
                <label htmlFor="date">Heure&nbsp;: </label>
              </FieldLabel>
              <FieldValue>
                <Field type="time" name="time" />
              </FieldValue>
            </DataField>

            <div>
              <Button
                type="button"
                onClick={() => setEditDateTime(false)}
                color={colors.divider}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
              <Button type="submit">
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </div>
          </StyledForm>
        </Formik>
      ) : (
        <h4>
          Date:{" "}
          {(world.situation &&
            new Date(
              world.situation.date || "1960-01-01"
            ).toLocaleDateString()) ||
            "jj/mm/aaaa"}{" "}
          à {(world.situation && world.situation.time) || "hh:mm"}
          <Button type="button" onClick={() => setEditDateTime(true)}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </h4>
      )}

      <Wrapper>
        <FixedDiv top="180px" right="80px">
          {editable ? (
            <SaveButton onClick={toggleEdit} />
          ) : (
            <EditButton onClick={toggleEdit} />
          )}
        </FixedDiv>
        <DocumentEditor editable={editable} value={value} setValue={setValue} />
      </Wrapper>
    </div>
  )
}
