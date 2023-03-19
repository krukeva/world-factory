import { useOutletContext, Form, useNavigate } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import Modal from "../../utils/templates/Modal"

const Buttons = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: center;
`

const Button = styled.button`
  margin: 1em;
  padding: 0.5em;
  min-width: 100px;
  background-color: ${colors.primary};
  color: ${colors.text};
`

const DeleteButton = styled(Button)`
  background-color: ${colors.danger};
`

export default function DeleteWorld() {
  const [show, setShow] = useState(true)
  const world = useOutletContext()
  const navigate = useNavigate()

  return (
    <>
      <div>
        <h3>{world.name}</h3>
      </div>
      <Modal show={show} onClose={() => setShow(false)} colorTheme="danger">
        <Modal.Header>Suppression d'un monde</Modal.Header>
        <Modal.Body>
          <p>
            Attention, la suppression du monde{" "}
            <b>
              &laquo;&nbsp;{`${world.name}`}
              &nbsp;&raquo;
            </b>{" "}
            est définitive&nbsp;!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Buttons>
            <Form method="post">
              <DeleteButton type="submit">OK</DeleteButton>
            </Form>
            <Button type="button" onClick={() => navigate("/worlds")}>
              Annuler
            </Button>
          </Buttons>
        </Modal.Footer>
      </Modal>
    </>
  )
}
