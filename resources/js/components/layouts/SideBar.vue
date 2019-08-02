<template>
    <div class="sidebar" data-color="white" data-active-color="danger">
        
      <div class="logo">
        <router-link :to="{ name: 'AdminDashboard'}" tag='a'><img src="/assets/theme2/images/logo-light.png"></router-link>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
            <router-link :to="{ name: 'AdminDashboard'}" tag='li' class="active">
                <a><i class="nc-icon nc-bank"></i><p>Dashboard</p></a>
            </router-link>

            <router-link :to="{ name: 'UsersAdd'}"  tag='li'>
                    <a><i class="nc-icon nc-simple-add"></i><p>Create User</p></a>
                </router-link>
            <router-link :to="{ name: 'UsersList'}"  tag='li'>
                <a><i class="nc-icon nc-single-02"></i><p>View Users</p></a>
            </router-link>

            
            <router-link :to="{ name: 'PortfolioList'}" tag='li'>
                <a><i class="nc-icon nc-tile-56"></i><p>Portfolios</p></a>
            </router-link>

            <router-link :to="{ name: 'TransactionHistory'}" tag='li'>
                <a><i class="nc-icon nc-money-coins"></i><p>Transactions</p></a>
            </router-link>

            <router-link :to="{ name: 'ProjectAccount'}" tag='li'>
                <a><i class="nc-icon nc-bank"></i><p>Project Account</p></a>
            </router-link>

            <router-link :to="{ name: 'AdminList'}"  tag='li'>
                <a><i class="nc-icon nc-settings"></i><p>View Admin</p></a>
            </router-link>

            <li @click="customLogout()">
              <a><i class="nc-icon nc-send"></i><p>Logout</p></a>
              
            </li>

          
        </ul>

        
      </div>
    </div>
</template>

<script>
import { pick } from '../../repositories/pick';
export default {
    mixins: [pick]
    
}
</script>

