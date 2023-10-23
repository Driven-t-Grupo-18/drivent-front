import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: paymentProcess
  } = useAsync((data) => paymentApi.process(data, token), true);

  return {
    payment,
    paymentLoading,
    paymentError,
    paymentProcess
  };
}