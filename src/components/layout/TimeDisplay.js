import React, { Component } from "react";

class TimeDisplay extends Component {
  state = { time: new Date().toLocaleTimeString() };

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  componentDidMount() {
    /* this.intervalID =  */ setInterval(() => this.tick(), 1000);
  }

  /*   componentWillUnmount() {
    clearInterval(this.intervalID);
  } */

  render() {
    const str = () => {
      const today = new Date();
      const y = today.getFullYear();
      let m = today.getMonth() + 1;
      m <= 9 ? (m = "0" + m) : (m = "" + m);
      const d = today.getDate();
      const data = d + ":" + m + ":" + y;
      return data;
    };
    const data = str();

    const { time } = this.state;
    return (
      <div className="card btn-outline-dark p-0 px-2">
        <small style={{ textAlign: "center" }}>{time}</small>
        <small>{data}</small>
      </div>
    );
  }
}

export default TimeDisplay;
