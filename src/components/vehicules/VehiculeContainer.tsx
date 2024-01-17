import { Stack, Typography } from "@mui/material"
import VehiculeCard from "./VehiculeCard"

function VehiculeContainer() {
    return <><Stack spacing={2}>
    <VehiculeCard marque="FORD" modele="Fiesta" immatriculation="CW-740-KW" puissance={5}/>
    <VehiculeCard marque="HONDA" modele="CBR 650 F" immatriculation="?" puissance={4}/>
  </Stack></>
}

export default VehiculeContainer