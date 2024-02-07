import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

export default function HaikuCreateForm() {
  const { register, handleSubmit, reset } = useForm<{ content: string }>();
  const utils = api.useUtils();
  const haikuMutation = api.haiku.create.useMutation();

  const onSubmit = async (data: { content: string }) => {
    try {
      await haikuMutation.mutateAsync(
        { content: data.content },
        {
          onSuccess: () => {
            void utils.haiku.getLatest.invalidate();
          },
        },
      );
      reset();
    } catch (error) {
      console.log("An error occurred.")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-white"
        >
          Write your Haiku...
        </label>
        <div className="mt-1">
          <textarea
            id="content"
            autoComplete="content"
            required
            {...register("content", { required: true })}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          {"Post Haiku"}
        </button>
      </div>
    </form>
  );
}