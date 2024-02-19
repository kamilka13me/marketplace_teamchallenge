import { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { actionReducer } from '@/features/userAuth';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Input } from '@/shared/ui/Input';
import { Link } from '@/shared/ui/Link';
import { Text } from '@/shared/ui/Text';

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
    <div>
      <Text Tag="h3" text="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
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
        />
        <Input
          placeholder="Password"
          type={passShown ? 'text' : 'password'}
          {...register('inputPassword', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Your login must be min 6 symbols' },
          })}
          error={errors?.inputPassword && errors?.inputPassword.message}
        />
        <Input
          name="showPass"
          onChange={onTogglePassVisibility}
          type="checkbox"
          label="Show password"
        />
        <Input
          value="Log In"
          name="btnInput"
          type="submit"
          disabled={!isValid}
          className="bg-red-500 px-3 py-1 border-none rounded-md font-bold text-white hover:bg-sky-700 disabled:opacity-30"
        />
        <p>
          Forgot
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link href="#"> Password?</Link>
        </p>
        <p>
          Don`t have an account?
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link href="#"> Sign up</Link>
        </p>
      </form>
    </div>
  );
};

// Password will be anchor
// Sign up will be anchor

export default LoginForm;
