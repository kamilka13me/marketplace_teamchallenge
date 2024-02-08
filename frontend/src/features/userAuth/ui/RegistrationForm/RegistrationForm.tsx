import { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/shared/ui/Input';

interface Props {}

interface InputsValues {
  inputName: string;
  inputSurname: string;
  inputEmail: string;
  inputPhone: string;
  inputPass: string;
}

const RegistrationForm: FC<Props> = () => {
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
    setFocus('inputName');
  }, [setFocus]);

  const onSubmit: SubmitHandler<InputsValues> = () => {
    reset();
  };

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  return (
    <div>
      <h3>Sign up</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Name"
          type="text"
          {...register('inputName', {
            required: 'This field is required',
            minLength: { value: 3, message: 'Your name must be min 3 symbols' },
            maxLength: { value: 15, message: 'Your name must be max 15 symbols' },
          })}
          error={errors?.inputName && errors?.inputName.message}
        />
        <Input
          placeholder="Surname"
          type="text"
          {...register('inputSurname', {
            required: 'This field is required',
            minLength: { value: 3, message: 'Your surname must be min 3 symbols' },
            maxLength: { value: 20, message: 'Your surname must be max 20 symbols' },
          })}
          error={errors?.inputSurname && errors?.inputSurname.message}
        />
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
          placeholder="Phone"
          type="text"
          {...register('inputPhone', {
            pattern: {
              value: /^\+?3?8?\s?0\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
              message: 'Your phone must be Ukrainian',
            },
          })}
          error={errors?.inputPhone?.message}
        />
        <Input
          placeholder="Password"
          type={passShown ? 'text' : 'password'}
          {...register('inputPass', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Your login must be min 6 symbols' },
          })}
          error={errors?.inputPass && errors?.inputPass.message}
        />
        <Input
          name="showPass"
          onChange={onTogglePassVisibility}
          type="checkbox"
          label="Show password"
        />
        <Input
          name="btnInput"
          type="submit"
          value="Sign up"
          disabled={!isValid}
          className="bg-red-500 px-3 py-1 border-none rounded-md font-bold text-white hover:bg-sky-700 disabled:opacity-30"
        />
        <p>Already have an account? Log in</p>
      </form>
    </div>
  );
};

// Log in will be anchor

export default RegistrationForm;
