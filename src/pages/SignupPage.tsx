import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { ZodError } from 'zod';
import { formatZodErrors } from '@lib/zod';
import type { ZodFormErrors } from '@type/zod';
import { signupSchema } from '@schema/auth';
import { useSignup } from '@hooks/api/useAuth';
import AuthLayout from '@components/template/auth/AuthLayout';

const SignupPage = () => {
  const { mutate: signup } = useSignup();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const [errors, setErrors] = useState<ZodFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signupSchema.parse(formData);
      setErrors({});

      const credentials = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };
      signup(credentials);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = formatZodErrors(error);
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <AuthLayout linkText='이미 계정이 있으신가요?' linkTo='/login'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='text-sm mb-2 block'>이메일</label>
          <Input
            name='email'
            className='h-12 rounded-xl'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        <div>
          <label className='text-sm mb-2 block'>비밀번호</label>
          <Input
            type='password'
            name='password'
            className='h-12 rounded-xl'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
          )}
        </div>

        <div>
          <label className='text-sm mb-2 block'>비밀번호 확인</label>
          <Input
            type='password'
            name='passwordConfirm'
            className='h-12 rounded-xl'
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          {errors.passwordConfirm && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.passwordConfirm}
            </p>
          )}
        </div>

        <div>
          <label className='text-sm mb-2 block'>이름</label>
          <Input
            name='name'
            className='h-12 rounded-xl'
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
          )}
        </div>

        <Button type='submit' className='w-full h-12'>
          회원가입
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
