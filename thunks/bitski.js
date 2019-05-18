import { authorize as appAuthorize } from 'react-native-app-auth';
import { setBitskiCredentials as _setBitskiCredentials } from '../actions';
import { saveState } from '../lib/stores/bitski';
import { showErrorModal } from '../navigation';

export function setBitskiCredentials(credentials) {
  return async dispatch => {
    dispatch(_setBitskiCredentials(credentials));
    try {
      return await saveState(credentials);
    } catch (error) {
      showErrorModal(error);
    }
  };
}

export function authorizeBitski() {
  return async (dispatch, getState) => {
    const {
      settings: {
        bitski: { auth }
      }
    } = getState();

    console.warn(auth);
    const result = await appAuthorize(auth);
    return dispatch(setBitskiCredentials(result));
  };
}