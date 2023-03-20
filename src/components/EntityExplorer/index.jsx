import { Link } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"

const NavBar = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  text-align: left;
  align-items: center;
  margin: 0;
  padding: 0;
  padding-top: 16px;
`

const H2 = styled.h2`
  font-size: 18px;
  margin: 0;
  padding: 0;
`

const StyledTab = styled.button`
  margin-left: 1em;
  background-color: ${(props) =>
    props.isActive ? props.color || "#ccc" : "inherit"};
  flex-basis: 0;
  flex-grow: 1;
  border: 1px solid ${(props) => props.color || "#ccc"};
  outline: none;
  cursor: pointer;
  padding: 16px;
  transition: 0.3s;
  font-size: 16px;
  &: hover {
    background-color: #ddd;
  }
`

const StyledTabList = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: line;
  align-items: center;
  width: 50%;
`

const StyledTabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  background-color: ${(props) =>
    props.isActive ? props.color || "#ccc" : "inherit"};
  padding: 12px;
  margin-top: 0;
  min-height: 450px;
  wdth: 100%;
`

const TabContainer = styled.div``

export default function EntityExplorer({
  world,
  entity,
  entityLabel,
  tabList,
  color,
  children,
}) {
  const [activeTab, setActiveTab] = useState(0)

  let tabContents = []
  React.Children.forEach(children, (child) => {
    const childType =
      child && child.type && (child.type.displayName || child.type.name)
    if (childType === "TabContent") {
      tabContents.push(child)
    }
  })

  return (
    <div className="pageContainer">
      <NavBar>
        <H2>
          <em>
            &laquo;&nbsp;
            <Link to={`/worlds/${world.id}/data`}>{world.name}</Link>
            &nbsp;&raquo;
          </em>
          &nbsp;&gt; {entityLabel}&nbsp;: {entity.name}
        </H2>
        <StyledTabList>
          {tabList.map((tabName, index) => {
            return (
              <StyledTab
                key={index}
                type="button"
                onClick={() => setActiveTab(index)}
                isActive={activeTab === index}
                color={color}
              >
                {tabName}
              </StyledTab>
            )
          })}
        </StyledTabList>
      </NavBar>

      <TabContainer>
        {tabContents.map((child, index) => {
          return (
            <StyledTabContent
              key={index}
              isActive={activeTab === index}
              color={color}
            >
              {child}
            </StyledTabContent>
          )
        })}
      </TabContainer>
    </div>
  )
}

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  margin: auto;
`

const TabContent = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
EntityExplorer.TabContent = TabContent
