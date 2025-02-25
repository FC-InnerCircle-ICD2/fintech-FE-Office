import Loader from '@components/template/Loader';
import { usePayments } from '@hooks/api/useTransaction';
import Transactions from '@components/template/Transactions';
import Error from '@components/template/Error';
import { useAuthStore } from '@store/authStore';

const TransactionsPage = () => {
  const { auth } = useAuthStore();
  const accessToken = auth!.accessToken;

  const { data, isLoading, isError } = usePayments(accessToken);

  if (isLoading) return <Loader />;
  else if (isError) return <Error />;
  else {
    return <Transactions data={data?.data?.payments ?? []} />;
  }
};

export default TransactionsPage;
