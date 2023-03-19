import { useNavigate } from "react-router"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import Header, { TitleLink } from "../../utils/templates/Header"

import { importWorld } from "../../database/worlds"
import { readFile } from "../../utils/functions/files"
import { importEquipment } from "../../database/equipments"
import { importOrganisation } from "../../database/organisations"
import { importPerson } from "../../database/people"
import { importSite } from "../../database/sites"

const LeftDiv = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: center;
`
const Button = styled.button`
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  margin: 0;
  margin-right: 1em;
  padding: 0;
  color: ${colors.lightPrimary};
  background-color: ${(props) => props.color || colors.primary};
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

function AppHeader() {
  const navigate = useNavigate()

  const loadWorld = async () => {
    const newWorld = await readFile()
    const { people, organisations, sites, equipments } = newWorld.data
    delete newWorld.data
    const world = await importWorld(newWorld)
    if (world) {
      people.forEach((person) => importPerson(person))
      organisations.forEach((organisation) => importOrganisation(organisation))
      sites.forEach((site) => importSite(site))
      equipments.forEach((equipment) => importEquipment(equipment))
      navigate(`/worlds/${world.id}`)
    } else {
      alert("Ce monde existe déjà.")
    }
  }
  return (
    <Header>
      <LeftDiv>
        <Button onClick={loadWorld}>
          <FontAwesomeIcon icon={faFileArrowUp} />
        </Button>
        <TitleLink to="/worlds">Catalogue de mondes</TitleLink>
      </LeftDiv>
    </Header>
  )
}

export default AppHeader
