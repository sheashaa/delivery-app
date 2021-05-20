export enum ALERT_MESSAGE_STYLE {
  PRIMARY = 'alert-primary',
  SECONDARY = 'alert-secondary',
  SUCCESS = 'alert-success',
  DANGER = 'alert-danger',
  WARNING = 'alert-warning',
  INFO = 'alert-info',
  LIGHT = 'alert-light',
  DARK = 'alert-dark'
}

export interface Alert {
  message: string;
  style: ALERT_MESSAGE_STYLE;
}
