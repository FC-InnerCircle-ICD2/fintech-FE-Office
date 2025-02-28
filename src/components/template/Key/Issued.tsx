import { Button } from '@components/ui/button';
import Info from './Info';
import Separator from './Separator';
import { createToastSuccess } from '@lib/toast';
import { useKeys } from '@hooks/api/useKeys';
import { useAuthStore } from '@store/authStore';
import { useState } from 'react';

const Issued = ({ issuedApiKey }: { issuedApiKey: string }) => {
  const [apiKey, setApiKey] = useState<string>(issuedApiKey);
  const { mutate: renewKey } = useKeys();
  const { auth } = useAuthStore();

  const handleCopy = () => {
    const apiKey = document.getElementById('api-key')!.textContent!;
    navigator.clipboard.writeText(apiKey).then(() => {
      createToastSuccess('', 'API 키를 복사하였습니다.');
    });
  };

  const handleRenew = () => {
    renewKey(auth!.accessToken, {
      onSuccess: ({ data }) => {
        setApiKey(data.apiKey);
        createToastSuccess('', 'API 키가 성공적으로 갱신되었습니다.');
      },
    });
  };

  return (
    <div className='bg-white rounded-3xl shadow-lg p-24 flex flex-col items-center'>
      <h1
        className='text-2xl font-bold text-primary text-center mb-4'
        id='api-key'
      >
        {apiKey}
      </h1>

      <p
        className='mb-4 text-xs text-primary cursor-pointer hover:underline'
        onClick={handleCopy}
      >
        복사하기
      </p>

      <Separator />

      <Info />

      <Separator />

      <Button size={'rounded'} onClick={handleRenew}>
        갱신하기
      </Button>
    </div>
  );
};

export default Issued;
