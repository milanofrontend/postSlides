import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: #005dad;
  border: 0;
  border-radius: 8px;
  padding: 10px 30px;
  color: white;
  margin-top: 20px;
`;

const Partecipant = styled.div`
  transform: scale(0.8);
  transition: all ease 200ms;
`;
const Winner = styled(Partecipant)`
  font-weight: bolder;
  transform: scale(1);
`;

const Partecipants = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  max-height: 500px;
  overflow: auto;
  flex-direction: column;
`;

export default class Raffle extends React.Component {
  constructor(props) {
    super(props);
    this.startCountdown = this.startCountdown.bind(this);
    this.countdown = this.countdown.bind(this);
    this.selectWinners = this.selectWinners.bind(this);
    this.state = {
      winners: this.props.winners,
      suspance: false
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.cd);
  }

  startCountdown() {
    const { winners } = this.state;
    if (winners.length > 0 && !window.confirm("Sei sicuro?")) {
      return;
    }

    this.setState({
      winners: [],
      timer: this.props.timer,
      cd: setInterval(this.countdown, 1000)
    });
  }

  countdown() {
    const { timer } = this.state;
    this.setState({
      timer: timer - 1
    });
    if (timer <= 0) {
      this.selectWinners();
    }
  }

  selectWinners() {
    const { prices, handleRaffle, partecipants } = this.props;
    const { cd } = this.state;

    const winners = [];

    if (prices.length > partecipants.length) { return; }

    for (let i = 0; prices.length > winners.length;) {
      const rand = Math.floor(Math.random() * partecipants.length);
      if (!winners.find((e) => e.emailaddress === partecipants[rand].emailaddress)) {
        winners.push({
          ...partecipants[rand],
          price: prices[i++]
        });
      }
    }

    clearInterval(cd);
    this.setState({
      suspance: true,
      cd: setTimeout(() => this.setState({ suspance: false, winners }), Math.random() * 2000 + 1000)
    });
    handleRaffle(winners);
  }

  render() {
    const { winners, suspance, timer } = this.state;
    const { prices, partecipants } = this.props;

    return (
      <div>
        <Partecipants>
          {
            partecipants.map((e, i) => (winners.find((w) => w.emailaddress === e.emailaddress))
              ? (
                <Winner key={i} title={e.emailaddress}>
                  <span title={winners.find((w) => w.emailaddress === e.emailaddress).price}>🏆 </span>
                  {e.cometichiami}
                  <small>[{winners.find((w) => w.emailaddress === e.emailaddress).price}]</small>
                </Winner>
              ) : (
                <Partecipant key={i} title={e.emailaddress}>
                  {e.cometichiami}
                </Partecipant>
              ))
          }
        </Partecipants>
        <div>
          {
            (!suspance)
              ? (timer >= 0)
                  ? <Button disabled>{timer}</Button>
                  : (
                      <Button
                        onClick={() => this.startCountdown()}
                        disabled={prices.length > partecipants.length}
                      >
                        {winners.length > 0 ? "Estrai di nuovo" : "Estrai i vincitori"}
                      </Button>
                    )
              : <Button disabled>suspance...</Button>
          }
        </div>
      </div>
    );
  }
}
