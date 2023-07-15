import { Todo, TodoUpdatable } from "@demo/api/lib/demo/model";
import { Button } from "@demo/ui/components/Button";
import { Checkbox } from "@demo/ui/components/Checkbox";
import { InputField } from "@demo/ui/components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

export type EditViewProps = {
  todo: Todo;
  updateTodo: (args: TodoUpdatable) => void;
  isLoading?: boolean;
};

export const EditView: React.FC<EditViewProps> = ({ todo, updateTodo, isLoading }) => {
  const resolver = yupResolver(
    Yup.object().shape({
      description: Yup.string().required("詳細を入力してください"),
      end_date: Yup.string().typeError("完了日を入力してください").required("完了日を入力してください"),
      completed: Yup.boolean().required(),
    })
  );
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TodoUpdatable>({
    defaultValues: {
      description: todo.description,
      end_date: todo.end_date,
      completed: todo.completed,
    },
    resolver,
  });

  const onSubmit: SubmitHandler<TodoUpdatable> = (values) => {
    updateTodo(values);
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
      <Checkbox {...register("completed")} label="完了" disabled={isSubmitting || isLoading} />
      <Button variant="primary" type="submit" disabled={isSubmitting || isLoading} isLoading={isLoading}>
        登録
      </Button>
    </form>
  );
};
