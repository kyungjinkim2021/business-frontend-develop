import Template from '@Template';
import { useDispatch, useSelector } from 'react-redux';
import { joinSlice } from '@Reducers/joinSlice';
import { RootState } from '@Store/store';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import { GENERAL_TERM_AGREEMENT, TermType } from '@Definitions/constants/term';

import Term from '../common/term';

const pageStep = 1;

function General() {
  const dispatch = useDispatch();
  const [isValidTerm, setIsValidTerm] = useState<boolean>(false);
  const [termList, setTermList] = useState<Array<TermType>>([]);

  const { joinStep } = useSelector((state: RootState) => state.joinStore);

  useEffect(() => {
    if (GENERAL_TERM_AGREEMENT) {
      setTermList(_.cloneDeep(GENERAL_TERM_AGREEMENT));
    }
  }, [GENERAL_TERM_AGREEMENT]);

  useEffect(() => {
    if (termList) {
      termList.forEach((value) => {
        value.onClickHandler = termClickHandler;
      });
    }
  }, [termList]);

  useEffect(() => {
    if (joinStep < pageStep) {
      Router.replace('/member/join').then(() => {});
    }
  }, [joinStep]);

  const termClickHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updateData = _.clone(termList);
    _.forEach(updateData, (item, itemIndex) => {
      if (itemIndex === index) {
        item.isChecked = event.target.checked;
      }
    });
    setTermList(updateData);
  };

  const onConfirmHandler = async () => {
    if (isValidTerm) {
      await dispatch(joinSlice.actions.updateJoinStep(2));
      Router.replace('/member/join/general/auth').then(() => {
        dispatch(joinSlice.actions.resetUserInfo());
      });
    }
  };

  console.log('isValidTerm >>', isValidTerm, termList);

  return (
    <Template title="탄소 상쇄 플랫폼">
      <Term
        termList={termList}
        onConfirmHandler={onConfirmHandler}
        isValidTerm={isValidTerm}
        setIsValidTerm={setIsValidTerm}
      />
    </Template>
  );
}

export default General;
