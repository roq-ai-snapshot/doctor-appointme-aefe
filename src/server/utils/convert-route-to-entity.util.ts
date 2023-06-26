const mapping: Record<string, string> = {
  academies: 'academy',
  appointments: 'appointment',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
