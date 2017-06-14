import React from "react";

const getFakes = function () {
  return new Array(Math.round(Math.random()))
    .fill(0)
    .map(() => ({
      cometichiami: Math.random(),
      emailaddress: Math.random()
    }));
};

const events = (function () {
  const topics = {};
  const hOP = topics.hasOwnProperty;

  const subscribe = function subscribe(topic, listener) {
    if (!hOP.call(topics, topic)) {
      topics[topic] = [];
    }
    const index = topics[topic].push(listener) - 1;

    return {
      "remove": () => delete topics[topic][index]
    };
  };

  const publish = function publish(topic, info) {
    if (!hOP.call(topics, topic)) { return; }
    topics[topic].forEach((item) => item(info !== undefined ? info : {}));
  };

  return {
    subscribe,
    publish
  };
})();

class Partecipants {
  constructor(url = false) {
    this.url = url;
    this.list = [];

    this.updatePartecipants();
    setInterval(this.updatePartecipants.bind(this), 2000);
  }

  parseResponse(entry) {
    return entry.content.$t
      .split(", ")
      .reduce((a, c) => ({
        ...a,
        [c.split(": ")[0]]: c.split(": ")[1]
      }), {});
  }

  updatePartecipants() {
    if (!this.url) {
      this.savePartecipants([...this.list, ...getFakes()]);
    } else {
      fetch(this.url, { cache: "no-store" })
        .then((response) => response.json())
        .then((json) => {
          if (json.feed.entry) {
            this.savePartecipants(json.feed.entry.map(this.parseResponse));
          } else {
            this.savePartecipants([]);
          }
        });
    }
  }

  savePartecipants(list) {
    this.list = list;
    events.publish("partecipants/update", list);
  }
}

const _partecipants = {};

export default function withPartecipants(url) {
  if (!_partecipants[url]) {
    _partecipants[url] = new Partecipants(url);
  }
  const partecipants = _partecipants[url];
  return function (ComposedComponent) {
    return class extends React.Component {

      constructor() {
        super();
        this.state = { list: partecipants.list || [] };
        this.updatePartecipants = this.updatePartecipants.bind(this);
      }

      componentWillMount() {
        this.setState({
          subscription: events.subscribe("partecipants/update", this.updatePartecipants)
        });
      }

      componentWillUnmount() {
        this.state.subscription.remove();
      }

      updatePartecipants(data) {
        this.setState({ list: data });
      }

      render() {
        return <ComposedComponent {...this.props} partecipants={this.state.list} />;
      }
    };
  };
}
