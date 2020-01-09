import React, { Component } from 'react';

class LazyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loaded: false
    };
    this.init();
  }

  get correctSrc() {
    return this.state.error || !this.state.loaded
      ? this.props.unloadedSrc
      : this.props.src;
  }

  handleOpenImage = e => {
    const { onClick } = this.props;
    onClick(e);
  };

  init() {
    const img = new Image();
    img.onload = () => {
      this.setState({
        loaded: true
      });
    };
    img.onerror = () => {
      this.setState({
        error: true
      });
    };
    img.src = this.props.src;
  }

  render() {
    console.log('xDDDD', this.correctSrc);
    return (
      <img
        className={this.props.className}
        src={this.correctSrc}
        style={this.props.style}
        alt={this.props.alt}
        onClick={this.handleOpenImage}
      ></img>
    );
  }
}

LazyImage.defaultProps = {
  unloadedSrc: 'https://placehold.it/350x150'
};

export default LazyImage;
