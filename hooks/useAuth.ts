import axios from "axios";

function useAuth() {
  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response);
    } catch (e) {
        console.log(e);
    }
  };
  const signup = async () => {};

  return {
    signin,
    signup,
  };
}

export default useAuth;
