<!-- AdminLayout.vue -->
<!-- <template>
    <div>
      <header>Admin Header</header>
      <main>
        
      </main>
      <footer>Admin Footer</footer>
    </div>
  </template> -->

<template>
  <div class="">
    <div class="grid grid-cols-4 h-screen">
      <!-- Side menu -->
      <div class="col-span-1 bg-gray-200 p-4">
        <!-- Side menu content -->
        <ul class="py-24 mx-4">
          <li><a href="#" class="block py-2">Menu Item 1</a></li>
          <li><a href="#" class="block py-2">Menu Item 2</a></li>
          <li><a href="#" class="block py-2">Menu Item 3</a></li>
          <!-- Add more menu items as needed -->
        </ul>
      </div>

      <!-- Main content -->
      <div class="col-span-3 bg-gray-100 p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>