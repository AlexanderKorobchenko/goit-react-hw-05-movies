import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ onClick, children }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      {children}
    </button>
  );
}

Button.protoType = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default Button;
