import React from "react";
import { Card } from "semantic-ui-react";
import styles from "./styles.module.css";

const SystemItem = (props: { name: string }) => {
  return (
    <Card>
      <Card.Header className={styles.title}>{props.name}</Card.Header>
    </Card>
  );
};

export default SystemItem;
