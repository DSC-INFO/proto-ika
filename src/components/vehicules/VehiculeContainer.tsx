import { Stack } from "@mui/material"
import VehiculeCard from "./VehiculeCard"
import { useEffect, useState } from "react"
import { useAuth } from "react-oidc-context"

function VehiculeContainer() {
  const [vehicleArray, setVehicleArray] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const abortController = new AbortController()
    fetch('https://t8sbjgvg7g.execute-api.eu-west-3.amazonaws.com/test-handler', {
      headers: {
        "Authorization": `Bearer ${user!.access_token}`
      },
      signal: abortController.signal
    })
    .catch((errorReason:any) => {
      console.error("Failed to get vehicles", errorReason)
    })
    return () => {
      abortController.abort()
    }
  }, [setVehicleArray])

    return <><Stack spacing={2}>
      {vehicleArray.map(vehicule => {
        return <></>
      })}
    <VehiculeCard marque="FORD" modele="Fiesta" immatriculation="CW-740-KW" puissance={5}/>
    <VehiculeCard marque="HONDA" modele="CBR 650 F" immatriculation="?" puissance={4}/>
  </Stack></>
}

export default VehiculeContainer