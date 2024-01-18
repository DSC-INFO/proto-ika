import React from 'react';
import { TextField, Button } from '@mui/material';
import AppConfig from './model';

interface AppConfigFormProps {
  appConfig?: AppConfig,
  onAppConfigChange: (newModel: AppConfig) => void
}

const AppConfigForm = ({ appConfig, onAppConfigChange }: AppConfigFormProps) => {
  const [authority, setAuthority] = React.useState(appConfig? appConfig.authority: '');
  const [clientId, setClientId] = React.useState(appConfig? appConfig.clientId: '');
  const [metadataUrl, setMetadataUrl] = React.useState(appConfig? appConfig.metadataUrl: '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAppConfigChange({ authority, clientId, metadataUrl });
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

export default AppConfigForm;