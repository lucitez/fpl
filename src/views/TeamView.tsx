import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDump } from '../app/slices/dumpSlice';
import { RootState } from '../app/store';

const TeamView: FC = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) =>
    Object.values(state.teamsSlice.byId),
  );

  useEffect(() => {
    dispatch(getDump());
  }, [dispatch]);

  return (
    <div>
      {teams.map((team) => (
        <div key={team.id}>
          {team.name} - {team.win}
        </div>
      ))}
    </div>
  );
};

export default TeamView;
