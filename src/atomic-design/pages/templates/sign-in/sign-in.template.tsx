import React from "react";

import styles from './sign-in.template.module.scss';

const SignInTemplate = (props: any) => {
  return (
    <div className={styles.signInLayout}>
        {props.children}
    </div>
  );
};

export { SignInTemplate };
