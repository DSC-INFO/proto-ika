import { Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import styles from './Layout.module.css';

function Layout(props: PropsWithChildren) {
    return (
        <>
          <CssBaseline />
          <Container maxWidth="lg">
            <Toolbar className={styles.toolbar}>
              <Typography 
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                className={styles.toolbar__title}
              >
                DSC-INFO Ika
              </Typography>
            </Toolbar>
            <main>
         {/* Include your app components here */}
            </main>
          </Container>
        </>
      );
}

export default Layout;