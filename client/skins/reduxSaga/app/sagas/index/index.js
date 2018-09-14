import { put, call, take, fork, takeEvery, all, takeLatest } from 'redux-saga/effects';
import fetchApi from '../../libs/fetch';
import * as indexActions from '../../reducers/index/index';

// worker --------------------------------

// getUserList worker
export function* getUserList(index) {
  yield put(indexActions.requestUserList(index));
  const { userlist } = yield call(fetchApi, {
    query: ` 
    { 
      userlist {
        id
        name
        age
        hobby
      }
    }
    `,
  });
  yield put(indexActions.receiveUserList(userlist));
}


// watcher
export default function* () {
  // while (true) {
  //   const { payload: { index } } = yield take(indexActions.GET_USER_LIST);
  //   yield call(getUserList, index);
  // }
  yield takeEvery(indexActions.GET_USER_LIST, getUserList);
}
