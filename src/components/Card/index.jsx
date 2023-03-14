import PropTypes from "prop-types"
import styled from "styled-components"
import colors from "../../utils/styles/colors"
import DefaultPicture from "../../assets/profile.png"

const CardLabel = styled.span`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: bold;
  text-align: left;
`

const CardTitle = styled.span`
  color: '#000000'};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin: auto;
  padding: 1em;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  justify-content: center;
  width: 100%;
`

const CardHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: solid;
  border-radius: 30px;
  justify-content: center;
  padding: 15px;
  width: 100%;
`

const CardHeaderRight = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  justify-content: center;
  padding: 15px;
  width: 100%;
`

const CardBody = styled.div`
  margin: auto;
  display: bloc;
  text-align: left;
  width: 100%;
  max-height: 100px;
  overflow: hidden;
`

const CardWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${colors.lightPrimary};
  border-radius: 30px;
  width: 350px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
  text-decoration: none;
`

function Card({ label, title, picture, description }) {
  return (
    <CardWrapper>
      <CardHeader>
        <CardHeaderLeft>
          <CardImage src={picture} alt="freelance" />
          <p>
            <CardTitle>{title}</CardTitle>
          </p>
        </CardHeaderLeft>
        <CardHeaderRight>
          <p>
            <CardLabel>{label}</CardLabel>
          </p>
        </CardHeaderRight>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
    </CardWrapper>
  )
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

Card.defaultProps = {
  label: "label par défaut",
  title: "titre par défaut",
  picture: DefaultPicture,
  description: "aucune description",
}

export default Card
