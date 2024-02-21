import { useEffect, useState } from "react";
import logo from "~/assets/logo.png";
import { LoginRequest } from "~/data/Request/AuthRequest";
import { useNavigate } from "react-router-dom";
import { IconLoader } from "@tabler/icons-react";
export function Login() {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  function handleSuccessLogin(data: UserInfo) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/", { replace: true });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();
    if (!username || username === "") {
      setUsernameError(true);
      setLoading(false);
      return;
    }
    if (!password || password === "") {
      setPasswordError(true);
      setLoading(false);
      return;
    }
    setUsernameError(false);
    setPasswordError(false);
    const loginRequest: LoginRequest = {
      username,
      password,
    };
    const response = await LoginRequest(loginRequest);
    setLoading(false);
    if (response.statusCode === 401) {
      alert("Invalid username or password");
      return;
    }
    if (response.statusCode === 404) {
      alert("User not found");
      return;
    }
    if (response.statusCode === 400) {
      alert("Invalid username or password");
      return;
    }
    if (response.data) {
      handleSuccessLogin(response.data);
    }
  }
  return (
    <>
      <div className="m-auto flex h-screen max-w-sm flex-col justify-center">
        <div>
          <img src={logo} alt="logo" className="mx-auto max-w-60" />
          <h1 className="mt-10 text-center text-2xl font-bold ">
            Login with your Staff account
          </h1>
        </div>
        <div>
          <form
            className="m-auto mt-10 flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="my-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500"
            />
            {usernameError ? (
              <p className="text-sm text-red-500">Username is required</p>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="my-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500"
            />
            {passwordError ? (
              <p className="text-sm text-red-500">Password is required</p>
            ) : null}
            <div className="flex justify-end">
              <button
                type="submit"
                className="m-2 flex w-40 items-center justify-center rounded bg-blue-500 p-3 text-white"
              >
                {loading ? (
                  <>
                    <IconLoader className="mr-2 h-5 w-5 animate-spin" />
                    <span>Logging in</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
