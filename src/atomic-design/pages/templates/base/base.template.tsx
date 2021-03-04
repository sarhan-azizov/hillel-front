import React from "react";

import styles from './base-template.module.scss';
import { Container } from "@material-ui/core";


const BaseTemplate = (props: any) => {
  return (
      <Container component="main" maxWidth="sm" classes={ { root: styles.main } }>
        {props.children}
      </Container>
  );
};

export { BaseTemplate };
