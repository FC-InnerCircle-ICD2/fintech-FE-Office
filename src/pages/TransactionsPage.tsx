import Loader from '@components/template/Loader';
import { usePayments } from '@hooks/api/useTransaction';
import Transactions from '@components/template/Transactions';
import Error from '@components/template/Error';
import { useAuthStore } from '@store/authStore';
import { useState, useEffect } from 'react';
import type { Payment } from '@type/transaction';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

const initialSearchState = {
  paymentKey: '',
  startDate: '',
  endDate: '',
  status: '',
};

const TransactionsPage = () => {
  const { auth } = useAuthStore();
  const accessToken = auth!.accessToken;

  const [page, setPage] = useState(0);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filters, setFilters] = useState(initialSearchState);
  const [searchInput, setSearchInput] = useState(initialSearchState);

  const { data, isLoading, isError } = usePayments(accessToken, page, filters);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setFilters(searchInput);
  };

  useEffect(() => {
    if (Array.isArray(data?.data?.payments)) {
      if (page === 0) {
        // 첫 페이지일 경우 데이터 초기화
        setPayments(data.data.payments);
      } else {
        // 그 외의 경우 데이터 추가
        setPayments((prevPayments) => [...prevPayments, ...data.data.payments]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <Loader />;
  else if (isError) return <Error />;
  else {
    return (
      <>
        <form onSubmit={handleSearch} className='mb-4'>
          <ul className='flex gap-2'>
            <li>
              <Input
                placeholder='거래번호'
                value={searchInput.paymentKey}
                onChange={(e) =>
                  setSearchInput((prev) => ({
                    ...prev,
                    paymentKey: e.target.value,
                  }))
                }
              />
            </li>

            <li>
              <Input
                type='date'
                placeholder='거래일자'
                value={searchInput.startDate}
                onChange={(e) =>
                  setSearchInput((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                    endDate: e.target.value,
                  }))
                }
              />
            </li>

            <li>
              <Button type='submit' className='bg-primary text-white'>
                검색
              </Button>
            </li>
          </ul>
        </form>

        {payments.length > 0 ? (
          <>
            <Transactions data={payments} />
            {Array.isArray(data?.data?.payments) &&
              data.data.payments.length > 0 && (
                <Button onClick={handleLoadMore} className='mt-4'>
                  더보기
                </Button>
              )}
          </>
        ) : (
          <div className='flex justify-center items-center h-[200px] text-gray-500'>
            데이터가 없습니다
          </div>
        )}
      </>
    );
  }
};

export default TransactionsPage;
