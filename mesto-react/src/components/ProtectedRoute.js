import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route path={props.path}>
      {() => 
        props.isloggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
      {/* В ТЕОРИИ ВСЕ ОБЕРНУТО В СТРЕЛОЧНУЮ ФУНКЦИЮ. ЗАЧЕМ, ЕСЛИ И БЕЗ НЕ ВСЕ ПРЕКРАСНО РАБОТАЕТ? */}
        {/* {props.isloggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />}; */}
    </Route>
  );
}
