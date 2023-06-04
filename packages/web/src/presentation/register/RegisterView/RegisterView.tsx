import { TodoRegisterble } from "@demo/api/lib/demo/model";
import { Button } from "@demo/ui/components/Button";
import { InputField } from "@demo/ui/components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

export type RegisterViewProps = {
  regisiterTodo: (args: TodoRegisterble) => void;
  isLoading?: boolean;
};

export const RegisterView: React.FC<RegisterViewProps> = ({ regisiterTodo, isLoading }) => {
  const resolver = yupResolver(
    Yup.object().shape({
      description: Yup.string().required("詳細を入力してください"),
      end_date: Yup.date().typeError("完了日を入力してください").required("完了日を入力してください"),
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
      />
      <InputField
        {...register("end_date")}
        label="完了日"
        type="date"
        disabled={isSubmitting || isLoading}
        error={errors.end_date?.message}
      />
      <Button variant="primary" type="submit" disabled={isSubmitting || isLoading} isLoading={isLoading}>
        登録
      </Button>
    </form>
  );
};
