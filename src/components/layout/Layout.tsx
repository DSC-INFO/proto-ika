import { AppBar, BottomNavigation, BottomNavigationAction, Container, CssBaseline, Paper, Toolbar, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Garage, Newspaper } from "@mui/icons-material";
import VehiculeContainer from "../vehicules/VehiculeContainer";

function Layout(props: PropsWithChildren) {
  const [value, setValue] = useState("Fiches")

    return (
        <>
          <CssBaseline />
          <Container maxWidth="lg">
          
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {(value === 'Fiches') ? 'Fiches Indemnités Kilométriques' :'' }
            {(value === 'Vehicules') ? 'Vehicules enregistrés' :'' }
            {(value === 'Adresses') ? 'Adresses enregistrées' :'' }
          </Typography>
        </Toolbar>
      </AppBar>
    
            <main>
            {(value === 'Vehicules') ? <VehiculeContainer/> : undefined }
            </main>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
  showLabels
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
>
  <BottomNavigationAction label="Fiches" icon={<Newspaper />} value="Fiches"/>
  <BottomNavigationAction label="Vehicules" icon={<Garage />} value="Vehicules" />
  <BottomNavigationAction label="Adresses" icon={<LocationOnIcon />} value="Adresses"/>
</BottomNavigation>
</Paper>
          </Container>
        </>
      );
}

export default Layout;