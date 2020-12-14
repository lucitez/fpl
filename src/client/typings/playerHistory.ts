interface PlayerHistory {
  assists: number;
  bonus: number;
  bps: number;
  clean_sheets: number;
  creativity: number;
  element: number;
  fixture: number;
  goals_conceded: number;
  goals_scored: number;
  ict_index: number;
  influence: number;
  kickoff_time: string; // timestamp
  minutes: number;
  opponent_team: number;
  own_goals: number;
  penalties_missed: number;
  penalties_saved: number;
  red_cards: number;
  round: number;
  saves: number;
  selected: number;
  team_a_score: number;
  team_h_score: number;
  threat: number;
  total_points: number;
  transfers_balance: number;
  transfers_in: number;
  transfers_out: number;
  value: number;
  was_home: boolean;
  yellow_cards: number;
}

export default PlayerHistory;
