import React from "react";
import QRCodeLib from "qrcode";

export default class QRCode extends React.Component {
  componentDidMount() {
    QRCodeLib.toCanvas(this.canvas, this.props.url, {
      scale: 14,
      color: {
        dark: "#005dad"
      }
    }, (e) => e);
  }

  render() {
    return <canvas ref={(el) => { this.canvas = el; }} />;
  }
}
