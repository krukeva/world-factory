import { createGlobalStyle } from "styled-components"

import colors from "./colors"

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        background-color: white;
        margin: 0;  
    }

    div.pageContainer {
        margin: 0 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    div.withBackground {
        background-color: ${colors.lightPrimary};
    }

    div.pageContainerWithNav {
        margin: 0 2em;
        display: flex;
        flex-direction: line;
        justify-content: space-between;
        align-items: top;
    }

    div.subPageContainer {
        width: 100%;
    }

    .form-textarea{
        display: bloc;
        margin: auto;
        width: 100%;
        background-color: ${colors.lightPrimary};
        min-height: 200px;
        text-align: left;
        padding: 1%;
        font-size: 18px;
    }
`
function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
