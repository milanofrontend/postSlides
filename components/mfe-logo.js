import React from "react";
import styled from "styled-components";

const size = "300px";
const borderSize = `${300 / 12}px`;
const color = "#005dad";
const animationLength = "500ms";

const Wrapper = styled.div`
  padding: 10px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.dark ? "#000b14" : "transparent"};
`;

const Dom = styled.div`
  width: ${borderSize};
  height: 100%;
  background-color: ${color};
  position: relative;
  box-sizing: border-box;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all ease ${animationLength};

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    box-sizing: border-box;
    border-right: ${borderSize} solid ${color};
    border-left: ${borderSize} solid ${color};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all ease ${animationLength};
  }

  &::before {
    height: 75%;
    width: 450%;
    opacity: 0.8;
  }

  &::after {
    height: 50%;
    width: 800%;
    opacity: 0.6;
  }
`;

const Tag = styled.div`
  width: ${size};
  height: ${size};
  flex: 0 0 ${size};
  position: relative;
  padding: calc(${borderSize} * 2);
  margin: calc(${size} / 5);
  display: inline-block;
  box-sizing: border-box;

  &.is-hover {
    &::before,
    &::after {
      transform: rotate(-225deg);
    }

    &::before {
      opacity: 0;
    }

    ${Dom} {
      transform: rotate(40deg);

      &::before,
      &::after {
        opacity: 0;
        transform: translateX(-50%) scaleX(0.1);
      }
    }
  }
  
  &::before,
  &::after {
    transition: all ease ${animationLength};
    display: block;
    box-sizing: border-box;
    content: '';
    position: absolute;
    border-radius: 4%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: ${borderSize} solid ${color};
    clip-path: polygon(
       45%   0,
        0    45%,
        0    0,
      100%   0,
      100% 100%,
       55% 100%,
      100%  55%,
      100%   0
    );
  }

  &::before {
    opacity: 0.6;
  }

  &::after {
    transform: rotate(90deg);
  }
`;

export default class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: true,
      timeout: 0
    };
    this.toggleState = this.toggleState.bind(this);
  }

  componentWillMount() {
    this.setState({ timeout: setTimeout(this.toggleState, 3000) });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  toggleState() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    return (
      <Wrapper>
        <Tag
          className={this.state.hover ? "is-hover" : ""}
          onClick={() => this.toggleState()}
        >
          <Dom />
        </Tag>
      </Wrapper>
    );
  }
}
