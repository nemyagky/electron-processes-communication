import React from 'react';
import styled from 'styled-components';


export const MovableBox: React.FC = () => (
    <Box></Box>
)

export const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  cursor: pointer;
`;