import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 glass-card p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Log in to your account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Log In
        </Button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary-600 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}
