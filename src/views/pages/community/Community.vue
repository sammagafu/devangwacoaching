<template>
    <div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto px-3 font-raleway">
        <div class="container py-10 md:py-50px lg:py-60px 2xl:py-100px">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-30px">
                <div class="lg:col-start-1 lg:col-span-8 space-y-[35px]">
                    <div class="group" v-for="index in 16" :key="index">
                        <!-- blog thumbnail -->
                        <div class="overflow-hidden relative">
                            <img src="@/assets/images/placeholder/blog_6.png" alt="" class="w-full">
                            <div
                                class="text-size-22 leading-6 font-semibold text-white px-15px py-5px md:px-6 md:py-2 bg-devanga-primary rounded text-center absolute top-5 right-5">
                                <h3>
                                    24 <br>
                                    Feb
                                </h3>
                            </div>
                        </div>
                        <!-- blog content -->
                        <div class="shadow-sm rounded-md px-4">
                            <div class="py-4">
                                <ul class="flex flex-wrap items-center gap-x-8">
                                    <li>
                                        <a href="blog-details.html"
                                            class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary">
                                            <span class="pi pi-user"></span>
                                            Username</a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html"
                                            class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary"><i
                                                class="pi pi-comments"></i> 10 Comments</a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html"
                                            class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary"><i
                                                class="pi pi-bookmark-fill"></i>10 Bookmark</a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html"
                                            class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary"><i
                                                class="pi pi-heart-fill"></i> 10 Likes</a>
                                    </li>
                                </ul>
                            </div>

                            <h3
                                class="text-2xl md:text-size-32 lg:text-size-28 2xl:text-size-34 leading-34px md:leading-10 2xl:leading-13.5 font-bold text-black hover:text-devanga-primary">
                                <!-- <a href="blog-details.html">Delivering What Consumers Really Value?</a> -->
                                <router-link :to="{ name: 'community-details', params: { id: index } }"
                                        class="capitalize">
                                        Article or discussion name 
                                    </router-link>
                            </h3>

                            <p class="text-base mb-15px !leading-30px">
                                These cases are perfectly simple and easy to distinguish. In
                                a free hour, when our power of On the other hand,
                                organizations have the need for integrating in IT
                                departments
                            </p>
                            <div class="flex justify-between items-center">
                                <div class="py-2">
                                    <router-link :to="{ name: 'community-details', params: { id: index } }"
                                        class="text-devanga-secondary hover:text-devanga-primary">
                                        Read More <i class="pi pi-angle-double-right"></i>
                                    </router-link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-start-9 lg:col-span-4">
                    <div class="flex flex-col">
                        <div class="p-5 md:p-30px lg:p-5 2xl:p-30px mb-30px border-devanga-primary dark:border-devanga-primary-dark aos-init aos-animate"
                            data-aos="fade-up">
                            <h4
                                class="text-devanga-secondary dark:text-devanga-secondary font-bold before:w-0.5 relative before:h-[21px] before:absolute before:bottom-[5px] before:left-0 leading-30px mb-25px">
                                Search here
                            </h4>
                            <form
                                class="bg-gray-300 px-4 w-full py-2 text-sm text-devanga-primary bg-lightGrey10 dark:bg-lightGrey10-dark dark:text-devanga-primary-dark flex justify-center items-center leading-26px">
                                <input type="text" placeholder="Search Produce"
                                    class="placeholder:text-placeholder bg-transparent focus:outline-none placeholder:opacity-80 w-full">
                                <button type="submit">
                                    <i class="icofont-search-1 text-base"></i>
                                </button>
                            </form>
                        </div>

                        <div class="p-5 md:p-30px lg:p-5 2xl:p-30px mb-30px border-devanga-primary dark:border-devanga-primary-dark aos-init aos-animate"
                            data-aos="fade-up">
                            <h4
                                class="text-devanga-secondary dark:text-devanga-secondary font-bold before:w-0.5 relative before:h-[21px] before:absolute before:bottom-[5px] before:left-0 leading-30px">
                                Categories
                            </h4>
                            <ul class="flex flex-col gap-y-4">
                                <li
                                    class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Mobile Set</a> <a href="#">03</a>
                                </li>
                                <li
                                    class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Mobile Set</a> <a href="#">03</a>
                                </li>
                                <li
                                    class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Raxila Dish nonyte</a> <a href="#">09</a>
                                </li>
                                <li
                                    class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Fresh Vegetable</a> <a href="#">01</a>
                                </li>
                                <li
                                    class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Fruites</a> <a href="#">00</a>
                                </li>
                                <li
                                    class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Gesuriesey</a> <a href="#">26</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>