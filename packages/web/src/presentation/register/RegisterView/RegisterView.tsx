import { TodoRegisterble } from "@demo/api/lib/demo/model";
import { Button } from "@demo/ui/components/Button";
import { InputField } from "@demo/ui/components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

export type RegisterViewProps = React.PropsWithChildren<{
  regisiterTodo: (args: TodoRegisterble) => void;
  isLoading?: boolean;
}>;

export const RegisterView = ({ regisiterTodo, isLoading }: RegisterViewProps) => {
  const resolver = yupResolver(
    Yup.object().shape({
      description: Yup.string().required("詳細を入力してください"),
      end_date: Yup.string().typeError("完了日を入力してください").required("完了日を入力してください"),
    })
  );
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TodoRegisterble>({
    defaultValues: {
      description: "",
      end_date: "",
    },
    resolver,
  });

  const onSubmit: SubmitHandler<TodoRegisterble> = (values) => {
    regisiterTodo(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        {...register("description")}
        label="詳細"
        disabled={isSubmitting || isLoading}
        error={errors.description?.message}
        data-testid="description"
      />
      <InputField
        {...register("end_date")}
        label="完了日"
        type="date"
        disabled={isSubmitting || isLoading}
        error={errors.end_date?.message}
        data-testid="end-date"
      />
      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting || isLoading}
        isLoading={isLoading}
        data-testid="register-button"
      >
        登録
      </Button>
    </form>
  );
};
