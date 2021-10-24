import PropTypes from 'prop-types';
import image from '../../images/not-found.jpg';
import s from './NotFound.module.css';

function NotFound({ value }) {
  return (
    <div>
      <img src={image} alt="Not found" className={s.image} />
      <p className={s.text}>Not found "{value}" :(</p>
    </div>
  );
}

NotFound.protoType = {
  value: PropTypes.string,
};

export default NotFound;
