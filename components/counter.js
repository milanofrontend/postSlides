import React from "react";
import styled from "styled-components";

const Count = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  color: #005dad;
  border: 5px solid currentColor;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default class Counter extends React.Component {
  render() {
    const tot = this.props.partecipants.length;
    return tot ? <Count>{tot}</Count> : null;
  }
}
