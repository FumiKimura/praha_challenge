import { useForm } from 'react-hook-form';
import { Form, selectProps, inputProp } from './Form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  const inputs: inputProp[] = [
    {
      type: 'text',
      placeholder: 'First name',
      attributes: {
        ...register('First name', { required: true, maxLength: 80 }),
      },
    },
    {
      type: 'text',
      placeholder: 'Last name',
      attributes: {
        ...register('Last name', { required: true, maxLength: 100 }),
      },
    },
    {
      type: 'text',
      placeholder: 'Email',
      attributes: {
        ...register('Email', { required: true, pattern: /^\S+@\S+$/i }),
      },
    },
    {
      type: 'tel',
      placeholder: 'Mobile number',
      attributes: {
        ...register('Mobile number', {
          required: true,
          minLength: 6,
          maxLength: 12,
        }),
      },
    },
    {
      type: 'radio',
      value: 'Yes',
      attributes: {
        ...register('Developer', { required: true }),
      },
    },
    {
      type: 'radio',
      value: 'No',
      attributes: {
        ...register('Developer', { required: true }),
      },
    },
  ];

  const select: selectProps = {
    attributes: { ...register('Title', { required: true }) },
    options: [
      {
        value: 'Mr',
        displayValue: 'Mr',
      },
      {
        value: 'Mrs',
        displayValue: 'Mrs',
      },
      {
        value: 'Miss',
        displayValue: 'Miss',
      },
      {
        value: 'Dr',
        displayValue: 'Dr',
      },
    ],
  };

  return (
    <div>
      <Form
        inputs={inputs}
        handleSubmit={handleSubmit(onSubmit)}
        select={select}
      />
    </div>
  );
}

export default App;
