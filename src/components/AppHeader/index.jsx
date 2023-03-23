import { useNavigate } from "react-router"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import Header, { TitleLink } from "../../utils/templates/Header"

import { importWorld } from "../../database/worlds"
import { readFile } from "../../utils/functions/files"
import { importEquipmentList } from "../../database/equipments"
import { importOrganisationList } from "../../database/organisations"
import { importPeople } from "../../database/people"
import { importSiteList } from "../../database/sites"
import { importRelationList } from "../../database/relations"

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
    const { people, organisations, sites, equipments, relations } =
      newWorld.data
    delete newWorld.data
    //console.log(people)
    const world = await importWorld(newWorld)
    if (world) {
      importPeople(people)
      importOrganisationList(organisations)
      importEquipmentList(equipments)
      importSiteList(sites)
      importRelationList(relations)
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
