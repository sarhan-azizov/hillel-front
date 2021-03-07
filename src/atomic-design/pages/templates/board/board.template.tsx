import React from "react";

import styles from './board.module.scss';
import { Container } from "@material-ui/core";


const BoardTemplate = (props: any) => {
  return (
      <Container component="main" maxWidth="sm" classes={ { root: styles.main } }>
          {props.children}
      </Container>
  );
};

export { BoardTemplate };
