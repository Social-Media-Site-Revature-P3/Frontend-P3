export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://localhost:8080", //Im pretty sure youre talking about this, yeah, but if youre running it, can i connect from my pc? this is running locally, not online. yes.
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  },
};
