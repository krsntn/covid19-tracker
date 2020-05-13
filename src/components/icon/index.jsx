import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

import {
  faHeartbeat,
  faAmbulance,
  faSmile,
  faSkullCrossbones,
  faDizzy,
  faWalking,
  faNotesMedical,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';

library.add(
  faHeartbeat,
  faAmbulance,
  faSmile,
  faSkullCrossbones,
  faDizzy,
  faWalking,
  faNotesMedical
);

const Icon = ({ name, classes }) => (
  <div className={`icon ${classes}`} title={name}>
    <FontAwesomeIcon icon={['fas', name]} />
  </div>
);

export default Icon;
