import styled from "styled-components"
const Container = styled.div`
`
const Image = styled.img`
`

const Info = styled.p`
`

const Title = styled.h1`
`
const Button = styled.button`
`
const CategoryItem = ({item}) => {
  return (
    <Container>
        <Image>{item.img}</Image>
        <Info>
            <Title>{item.title}</Title>
            <Button>Show Now</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem