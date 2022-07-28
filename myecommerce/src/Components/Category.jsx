import styled from "styled-components"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"

const Container = styled.div`
display:flex;
padding:20px;
`

const Category = () => {
  return (
    <Container>
        {categories.map(item=>(
            <CategoryItem item={item}></CategoryItem>
        ))}
    </Container>
  )
}

export default Category