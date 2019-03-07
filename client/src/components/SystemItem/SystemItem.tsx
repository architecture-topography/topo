/* Copyright (c) 2019 Thoughtworks Inc. All rights reserved. */

import React from 'react';
import { Card } from 'semantic-ui-react';
import styles from './styles.module.css';
import Technologies, { ITechnology } from './Technologies';

const SystemItem = (props: { name: string; technologies?: ITechnology[] }) => {
  return (
    <Card>
      <Card.Header className={styles.title}>{props.name}</Card.Header>
      <Technologies technologies={props.technologies} />
    </Card>
  );
};

export default SystemItem;
