import { useForm } from 'react-hook-form';
import Form from './Form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <div>
      <Form
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default App;
