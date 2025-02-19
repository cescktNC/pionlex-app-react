import { fieldLabels } from './errorConstants';

export const translateBackendErrors = backendErrors => {
  const errors = {...backendErrors};

  Object.keys(backendErrors).forEach( key => {
    let message = Array.isArray(backendErrors[key]) ? backendErrors[key][0] : backendErrors[key];

    if ( key === 'officeLawName' ) {
      message = message.replace('office law name', fieldLabels[key]);
    } else if ( key === 'invitationCode' ) {
      message = message.replace('invitation code', fieldLabels[key]);
    } else {
      message = message.replace(key, fieldLabels[key]);
    }
    errors[key] = message;
  });

  return errors;
};