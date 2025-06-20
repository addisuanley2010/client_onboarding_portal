import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./component/LoadingSpinner";
import AdminRouteWrapper from "./route/AdminRouteWrapper";
import PublicRouteWrapper from "./route/PublicRouteWrapper";
import Permission from "./component/Permission";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: "post/fetchPostRequest" });
    dispatch({ type: "user/check-auth" });
  }, [dispatch]);

  const { isAuthenticated,  loading ,user} = useSelector(
    (state) => state.userData
  );
  console.log(user,'addis')


  if (loading) return <LoadingSpinner />;
  return (
    <Routes>
      {(!isAuthenticated )? (
        <>
          <Route path="/*" element={<PublicRouteWrapper />} />
        </>
      ) : (
          <>{
            user?.role === "admin" ? (
              <Route path="/*" element={<AdminRouteWrapper />} />
            ) : (
              <Route path="/*" element={<Permission />} />
            )
        }
        </>
      ) }
    </Routes>
  );
};

export default App;
