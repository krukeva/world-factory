import { useState } from "react"
import { Formik, Field, Form } from 'formik'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from "@fortawesome/free-solid-svg-icons"


const Title = styled.h2`
    margin: 0;
    padding: 10px 0;
`
const EditButton = styled.button`
    margin-left: 1em;
    border-radius: 50%;
    vertical-align: top;
    border-style: none;
`
const LargeField = styled(Field)`
    font-size: 16px;
    width: 50%;
    padding: 5px;
`
const SubmitButton = styled.button`
    font-size: 16px;
    padding: 5px 10px;
    margin-left: 5px;
    border-radius: 25%;
    border-style: none;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
          rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }
`

export default function EditableTitle( { formKey, initialValue, onSubmit } ) {
    const [editTitle, setEditTitle] = useState( initialValue === "")

    return (
        <Title>
            { editTitle ? (
                <Formik 
                    initialValues = {{
                        name: initialValue
                    } }    
                    onSubmit={ ( value ) => {
                        onSubmit(value)
                        setEditTitle(false)
                    } }
                >
                    <Form>
                        <LargeField type="text" name={formKey} />
                        <SubmitButton type="submit">OK</SubmitButton>
                    </Form>
                </Formik>
            ) : (
                <>
                    { initialValue }
                    <EditButton type="button" onClick={()=>setEditTitle(true)}>
                        <FontAwesomeIcon icon={faPen} />
                    </EditButton>
                </>
            )}
        </Title>
    )
}