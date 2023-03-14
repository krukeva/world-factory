import React from "react"
import styled from "styled-components"

//import colors from "../../utils/styles/colors"

import DefaultPicture from "../../assets/profile.png"

const Template = styled.div`
  width: 75%;
  margin-left: 5%;
  margin.right: 20%;
`
const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const DataTemplate = ({ children }) => {
  let subComponentList = Object.keys(DataTemplate)
  let subComponents = {}

  subComponentList.forEach((key) => {
    subComponents[key] = []
    React.Children.forEach(children, (child) => {
      const childType =
        child && child.type && (child.type.displayName || child.type.name)
      if (childType === key) {
        subComponents[key].push(child)
      }
    })
  })
  return (
    <Template>
      {subComponents.Header}

      <GridLayout>
        <div>
          <h4>Etat civil</h4>
          {subComponents.Identity}
        </div>
        <div>
          <h4>Apparence</h4>
          {subComponents.Appearence}
        </div>
      </GridLayout>
      {subComponents.Footer}
    </Template>
  )
}
export default DataTemplate

const StyledHeader = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: flex-start;
`
const ProfileImage = styled.img`
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  padding: 1em;
`

const Header = ({ children }) => {
  return (
    <StyledHeader>
      <div>{children}</div>
      <ProfileImage src={DefaultPicture} alt="Profile image" />
    </StyledHeader>
  )
}
DataTemplate.Header = Header

const Identity = (props) => <div>{props.children}</div>
DataTemplate.Identity = Identity

const Appearence = (props) => <div>{props.children}</div>
DataTemplate.Appearence = Appearence

const Footer = (props) => <div>{props.children}</div>
DataTemplate.Footer = Footer
