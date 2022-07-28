import styled from 'styled-components'

const Container = styled.div`
height:30px;
background-color:teal;
color:white;
font-size:20px;
font-weight:500;
align-items:center;
justify-content:center;
display:flex;
`

const Announcement = () => {
  return (
    <Container>
        Ohhh!! Super Deal..free shipping on order above 300 rupees
    </Container>
  )
}

export default Announcement