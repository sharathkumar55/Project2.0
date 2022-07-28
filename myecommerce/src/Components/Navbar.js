import { Badge } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
const Container = styled.div`
height:60px;
`

const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
`

const Left = styled.div`
flex:1;
display:flex;
align-items:center;`

const Language = styled.span`
font-size:14px;
cursor:pointer;

`

const Input = styled.input`
border:none;
    `
const SearchContainer = styled.div`
    border:0.5px solid lightgrey;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px;

`
const Logo = styled.h1` 

font-weigt:bold;
`

const Center = styled.div`
flex:1;
text-align:center `
const Right = styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
`

const MenuItems = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
        <Left>
            <Language>En</Language>
            <SearchContainer>
                <Input></Input>
                <Search style={{color:"grey",fontSize:19}}></Search>
            </SearchContainer>
        </Left>
        <Center><Logo>ShopSa</Logo></Center>
        <Right>
            <MenuItems>Register</MenuItems>
            <MenuItems>Login</MenuItems>
            <MenuItems><Badge badgeContent={4} color="secondary">
            <ShoppingCartOutlinedIcon color="action" />
                    </Badge></MenuItems>
        </Right>
        </Wrapper>
        </Container>
  )
}

export default Navbar