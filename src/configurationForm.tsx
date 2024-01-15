import React from 'react';
import { TextField, Button } from '@mui/material';

const ConfigurationForm = ({ onSubmit }: {onSubmit: any}) => {
  const [authority, setAuthority] = React.useState('');
  const [clientId, setClientId] = React.useState('');
  const [metadataUrl, setMetadataUrl] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ authority, clientId, metadataUrl });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Authority (URL)"
        value={authority}
        onChange={(e) => setAuthority(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Metadata URL (URL)"
        value={metadataUrl}
        onChange={(e) => setMetadataUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default ConfigurationForm;