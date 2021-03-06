// Import React
import React from "react";
import styled from "styled-components";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import Spectacle Core tags
import { Deck, Heading, Image, Slide, Text, List, ListItem } from "spectacle";

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
  currentTalk,
  nextTalk
} from "../configuration";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  wwy: require("../assets/wwy.jpg"),
  natale: require("../assets/natale.png")
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
      winners:
        JSON.parse(localStorage.getItem(`winners-${currentTalk.id}`)) || []
    };
    this.onRaffle = this.onRaffle.bind(this);
  }

  onRaffle(winners) {
    this.setState({ winners });
    localStorage.setItem(`winners-${currentTalk.id}`, JSON.stringify(winners));
  }

  render() {
    return (
      <div>
        <Deck
          transition={["zoom", "slide"]}
          transitionDuration={500}
          theme={theme}
        >
          <Slide
            transition={["fade"]}
            bgColor="dark"
            textColor="primary"
            id="💬"
          >
            <Heading size={3} textColor="primary">
              Follow up
            </Heading>
            <A href="https://bit.ly/MFM-slack">//bit.ly/MFM-slack</A>
            <Logo />
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="⁉️">
            <Heading size={6} textColor="secondary" caps>
              Feedback please
            </Heading>
            <Heading size={6} textColor="secondary" caps>
              <A href={poll}>{poll.slice(5)}</A>
            </Heading>
            <QRCode url={poll} />
            <Heading size={3} textColor="secondary">
              Join the raffle!
            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="👇">
            <Heading size={3} textColor="secondary" caps>
              We want you
            </Heading>
            <Image src={images.wwy} />
            {/* <A href="https://github.com/milanofrontend/talks">
              github.com/milanofrontend/talks
            </A> */}
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="🗣">
            <Heading size={6} textColor="secondary" caps>
              Next talk: {nextTalk.date}
            </Heading>
            <Heading size={3} textColor="secondary">
              {nextTalk.title}
            </Heading>
            <Text textColor="secondary">
              {nextTalk.speaker} {nextTalk.twitter}
            </Text>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="🍕">
            <Heading size={6} textColor="secondary" caps>
              Thanks to:
            </Heading>
            <List>
              <ListItem>
                Mikamai<small>.com ➡</small> <big>🏠</big>
              </ListItem>
              <ListItem>
                Modo<small>.md ➡</small> <big>🍺</big>
              </ListItem>
              <ListItem>
                Crebs<small>.it ➡</small> <big>🍕</big>
              </ListItem>
              <ListItem>
                JetBrains<small>.com ➡</small> <big>🔏</big>
              </ListItem>
            </List>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" id="🏆">
            <Heading size={3} textColor="secondary">
              Raffle
            </Heading>
            <MFERaffle
              prices={prices}
              timer={timer}
              winners={this.state.winners}
              handleRaffle={this.onRaffle}
            />
          </Slide>
          <Slide transition={["fade"]} bgColor="secondary" id="😎">
            {/* <Heading size={3} textColor="primary">
              Buon Natale 🎄
            </Heading>
            <Image src={images.natale} /> */}
            {/* <Heading size={4} textColor="primary">
              ⚔️
            </Heading> */}
            <Heading size={6} textColor="primary">
              Thank you
            </Heading>
          </Slide>
        </Deck>
        <MFERafflePartecipants />
      </div>
    );
  }
}
