import Loader from '@components/template/Loader';
import { usePayments } from '@hooks/api/useTransaction';
import Transactions from '@components/template/Transactions';
import Error from '@components/template/Error';
import { useAuthStore } from '@store/authStore';
import { useState, useEffect } from 'react';
import type { Payment } from '@type/transaction';
import { Button } from '@components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@components/ui/select';
import { Input } from '@components/ui/input';

const TransactionsPage = () => {
  const { auth } = useAuthStore();
  const accessToken = auth!.accessToken;

  const [page, setPage] = useState(0);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filters, setFilters] = useState({
    paymentKey: '',
    startDate: '',
    status: '',
  });

  const { data, isLoading, isError, refetch } = usePayments(
    accessToken,
    page,
    filters,
  );

  const [searchInput, setSearchInput] = useState({
    paymentKey: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    refetch();
  };

  const handleSearch = () => {
    setPayments([]); // 검색 시 기존 결과 초기화
    setPage(0); // 페이지 초기화
    setFilters(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSearchInput((prev) => ({
      ...prev,
      startDate: selectedDate,
      endDate: selectedDate,
    }));
  };

  useEffect(() => {
    if (Array.isArray(data?.data?.payments)) {
      setPayments((prevPayments) => [...prevPayments, ...data.data.payments]);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  else if (isError) return <Error />;
  else {
    return (
      <>
        <ul className='mb-4 flex gap-2'>
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
              onKeyPress={handleKeyPress}
            />
          </li>

          <li>
            <Input
              type='date'
              placeholder='거래일자'
              value={searchInput.startDate}
              onChange={handleDateChange}
              onKeyPress={handleKeyPress}
            />
          </li>

          {/* <li>
            <Select
              onValueChange={(value) =>
                setSearchInput((prev) => ({
                  ...prev,
                  status: value,
                }))
              }
            >
              <SelectTrigger className='w-[180px] rounded-xl'>
                <SelectValue placeholder='거래상태' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='APPROVED'>APPROVED</SelectItem>
                  <SelectItem value='CANCELED'>CANCELED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li> */}

          <li>
            <Button onClick={handleSearch} className='bg-primary text-white'>
              검색
            </Button>
          </li>
        </ul>

        <Transactions data={payments} />
        {Array.isArray(data?.data?.payments) &&
          data.data.payments.length > 0 && (
            <Button onClick={handleLoadMore} className='mt-4'>
              더보기
            </Button>
          )}
      </>
    );
  }
};

export default TransactionsPage;
