import React from "react";

import styles from './base-template.module.scss';
import { Box, Container, Typography } from "@material-ui/core";


const BoardTemplate = (props: any) => {
  return (
    <div className={styles.wrapper}>
      <Container component="main" maxWidth="sm" classes={ { root: styles.main } }>
        {props.children}
      </Container>
      <Container component="footer" maxWidth="md">
          <Box mt={2}>
              <Typography variant="body2" color="textSecondary" align="center">
                  Copyright © 2021.
              </Typography>
          </Box>
      </Container>
    </div>
  );
};

export { BoardTemplate };
