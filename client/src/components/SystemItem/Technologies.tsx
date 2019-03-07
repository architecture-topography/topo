/* Copyright (c) 2019 Thoughtworks Inc. All rights reserved. */

import React from "react";
import styles from "./styles.module.css";

export interface ITechnology {
  id: string;
  name: string;
}

const displayTechnologies = (technologies: ITechnology[]) => {
  if (technologies.length == 0) {
    return "None";
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
  technologies: []
};

export default Technologies;
