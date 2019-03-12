/*
 * Copyright 2019 Thoughtworks Inc. All rights reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styles from './styles.module.css';

export interface ITechnology {
  id: string;
  name: string;
}

const displayTechnologies = (technologies: ITechnology[]) => {
  if (technologies.length === 0) {
    return 'None';
  } else {
    return (
      <ul className={styles.list}>
        {technologies.map(technology => (
          <li key={technology.id}>{technology.name}</li>
        ))}
      </ul>
    );
  }
};

const Technologies = (props: { technologies: ITechnology[] }) => {
  return (
    <div className={styles.greyBox}>
      <h3 className={styles.bigBoldBeautiful}>Primary technologies</h3>
      {displayTechnologies(props.technologies)}
    </div>
  );
};

Technologies.defaultProps = {
  technologies: [],
};

export default Technologies;
