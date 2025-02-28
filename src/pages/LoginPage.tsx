import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useLogin } from '@hooks/api/useAuth';
import { ZodError } from 'zod';
import { formatZodErrors } from '@lib/zod';
import type { ZodFormErrors } from '@type/zod';
import { loginSchema } from '@schema/auth';
import AuthLayout from '@components/template/auth/AuthLayout';

const LoginPage = () => {
  const { mutate: login } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ZodFormErrors>({});

  const handleLogin = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});

      const credentials = { email, password };
      login(credentials);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = formatZodErrors(error);
        setErrors(formattedErrors);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <AuthLayout linkText='아직 계정이 없으신가요?' linkTo='/signup'>
      <div>
        <label className='text-sm mb-1.5 block'>이메일</label>
        <Input
          className='h-12 rounded-xl'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
        )}
      </div>
      <div>
        <label className='text-sm mb-1.5 block'>비밀번호</label>
        <Input
          type='password'
          className='h-12 rounded-xl'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
        )}
      </div>
      <Button onClick={handleLogin} className='w-full h-12'>
        로그인
      </Button>
    </AuthLayout>
  );
};

export default LoginPage;
