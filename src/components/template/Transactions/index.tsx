import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import type { FlattenedPayment, Payment } from '@type/transaction';
import { transactionHeaders } from '@constants/transaction';
import { convertCurrencyFormat, convertDateFormat } from '@lib/fommater';
import { useMemo } from 'react';
import StatusBadge from './StatusBadge';

const Transactions = ({ data }: { data: Payment[] }) => {
  const result = useMemo(
    () =>
      data.flatMap((payment) =>
        payment.transactions.map((transaction) => ({
          paymentKey: transaction.paymentKey,
          completedAt: transaction.completedAt,
          orderName: payment.orderName,
          cardNumber: payment.cardNumber,
          amount: transaction.amount,
          status: transaction.status,
        })),
      ),
    [data],
  );

  return (
    <>
      <Table className='w-auto mx-auto'>
        <TableHeader>
          <TableRow>
            {transactionHeaders.map((header) => (
              <TableHead
                key={header}
                className='text-center bg-[#f1f1f1] text-gray-700 p-2'
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((payment: FlattenedPayment, index: number) => (
            <TableRow key={index} className='hover:bg-[#f1f1f1]'>
              <TableCell className='text-center py-3 border-b border-gray-300'>
                {payment.paymentKey}
              </TableCell>
              <TableCell className='py-3 border-b border-gray-300'>
                {convertDateFormat(payment.completedAt)}
              </TableCell>
              <TableCell className='truncate w-48 py-3 border-b border-gray-300'>
                {payment.orderName}
              </TableCell>
              <TableCell className='py-3 border-b border-gray-300'>
                {payment.cardNumber}
              </TableCell>
              <TableCell className='text-right py-3 border-b border-gray-300'>
                {convertCurrencyFormat(payment.amount)}
              </TableCell>
              <TableCell className='py-3 border-b border-gray-300'>
                <StatusBadge status={payment.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Transactions;
