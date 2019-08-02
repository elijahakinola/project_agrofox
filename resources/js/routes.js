import Dashboard from './components/admin/Dashboard.vue';
import Login from './components/admin/Login.vue';
import UsersAdd from './components/admin/UsersAdd.vue';
import UsersList from './components/admin/UsersList.vue';
import AdminList from './components/admin/AdminList.vue';
import PortfolioList from './components/admin/PortfolioList.vue';
import UsersListEdit from './components/admin/UsersListEdit.vue';
import UserPorfolio from './components/admin/UserPorfolio.vue';
import UserPortfolioEdit from './components/admin/UserPortfolioEdit'
import ProjectAccount from './components/admin/ProjectAccount.vue';
import TransactionHistoryByPortfolio from './components/admin/TransactionHistoryByPortfolio.vue';
import {store} from './store/store'
import TransactionHistory from './components/admin/TransactionHistory.vue';

var token = localStorage.getItem("token");
//store.state.token;
//  localStorage.getItem("token")

export const routes = [
    { path: '/', name: 'Home', component: Login,  beforeEnter: (to, from, next) => {
       
       //returns back if the token is true and the user is trying to see the login page after login
       if(token){ next('/admin/dashboard') ; }
       next();
    }},
    { path: '/admin/dashboard', name: 'AdminDashboard', component: Dashboard, beforeEnter: (to, from, next) => {
       if(!token){ next('/'); }
       next();
    }},
    { path: '/users/add', name: 'UsersAdd', component: UsersAdd , beforeEnter: (to, from, next) => {
       if(!token){ next('/'); }
       next();
    } },
    { path: '/users/list', name: 'UsersList', component: UsersList },
    { path: '/admin/list', name: 'AdminList', component: AdminList },
    { path: '/portfolio/list', name: 'PortfolioList', component: PortfolioList },
    { path: '/transaction_history/portfolio/:user_portfolio_id/:user_id/:username', name: 'TransactionHistoryByPortfolio', component: TransactionHistoryByPortfolio },
    { path: '/transaction_history', component: TransactionHistory, name: 'TransactionHistory'},
    { path: '/user/portfolio/:id/:name', name: 'UserPorfolio', component: UserPorfolio },
    { path: '/user_portfolio_edit/:id/:user_id', name: 'UserPortfolioEdit', component: UserPortfolioEdit },
    { path: '/users/list/edit/:id', name: 'UsersListEdit', component: UsersListEdit },
    { path: '/project_account', name: 'ProjectAccount', component: ProjectAccount },
    { path: '*', redirect: '/404'},


]