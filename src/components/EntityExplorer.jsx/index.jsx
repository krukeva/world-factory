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
  padding-top: 0.5em;
`

const H2 = styled.h2`
  font-size: 18px;
`

const StyledTab = styled.button`
  margin-left: 1em;
  background-color: ${(props) => (props.isActive ? "#ccc" : "inherit")};
  flex-basis: 0;
  flex-grow: 1;
  border: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  padding: 32px 16px 32px 16px;
  transition: 0.3s;
  &: hover {
    background-color: #ddd;
  }
`

const StyledTabList = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: line;
  align-items: center;
`

const StyledTabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  background-color: ${(props) => (props.isActive ? "#ccc" : "inherit")};
  padding: 6px 12px;
  margin-top: 0;
  min-height: 550px;
`

const TabContainer = styled.div``

export default function EntityExplorer({
  world,
  entity,
  entityLabel,
  tabList,
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
            <StyledTabContent key={index} isActive={activeTab === index}>
              {child}
            </StyledTabContent>
          )
        })}
      </TabContainer>
    </div>
  )
}

const ToggleBar = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-start;
`

const H3 = styled.h3`
  margin-right: 1em;
`

const Wrapper = styled.div`
  background-color: white;
  position: relative;
`

const TabContent = ({ title, children }) => {
  return (
    <div>
      <ToggleBar>
        <H3>{title}</H3>
      </ToggleBar>
      <Wrapper>{children}</Wrapper>
    </div>
  )
}
EntityExplorer.TabContent = TabContent
