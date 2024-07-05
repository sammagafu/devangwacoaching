<style>
/* Remove default focus styles */
.no-focus:focus {
    outline: none;
    box-shadow: none;
}
</style>

<template>
    <div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto px-3 font-raleway">
        <div class="container py-10 md:py-50px lg:py-60px 2xl:py-100px">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div class="lg:col-start-1 lg:col-span-8 space-y-[35px]">
                    <div class="py-4">
                        <form @submit.prevent="createPost">
                            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div class="px-4 py-2 bg-gray-100 rounded-t-lg dark:bg-gray-800">
                                    <label for="comment" class="sr-only">Your comment</label>
                                    <textarea id="comment" rows="4" v-model="content" class="w-full px-0 text-gray-900 bg-gray-100 border-gray no-focus" placeholder="Write a comment..." required></textarea>
                                </div>
                                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                    <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                        Post
                                    </button>
                                    <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                        <input type="file" id="fileInput" ref="fileInput" @change="handleFileUpload" class="hidden">
                                        <button type="button" @click="triggerFileInput" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                            </svg>
                                            <span class="sr-only">Upload image</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                    </div>

                    <!-- Display Posts -->
                    <div class="group" v-for="post in posts" :key="post.id">
                        <!-- blog thumbnail -->
                        <div class="overflow-hidden relative">
                            <img :src="post.post" alt="" class="w-full">
                            <div class="text-size-22 leading-6 font-semibold text-white px-15px py-5px md:px-6 md:py-2 bg-devanga-primary rounded text-center absolute top-5 right-5">
                                <h3>
                                    {{ new Date(post.created_at).getDate() }} <br>
                                    {{ new Date(post.created_at).toLocaleString('default', { month: 'short' }) }}
                                </h3>
                            </div>
                        </div>
                        <h3 class="text-black hover:text-devanga-primary p-4 break-words">
                                <router-link :to="{ name: 'community-details', params: { id: post.id } }" class="capitalize text-base">
                                    {{ post.content }}
                                </router-link>
                            </h3>
                        <!-- blog content -->
                        <div class="shadow-sm rounded-md px-4">
                            
                            <div class="py-4">
                                <ul class="flex flex-wrap items-center gap-x-8">
                                    <li>
                                        <a href="blog-details.html" class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary">
                                            <span class="pi pi-user"></span>
                                            {{ post.starter.full_name }}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html" class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary">
                                            <i class="pi pi-comments"></i> {{ post.likes_count }} Comments
                                        </a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html" class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary">
                                            <i class="pi pi-bookmark"></i> {{ post.bookmarksCount }} Bookmarks
                                        </a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html" class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary">
                                            <i class="pi pi-heart"></i> {{ post.likes_count }} Likes
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <p class="text-base mb-15px !leading-30px">
                                {{ post.excerpt }}
                            </p>
                            <!-- <div class="flex justify-between items-center">
                                <div class="py-2">
                                    <router-link :to="{ name: 'community-details', params: { id: post.id } }" class="text-devanga-secondary hover:text-devanga-primary">
                                        Read More <i class="pi pi-angle-double-right"></i>
                                    </router-link>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-start-9 lg:col-span-4">
                    <!-- <div class="flex flex-col">
                        <div class="p-5 md:p-30px lg:p-5 2xl:p-30px mb-30px border-devanga-primary dark:border-devanga-primary-dark aos-init aos-animate" data-aos="fade-up">
                            <h4 class="text-devanga-secondary dark:text-devanga-secondary font-bold before:w-0.5 relative before:h-[21px] before:absolute before:bottom-[5px] before:left-0 leading-30px mb-25px">
                                Search here
                            </h4>
                            <form class="bg-gray-300 px-4 w-full py-2 text-sm text-devanga-primary bg-lightGrey10 dark:bg-lightGrey10-dark dark:text-devanga-primary-dark flex justify-center items-center leading-26px">
                                <input type="text" placeholder="Search Produce" class="placeholder:text-placeholder bg-transparent focus:outline-none placeholder:opacity-80 w-full">
                                <button type="submit">
                                    <i class="icofont-search-1 text-base"></i>
                                </button>
                            </form>
                        </div>

                        <div class="p-5 md:p-30px lg:p-5 2xl:p-30px mb-30px border-devanga-primary dark:border-devanga-primary-dark aos-init aos-animate" data-aos="fade-up">
                            <h4 class="text-devanga-secondary dark:text-devanga-secondary font-bold before:w-0.5 relative before:h-[21px] before:absolute before:bottom-[5px] before:left-0 leading-30px">
                                Categories
                            </h4>
                            <ul class="flex flex-col gap-y-4">
                                <li class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Mobile Set</a> <a href="#">03</a>
                                </li>
                                <li class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Mobile Set</a> <a href="#">03</a>
                                </li>
                                <li class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Raxila Dish nonyte</a> <a href="#">09</a>
                                </li>
                                <li class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Fresh Vegetable</a> <a href="#">01</a>
                                </li>
                                <li class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Fruites</a> <a href="#">00</a>
                                </li>
                                <li class="text-devanga-primary hover:text-devanga-primary-dark hover:bg-devanga-secondary transition-all duration-300 text-sm font-medium px-4 py-2 border border-devanga-primary hover:border-devanga-secondary dark:border-devanga-primary-dark dark:hover:border-devanga-secondary flex justify-between leading-7">
                                    <a href="#">Gesuriesey</a> <a href="#">26</a>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiService from '@/service/apiService'; // Import your API service
import { ref, onMounted } from 'vue';

// State variables
const posts = ref([]); // Store posts data

// Fetch posts data
const getPosts = () => {
    apiService.get('community/threads/')
        .then(response => {
            posts.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
};

// Create new post
const postCover = ref(null); // Store new post cover image
const content = ref(''); // Store new post content

const createPost = () => {
    const formData = new FormData();
    formData.append('content', content.value);
    if (postCover.value) {
        formData.append('post', postCover.value);
    }
    apiService.post('community/threads/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            // Optionally, you could push the new post to `posts` to update the list without reloading
            posts.value.push(response.data);
            content.value = ''; // Clear the textarea
            postCover.value = null; // Clear the file input
        })
        .catch(error => {
            console.error('Error saving post:', error);
        });
};

// Handle file upload
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        postCover.value = file;
    }
};

const triggerFileInput = () => {
    document.getElementById('fileInput').click();
};

// Fetch posts when component is mounted
onMounted(() => {
    getPosts();
});
</script>
