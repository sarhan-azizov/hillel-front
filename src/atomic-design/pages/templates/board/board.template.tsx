import React from "react";
import { Grid, Typography } from '@material-ui/core';

import styles from './board.module.scss';
import { Container } from "@material-ui/core";
import { ResizableNavbar } from "../../../atoms/navbar";


const BoardTemplate = (props: any) => {
  return (
      <Grid container className={styles.root}>
          <Grid item>
              <ResizableNavbar />
          </Grid>
          <Grid item className={styles.wrapperMain}>
              <Typography component="h1" variant="h5">
                  {props.title}
              </Typography>
              <Container component="main" maxWidth="sm" classes={ { root: styles.main } }>
                  {props.children}
              </Container>
          </Grid>
      </Grid>
  );
};

export { BoardTemplate };
