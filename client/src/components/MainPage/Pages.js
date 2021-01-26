import { Route, Switch } from 'react-router-dom';

// Pages
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
//End of pages
const Pages = () => {
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
    )
}

export default Pages;