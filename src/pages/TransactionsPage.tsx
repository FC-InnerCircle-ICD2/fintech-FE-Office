import Loader from '@components/template/Loader';
import { usePayments } from '@hooks/api/useTransaction';
import Transactions from '@components/template/Transactions';
import Error from '@components/template/Error';
import { useAuthStore } from '@store/authStore';
import { useState, useEffect } from 'react';
import type { Payment } from '@type/transaction';
import { Button } from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Input } from '@components/ui/input';

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
            <Input placeholder='거래번호' />
          </li>

          <li>
            <Input type='date' placeholder='거래일자' />
          </li>

          <li>
            <Select>
              <SelectTrigger className='w-[180px] rounded-xl'>
                <SelectValue placeholder='거래상태' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>거래상태</SelectLabel> */}
                  <SelectItem value='apple'>APPROVED</SelectItem>
                  <SelectItem value='banana'>CANCELLED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
