import { makeHttpRequest } from './client';
import { Player, Team, Position } from './typings';

interface Response {
  teams: Team[];
  elements: Player[];
  elementTypes: Position[];
}

const fetchDump = (): Promise<Response> =>
  makeHttpRequest('https://fantasy.premierleague.com/api/bootstrap-static/');

export default fetchDump;
export type { Response };
