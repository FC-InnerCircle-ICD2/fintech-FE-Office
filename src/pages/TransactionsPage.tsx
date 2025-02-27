import Loader from '@components/template/Loader';
import { usePayments } from '@hooks/api/useTransaction';
import Transactions from '@components/template/Transactions';
import Error from '@components/template/Error';
import { useAuthStore } from '@store/authStore';
import { useState, useEffect } from 'react';
import type { Payment } from '@type/transaction';

const TransactionsPage = () => {
  const { auth } = useAuthStore();
  const accessToken = auth!.accessToken;

  const [page, setPage] = useState(0);
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data, isLoading, isError, refetch } = usePayments(accessToken, page);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    refetch();
  };

  useEffect(() => {
    if (data && data.data && Array.isArray(data.data.payments)) {
      setPayments((prevPayments) => [...prevPayments, ...data.data.payments]);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  else if (isError) return <Error />;
  else {
    return (
      <>
        <Transactions data={payments} />
        {Array.isArray(data?.data?.payments) &&
          data.data.payments.length > 0 && (
            <button onClick={handleLoadMore} className='mt-4'>
              더보기
            </button>
          )}
      </>
    );
  }
};

export default TransactionsPage;
