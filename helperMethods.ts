export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const openODNRWebsite = () => {
  Linking.openURL('https://oh-web.s3licensing.com/Harvest/Index');
};

export const degreesToCompass = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getWindDirection = (degrees: number): string => {
  const compassDirection = degreesToCompass(degrees);
  const fromDirection = degreesToCompass((degrees + 180) % 360);
  return `${fromDirection} -> ${compassDirection}`;
};
