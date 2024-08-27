import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from '../Login'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Route {...props} />
  }

  return <Redirect to="/login" component={Login} />
}

export default ProtectedRoute
