import React from 'react';
import  './loader.css'
import styled from 'styled-components'
const Loader = () => {
    return (
        <Container>
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Container>
    );
};  


const Container = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -40px;
  top: 40%;
  margin-top: -40px;
`

export default Loader;