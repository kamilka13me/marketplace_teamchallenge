import React, { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { actionReducer } from '@/features/userAuth';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Link } from '@/shared/ui/Link';
import { VStack } from '@/shared/ui/Stack';

interface Props {}

interface InputsValues {
  inputEmail: string;
  inputPassword: string;
}

const LoginForm: FC<Props> = () => {
  const [passShown, setPassShown] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setFocus,
  } = useForm<InputsValues>({
    mode: 'onBlur',
  });

  useEffect(() => {
    setFocus('inputEmail');
  }, [setFocus]);

  const onSubmit: SubmitHandler<InputsValues> = (data) => {
    dispatch(actionReducer.setEmail(data.inputEmail));
    dispatch(actionReducer.setPassword(data.inputPassword));
    reset();
  };

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        variant="basic"
        placeholder="Email"
        type="text"
        {...register('inputEmail', {
          required: 'This field is required',
          minLength: { value: 5, message: 'Your login must be min 6 symbols' },
          pattern: {
            value:
              /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            message: 'Your login must be xxxx@xxx.xx templates',
          },
        })}
        error={errors?.inputEmail && errors?.inputEmail.message}
        className="mt-6"
      />
      <div className="relative mt-10">
        <Input
          variant="basic"
          placeholder="Password"
          type={passShown ? 'text' : 'password'}
          {...register('inputPassword', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Your login must be min 6 symbols' },
          })}
          error={errors?.inputPassword && errors?.inputPassword.message}
        />
        <Icon
          clickable
          onClick={onTogglePassVisibility}
          Svg={passShown ? privateEye : unPrivateEye}
          width={24}
          height={24}
          className="absolute top-[12px] right-[12px]"
        />
      </div>
      <Link to="/">
        <p className="outfit text-right text-gray-900 text-[14px] font-normal leading-[18px] mt-5 mb-6">
          Forgot Password?
        </p>
      </Link>
      <Input
        variant="clear"
        value="Log In"
        name="btnInput"
        type="submit"
        disabled={!isValid}
        className="outfit bg-primary min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-black duration-300 hover:bg-secondary active:bg-primary disabled:text-white-300 disabled:bg-white-400"
      />
      <VStack align="center" className="mt-6" justify="between">
        <span className="outfit text-right text-gray-900 text-[14px] font-normal leading-[18px]">
          Don`t have an account?
        </span>
        <Link to="/">
          <span className="outfit text-right text-black text-[14px] font-semibold decoration-solid decoration-black underline decoration-1">
            Sign up
          </span>
        </Link>
      </VStack>
    </form>
  );
};

export default LoginForm;
