import Error from '@components/template/Error';
import Issued from '@components/template/Key/Issued';
import NotIssued from '@components/template/Key/NotIssued';
import Loader from '@components/template/Loader';
import { useKeysId } from '@hooks/api/useKeys';
import { useAuthStore } from '@store/authStore';
import { useState, useEffect } from 'react';

const ApiKeysPage = () => {
  const { auth } = useAuthStore();
  const { data, isLoading, isError } = useKeysId(auth!.accessToken);
  const [issuedApiKey, setIssuedApiKey] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = data?.data.apiKey;
    if (accessToken) setIssuedApiKey(accessToken);
  }, [data]);

  if (isLoading) return <Loader />;
  else if (isError) return <Error />;
  return issuedApiKey ? (
    <Issued issuedApiKey={issuedApiKey} />
  ) : (
    <NotIssued
      onIssueSuccess={(newApiKey: string) => {
        setIssuedApiKey(newApiKey);
      }}
    />
  );
};

export default ApiKeysPage;
