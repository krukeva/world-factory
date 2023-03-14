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
        {subComponents.DataBlock.map((dataBlock, index) => {
          return <div key={index}>{dataBlock}</div>
        })}
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

const DataBlock = (props) => <div>{props.children}</div>
DataTemplate.DataBlock = DataBlock
