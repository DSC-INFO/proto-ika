import { Card, CardContent, Typography } from "@mui/material"

interface VehiculeCardProps {
    marque: string
    modele: string
    immatriculation: string
    puissance: number
}

function VehiculeCard(props: VehiculeCardProps) {
    return <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.marque} {props.modele}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {props.immatriculation}
      </Typography>
      <Typography variant="body2">
        Puissance: {props.puissance}CV
      </Typography>
    </CardContent>
  </Card>
}

export default VehiculeCard