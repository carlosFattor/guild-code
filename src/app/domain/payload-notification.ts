export interface PayloadNotification {
  action: [
    {
      action: string,
      title: string
    }
  ];
  body: string;
  data: {
    dateOfArrival: number,
    primaryKey: number,
    url: string
  };
  icon: string;
  requirementInteraction: boolean;
  title: string;
  vibrate: number[];
}
