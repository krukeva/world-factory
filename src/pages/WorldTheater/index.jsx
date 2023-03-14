import { useOutletContext, useSubmit } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import TabContent from "../../components/TabContent"

const StyledTab = styled.button`
  background-color: ${(props) => (props.isActive ? "#ccc" : "inherit")};
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  &: hover {
    background-color: #ddd;
  }
`

const StyledTabList = styled.div`
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: line;
  align-items: center;
`

const StyledTabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
`

const TabContainer = styled.div``

const theaterTabList = [
  {
    name: "outline",
    label: "Résumé",
  },
  {
    name: "geography",
    label: "Géographie",
  },
  {
    name: "politics",
    label: "Politique",
  },
  {
    name: "economics",
    label: "Economie",
  },
  {
    name: "military",
    label: "Géographie",
  },
  {
    name: "society",
    label: "Société",
  },
  {
    name: "infrastructures",
    label: "Infrastructures",
  },
  {
    name: "information",
    label: "Information",
  },
  {
    name: "misc",
    label: "Divers",
  },
]

export default function WorldTheater() {
  const [activeTab, setActiveTab] = useState(0)
  const world = useOutletContext()
  const submit = useSubmit()

  const updateTheater = (newValues) => {
    submit(
      {
        theater: JSON.stringify(newValues),
      },
      {
        method: "post",
        action: `/worlds/${world.id}/update/theater`,
        header: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  return (
    <div className="pageContainer">
      <h3>
        <em>&laquo;&nbsp;{world.name}&nbsp;&raquo; </em> -- Theâtre d'opération
      </h3>

      <StyledTabList>
        {theaterTabList.map((subject, index) => (
          <StyledTab
            key={index}
            type="button"
            onClick={() => setActiveTab(index)}
            isActive={activeTab === index}
          >
            {subject.label}
          </StyledTab>
        ))}
      </StyledTabList>

      <TabContainer>
        {theaterTabList.map((subject, index) => (
          <StyledTabContent key={index} isActive={activeTab === index}>
            <TabContent
              initialValue={world.theater[subject.name] || ""}
              update={(value) => {
                const myTheater = world.theater
                myTheater[subject.name] = value
                updateTheater(myTheater)
              }}
            />
          </StyledTabContent>
        ))}
      </TabContainer>
    </div>
  )
}
