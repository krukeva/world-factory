import { Form, useSubmit } from "react-router-dom"
import { Formik, Form as FormikForm, Field } from "formik"
import * as Yup from "yup"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { RoundButton } from "../../utils/styles/Atoms"
import colors from "../../utils/styles/colors"

const StyledForm = styled(FormikForm)`
  padding: 10px 0;
`
const ErrorDiv = styled.div`
  color: red;
`

const GridTemplate = styled.div`
  margin: 5px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  gap: 25px;
`

const Button = styled(RoundButton)`
  height: 25px;
  width: 25px;
  font-size: 12px;
`
function AddButton({ onClick, type }) {
  return (
    <Button onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  )
}

function DeleteButton({ onClick, type }) {
  return (
    <Button color={colors.danger} onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  )
}

export function DirectRelationForm({
  actionPath,
  source,
  list,
  category,
  returnRoute,
}) {
  const submit = useSubmit()

  return (
    <Formik
      initialValues={{
        name: "",
        targetId: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("nécessaire"),
        targetId: Yup.string().min(2, "Too Short!").required("nécessaire"),
      })}
      onSubmit={async (values) => {
        submit(
          {
            ...values,
            category: category,
            sourceId: source.id,
            returnRoute: returnRoute,
          },
          {
            method: "post",
            action: actionPath,
          }
        )
        values.name = ""
        values.targetId = ""
      }}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <GridTemplate>
            {source.name}
            <div>
              <Field
                type="text"
                name="name"
                placeholder="a une relation avec"
              />
              {errors.name && touched.name ? (
                <ErrorDiv>{errors.name}</ErrorDiv>
              ) : null}
            </div>
            <div>
              <Field as="select" name="targetId">
                <option value="">--</option>
                {list.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Field>
              {errors.targetId && touched.targetId ? (
                <ErrorDiv>{errors.targetId}</ErrorDiv>
              ) : null}
            </div>
            <AddButton type="submit" />
          </GridTemplate>
        </StyledForm>
      )}
    </Formik>
  )
}

export function InverseRelationForm({
  actionPath,
  list,
  target,
  category,
  returnRoute,
}) {
  const submit = useSubmit()

  return (
    <Formik
      initialValues={{
        name: "",
        sourceId: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("nécessaire"),
        sourceId: Yup.string().min(2, "Too Short!").required("nécessaire"),
      })}
      onSubmit={async (values) => {
        submit(
          {
            ...values,
            category: category,
            targetId: target.id,
            returnRoute: returnRoute,
          },
          {
            method: "post",
            action: actionPath,
          }
        )
        values.name = ""
        values.sourceId = ""
      }}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <GridTemplate>
            <div>
              <Field as="select" name="sourceId">
                <option value={null}>--</option>
                {list.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Field>
              {errors.sourceId && touched.sourceId ? (
                <ErrorDiv>{errors.sourceId}</ErrorDiv>
              ) : null}
            </div>
            <div>
              <Field
                type="text"
                name="name"
                placeholder="a une relation avec"
              />
              {errors.name && touched.name ? (
                <ErrorDiv>{errors.name}</ErrorDiv>
              ) : null}
            </div>
            {target.name}
            <AddButton type="submit" />
          </GridTemplate>
        </StyledForm>
      )}
    </Formik>
  )
}

export function DirectRelationAsListItem({ source, relation, returnRoute }) {
  return (
    <GridTemplate>
      <span>{source.name}</span> <span>{relation.name}</span>
      <span>{relation.targetName}</span>
      <Form method="post" action={`/relations/${relation.id}/delete`}>
        <input type="hidden" name="returnRoute" value={returnRoute} />
        <DeleteButton type="submit" />
      </Form>
    </GridTemplate>
  )
}

export function InverseRelationAsListItem({ relation, target, returnRoute }) {
  return (
    <GridTemplate>
      <span>{relation.sourceName}</span>
      <span>{relation.name}</span>
      <span>{target.name}</span>
      <Form method="post" action={`/relations/${relation.id}/delete`}>
        <input type="hidden" name="returnRoute" value={returnRoute} />
        <DeleteButton type="submit" />
      </Form>
    </GridTemplate>
  )
}
