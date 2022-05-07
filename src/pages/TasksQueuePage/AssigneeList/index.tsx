import React, { ReactElement } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { AlignItemsTypes } from 'models/layout';
import { AssigneeListContainer, Selectable } from './styles';

interface IAssigneeList {
  users: ISelectOptionsModel[];
  next: () => void;
  refresh: () => void;
  hasMore: boolean;
}

const AssigneeList = ({
  users,
  next,
  refresh,
  hasMore,
}: IAssigneeList): ReactElement | null => {
  if (!users.length) {
    return null;
  }
  return (
    <AssigneeListContainer componentHeight="200px" mtop="10px" padding="30px 0">
      <InfiniteScroll
        className="assignee-scroll"
        dataLength={users.length}
        next={next}
        hasMore={hasMore}
        loader={null}
        endMessage={null}
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={null}
        releaseToRefreshContent={null}
      >
        {users.map(
          (user: ISelectOptionsModel): ReactElement => (
            <Selectable
              ai={AlignItemsTypes.center}
              componentHeight="50px"
              padding="5px 15px"
              key={user.value}
            >
              {user.label}
            </Selectable>
          ),
        )}
      </InfiniteScroll>
    </AssigneeListContainer>
  );
};

export { AssigneeList };
