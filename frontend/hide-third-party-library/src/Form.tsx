import {
  DetailedHTMLProps,
  FormEventHandler,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

export type selectOption = {
  readonly value: string;
  readonly displayValue: string;
};

export type selectProps = {
  readonly attributes: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  readonly options: selectOption[];
};

export type inputProp = {
  readonly type: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly attributes: InputHTMLAttributes<HTMLInputElement>;
};

export type FormProps = {
  readonly handleSubmit?: FormEventHandler<HTMLFormElement>;
  readonly inputs: inputProp[];
  readonly select: selectProps;
};

export function Form(props: FormProps) {
  const { handleSubmit, inputs, select } = props;
  return (
    <form onSubmit={handleSubmit}>
      {inputs.slice(0, 4).map((input) => (
        <input
          key={input.placeholder}
          type={input.type}
          placeholder={input.placeholder}
          {...input.attributes}
        ></input>
      ))}

      <select {...select.attributes}>
        {select.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>

      {inputs.slice(4).map((input) => (
        <input
          key={input.value}
          type={input.type}
          {...input.attributes}
        ></input>
      ))}

      <input type="submit" />
    </form>
  );
}
