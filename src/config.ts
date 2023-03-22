let baseUrl = 'http://localhost:5000/api/v1';
let mediaUrl = 'http://localhost:5000';
const appName = 'reactapp';
let env = 'dev';

// Update the baseUrl and mediaUrl on every environment
switch (window.location.host) {
  case 'https://vapeverification-admin-dev.falconweb.app':
    baseUrl = 'https://vapeverification-api-dev.falconweb.app/api/v1';
    mediaUrl = 'https://vapeverification-api-dev.falconweb.app';
    break;

  case 'https://vapeverification-admin-qa.falconweb.app':
    baseUrl = 'https://vapeverification-api-qa.falconweb.app/api/v1';
    mediaUrl = 'https://vapeverification-api-qa.falconweb.app';
    env = 'qa';
    break;

  case 'https://vapeverification-admin-staging.falconweb.app/':
    baseUrl = 'https://vapeverification-api-staging.falconweb.app/api/v1';
    mediaUrl = 'https://vapeverification-api-staging.falconweb.app';
    env = 'staging';
    break;

  case 'reactapp-prod.falconweb.app/':
    baseUrl = 'https://reactapp-api-prod.falconweb.app/api/v1';
    mediaUrl = 'https://reactapp-api-prod.falconweb.app';
    env = 'prod';
    break;
}

export { baseUrl, mediaUrl, appName, env };
