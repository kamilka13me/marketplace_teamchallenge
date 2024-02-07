import { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/shared/ui/Input';

interface Props {}

interface InputsValues {
  inputEmail: string;
  inputPassword: string;
}

const LoginForm: FC<Props> = () => {
  const [passShown, setPassShown] = useState(false);

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

  const onSubmit: SubmitHandler<InputsValues> = () => {
    reset();
  };

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  return (
    <div>
      <h3>Login</h3>
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
        <p>Forgot Password?</p>
        <p>Don`t have an account? Sign up</p>
      </form>
    </div>
  );
};

// Password will be anchor
// Sign up will be anchor

export default LoginForm;
