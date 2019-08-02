
<template>
  <div>
    <app-header></app-header>
    <div class="wrapper" >
      <!-- Side Bar starts here -->
      <app-side-bar></app-side-bar>
      <!-- Side Bar end here -->

      <div class="main-panel">
        <!-- Navbar -->
        <app-nav-bar></app-nav-bar>
        <!-- End Navbar -->

        <!-- Main Contents ges here -->
        <slot></slot>

        <!-- --- footer here  -->
        <app-footer></app-footer>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default {
  components: {
    "app-header": Header,
    "app-side-bar": SideBar,
    "app-nav-bar": NavBar,
    "app-footer": Footer
  },
  
};
</script>

