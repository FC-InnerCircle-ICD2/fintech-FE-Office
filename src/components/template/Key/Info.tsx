import { Link } from 'react-router-dom';

const ApiKeyInfo = () => {
  return (
    <div className='mb-8'>
      <p className='text-center text-light-40 text-sm mb-4'>
        한 계정당 키는 한개만 발급가능합니다
      </p>
      <p className='text-center text-light-40 text-sm mb-4'>
        갱신하면 새로운 키가 발급되어 기존의 키는 사용할 수 없습니다
      </p>
      <Link
        to={'https://www.npmjs.com/package/@pay200/sdk'}
        target='_blank'
        className='block text-center text-primary hover:underline'
      >
        API 사용방법
      </Link>
    </div>
  );
};

export default ApiKeyInfo;
