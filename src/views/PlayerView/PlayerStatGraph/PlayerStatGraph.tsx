import React, { FC, useState } from 'react';
import { Card, ListboxOption } from 'react-md';
import { ResponsiveLine, Serie } from '@nivo/line';
import { useTypedSelector } from 'app/store';
import TeamTooltip from 'components/TeamTooltip';

import classes from './PlayerStatGraph.module.scss';
import { capitalize, uniq } from 'lodash';
import SelectRepeater from 'components/SelectRepeater';

interface Props {
  playerId: string;
}

const placeholder = {
  value: 'placeholder',
  name: 'Add field...',
};

const statOptions: { [key: string]: ListboxOption } = {
  total_points: {
    value: 'total_points',
    name: 'Total Points',
  },
  goals_scored: {
    value: 'goals_scored',
    name: 'Goals Scored',
  },
  assists: {
    value: 'assists',
    name: 'Assists',
  },
  ict_index: {
    value: 'ict_index',
    name: 'ICT index',
  },
  influence: {
    value: 'influence',
    name: 'Influence',
  },
  creativity: {
    value: 'creativity',
    name: 'Creativity',
  },
  threat: {
    value: 'threat',
    name: 'Threat',
  },
  bps: {
    value: 'bps',
    name: 'Bonus Points System',
  },
};

const PlayerStatGraph: FC<Props> = ({ playerId }) => {
  const player = useTypedSelector((state) => state.playersSlice.byId[playerId]);
  const [selectedStats, setSelectedStats] = useState<string[]>([
    'total_points',
  ]);

  const handleSelection = (newSelections: string[]) => {
    setSelectedStats([...newSelections]);
  };

  const serie: Serie[] = uniq(selectedStats)
    .filter((stat) => stat !== 'placeholder')
    .map((stat) => {
      const dataFromStat = (stat: string) => {
        return player?.history.map((gameWeek) => ({
          x: gameWeek.round,
          y: gameWeek[stat],
          teamId: gameWeek.opponent_team,
        }));
      };

      return {
        id: capitalize(stat.replace('_', ' ')),
        data: dataFromStat(stat),
      };
    });

  return (
    <Card className={classes.graphCard}>
      <div className={classes.graphContainer}>
        <ResponsiveLine
          data={serie}
          enableGridY
          pointSize={10}
          lineWidth={3}
          enableGridX={false}
          enableCrosshair={false}
          useMesh
          tooltip={({ point }) => (
            <TeamTooltip teamId={point.data['teamId']} value={point.data.y} />
          )}
          margin={{ top: 50, right: 250, bottom: 75, left: 50 }}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Gameweek',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          theme={{
            fontSize: 16,
            axis: {
              domain: { line: { strokeWidth: 3, stroke: 'gray' } },
              legend: { text: { fontSize: 16, fontWeight: 'bolder' } },
            },
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 150,
              translateY: -50,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 120,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            },
          ]}
        />
      </div>
      <div className={classes.filterContainer}>
        <SelectRepeater
          placeholder={placeholder}
          options={statOptions}
          selections={selectedStats}
          onChange={handleSelection}
        />
      </div>
    </Card>
  );
};

export default PlayerStatGraph;
