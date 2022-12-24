import { Component } from 'react';
import css from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button
        className={css.button}
        type="button"
        onClick={() => this.props.onClick()}
      >
        Load more
      </button>
    );
  }
}

export default Button;
