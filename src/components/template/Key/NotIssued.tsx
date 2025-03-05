import { Button } from '@components/ui/button';
import Info from './Info';
import { useAuthStore } from '@store/authStore';
import { useKeys } from '@hooks/api/useKeys';
import { createToastSuccess } from '@lib/toast';

const NotIssued = ({
  onIssueSuccess,
}: {
  onIssueSuccess: (value: string) => void;
}) => {
  const { auth } = useAuthStore();
  const { mutate: renewKey } = useKeys();

  const handleIssue = () => {
    if (!auth) return;
    renewKey(auth.accessToken, {
      onSuccess: ({ data }) => {
        createToastSuccess('', 'API 키가 성공적으로 발급되었습니다.');
        onIssueSuccess(data.apiKey);
      },
    });
  };

  return (
    <div className='bg-white rounded-3xl shadow-lg p-24 flex flex-col items-center'>
      <h1 className='text-2xl font-bold text-primary text-center mb-10'>
        키 발급하기
      </h1>

      <Info />

      <Button size={'rounded'} onClick={handleIssue}>
        발급하기
      </Button>
    </div>
  );
};

export default NotIssued;
