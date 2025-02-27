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
              <TableHead key={header} className='text-center'>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((payment: FlattenedPayment) => (
            <TableRow key={payment.paymentKey}>
              <TableCell className='text-center'>
                {payment.paymentKey}
              </TableCell>
              <TableCell>{convertDateFormat(payment.completedAt)}</TableCell>
              <TableCell className='truncate w-48'>
                {payment.orderName}
              </TableCell>
              <TableCell>{payment.cardNumber}</TableCell>
              <TableCell className='text-right'>
                {convertCurrencyFormat(payment.amount)}
              </TableCell>
              <TableCell>{payment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Transactions;
