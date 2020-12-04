import { useTypedSelector } from 'app/store';
import { orderBy } from 'lodash';
import React, { FC } from 'react';
import { Card, CardContent, Text } from 'react-md';

import styles from './PlayerCard.module.scss';

interface Props {
  title: string;
  field: string;
}

const PlayerCard: FC<Props> = ({ title, field }) => {
  const [player] = useTypedSelector((state) =>
    orderBy(Object.values(state.playersSlice.byId), field, 'desc'),
  );
  return (
    <Card className={styles.card}>
      <CardContent className={styles.image}>
        <img
          src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player?.code}.png`}
          alt='player'
        />
      </CardContent>
      <div className={styles.textContainer}>
        <Text type='headline-6' margin='none' className={styles.text}>
          {title}
        </Text>
        <Text
          type='headline-3'
          weight='bold'
          color='theme-primary'
          margin='none'
          className={styles.text}
        >
          {player[field]}
        </Text>
      </div>
    </Card>
  );
};
export default PlayerCard;
