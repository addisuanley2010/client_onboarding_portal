import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(11, "Password must be less than 11 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch({ type: "user/login", formData: values, callback });
    setSubmitting(false);
  };

  const callback = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col  py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">

      <div className="sm:mx-auto sm:w-full sm:max-w-md md:mt-20 ">
        <h2 className="mt-6 text-center text-2xl font-bold text-orange-500">
          Sign In to an account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  >
                    {user.loading ? "Loading ..." : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="d-flex mt-5">
            <span className="text-center text-sm text-gray-500 ml-2">
              <a
                href="#"
                className="font-semibold leading-6 text-orange-400 hover:text-orange-400"
              >
                forget password
              </a>
            </span>
            <span className="text-center text-sm text-gray-500 ml-8">
              have no account ?
              <a
                onClick={() => navigate("/registration")}
                className="font-semibold leading-6 text-orange-400 hover:text-orange-400 cursor-pointer"
              >
                &nbsp; sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;