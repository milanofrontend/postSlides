// Import React
import React from "react";
import styled from "styled-components";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  Image,
  Slide,
  Text
} from "spectacle";

import withPartecipants from "../modules/partecipants";
import Raffle from "../components/raffle";
import Counter from "../components/counter";
import QRCode from "../components/qrcode";
import Logo from "../components/mfe-logo";

import {
  theme,
  url,
  poll,
  prices,
  timer,
  nextTalk
} from "../configuration";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  wwy: require("../assets/wwy.jpg")
};
preloader(images);

@withPartecipants(url)
class MFERaffle extends React.Component {
  render() {
    return <Raffle {...this.props} />;
  }
}

@withPartecipants(url)
class MFERafflePartecipants extends React.Component {
  render() {
    return <Counter {...this.props} />;
  }
}

const A = styled.a`
  color: currentColor;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 3px;
`;

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winners: localStorage.getItem("winners") || []
    };
    this.onRaffle = this.onRaffle.bind(this);
  }

  onRaffle(winners) {
    this.setState({ winners });
    localStorage.setItem("winners", winners);
  }

  render() {
    return (
      <div>
        <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
          <Slide transition={["fade"]} bgColor="dark" textColor="primary" id="💬">
            <Heading size={3} textColor="primary">Follow up</Heading>
            <Logo />
            <A href="http://milanofrontend.herokuapp.com/">
              milanofrontend.herokuapp.com
            </A>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="⁉️">
            <Heading size={6} textColor="secondary" caps>Feedback please</Heading>
            <Heading size={3} textColor="secondary">Join the raffle!</Heading>
            <QRCode url={poll} />
            <div><A href={poll}>{poll}</A></div>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="👇">
            <Heading size={3} textColor="secondary" caps>We want you</Heading>
            <Image src={images.wwy} />
            <A href="https://github.com/milanofrontend/talks">
              github.com/milanofrontend/talks
            </A>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="🗣">
            <Heading size={6} textColor="secondary" caps>
              Next talk: {nextTalk.date}
            </Heading>
            <Heading size={3} textColor="secondary">{nextTalk.title}</Heading>
            <Text textColor="secondary">
              {nextTalk.speaker} {nextTalk.twitter}
            </Text>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="🏆">
            <Heading size={3} textColor="secondary">Raffle</Heading>
            <MFERaffle prices={prices} timer={timer} winners={this.state.winners} handleRaffle={this.onRaffle} />
          </Slide>
          <Slide transition={["fade"]} bgColor="secondary" id="🖖">
            <Heading size={6} textColor="primary" caps>Thank you</Heading>
            <Heading size={4} textColor="primary">🖖 Live long and prosper</Heading>
          </Slide>
        </Deck>
        <MFERafflePartecipants />
      </div>
    );
  }
}
