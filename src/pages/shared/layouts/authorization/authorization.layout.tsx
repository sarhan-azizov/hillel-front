import styles from './authorization-layout.module.scss';

const AuthorizationLayout = (props: any) => {
  return (
    <div className={styles.authorizationLayout}>
        {props.children}
    </div>
  );
};

export { AuthorizationLayout };
