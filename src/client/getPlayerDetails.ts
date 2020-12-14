import { makeHttpRequest } from './client';
import { PlayerHistory } from './typings';

interface Response {
  history: PlayerHistory[];
}

const getPlayerDetails = (playerId: string): Promise<Response> =>
  makeHttpRequest(
    `https://fantasy.premierleague.com/api/element-summary/${playerId}/`,
  );

export default getPlayerDetails;
export type { Response };
