<template>
    <div class="container mx-auto font-raleway py-32">
        <img src="@/assets/images/placeholder/main-event.png" alt="" class=" lg:mb-10 mb-6 block w-full">
        <div class="">
            <div class="">
                <h3 class="font-bold capitalize text-devanga-alternative text-2xl">
                    here goes the title of the read
                </h3>
                <div class="py-4">
                    <ul class="flex flex-wrap items-center gap-x-8">
                        <li>
                            <a href="blog-details.html"
                                class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary"><i
                                    class="pi pi-calendar"></i> 24 May 2024</a>
                        </li>

                        <li>
                            <a href="blog-details.html"
                                class="text-devanga-primary text-sm hover:text-devanga-primary dark:text-devanga-primary-dark dark:hover:text-devanga-primary">
                                <span class="pi pi-user"></span>
                                Publisher's Name</a>
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

                <div class="lg:my-6 my-4">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration in some form,
                    by injected humour, or randomised words which don't look even slightly believable. If you are going
                    to use a passage of
                    Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All
                    the Lorem Ipsum
                    generators on the Internet tend to repeat predefined chunks as necessary, making this the first true
                    generator on the
                    Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence
                    structures, to
                    generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from
                    repetition,
                    injected humour.
                </div>
                <div class="reply">
                    <Editor v-model="value" editorStyle="height: 320px" />
                    <div class="w-full py-2">
                        <button class="py-2 px-12 text-white bg-devanga-secondary block">Reply</button>
                    </div>
                </div>
                

                <div class="replies py-8">
                    <div class=" mt-14">
            <h3 class=" mb-6">
              3 Comments
            </h3>
            <ul class="comments space-y-4">
              <li class="block border-b border-[#ECECEC] pb-6 mt-6 last:border-0 last:pb-0">
                <div class="flex">
                  <div class="flex-none">
                    <div class="h-[72px] w-[72px] rounded-full mr-6">
                      <img src="@/assets/images/placeholder/blog-details__1.png" alt="" class="w-full block h-full object-contain rounded-full">
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex flex-wrap justify-between mb-2">
                      <div>
                        <span class="text-xl  font-semibold text-black block mb-1">Ferira Watson
                        </span>
                        <span class=" block">Oct 09, 2021</span>
                      </div>
                      <a href="#" class=" inline-flex px-3 py-1 rounded text-devanga-secondary bg-[#E3F9F6] hover:text-white hover:bg-devanga-primary h-[35px]
                            items-center space-x-2 leading-[1]">
                        <span class=" text-xl leading-[1] top-[3px] relative">
                            <iconify-icon icon="charm:forward" rotate="180deg"></iconify-icon>
                        </span>
                        <span class=" leading-[1]">Reply</span>
                      </a>
                    </div>
                    <p>
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
                    </p>
                  </div>
                </div>
                <ul class="comments mt-6 space-y-4 ml-14 border-t border-[#ECECEC]">
                  <li class="block border-b border-[#ECECEC] pb-6 mt-6 last:border-0 last:pb-0">
                    <div class="flex">
                      <div class="flex-none">
                        <div class="h-[72px] w-[72px] rounded-full mr-6">
                          <img src="@/assets/images/placeholder/blog-details__1.png" alt="" class="w-full block h-full object-contain rounded-full">
                        </div>
                      </div>
                      <div class="flex-1">
                        <div class="flex flex-wrap justify-between mb-2">
                          <div>
                            <span class="text-xl  font-semibold text-black block mb-1">Ferira Watson
                                </span>
                            <span class=" block">Oct 09, 2021</span>
                          </div>
                          <a href="#" class=" inline-flex px-3 py-1 rounded text-devanga-secondary bg-[#E3F9F6] hover:text-white hover:bg-devanga-primary h-[35px]
                                    items-center space-x-2 leading-[1]">
                            <span class=" text-xl leading-[1] top-[3px] relative">
                                    <iconify-icon icon="charm:forward" rotate="180deg"></iconify-icon>
                                </span>
                            <span class=" leading-[1]">Reply</span>
                          </a>
                        </div>
                        <p>
                          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li class="block">
                <div class="flex">
                  <div class="flex-none">
                    <div class="h-[72px] w-[72px] rounded-full mr-6">
                      <img src="@/assets/images/placeholder/blog-details__1.png" alt="" class="w-full block h-full object-contain rounded-full">
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex flex-wrap justify-between mb-2">
                      <div>
                        <span class="text-xl  font-semibold text-black block mb-1">Ferira Watson
                        </span>
                        <span class=" block">Oct 09, 2021</span>
                      </div>
                      <a href="#" class=" inline-flex px-3 py-1 rounded text-devanga-secondary bg-[#E3F9F6] hover:text-white hover:bg-devanga-primary h-[35px]
                            items-center space-x-2 leading-[1]">
                        <span class=" text-xl leading-[1] top-[3px] relative">
                            <iconify-icon icon="charm:forward" rotate="180deg"></iconify-icon>
                        </span>
                        <span class=" leading-[1]">Reply</span>
                      </a>
                    </div>
                    <p>
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
                </div>
                
                <div class="flex justify-between border-y border-[#ECECEC] py-4 md:mt-12 mt-10">
                    <div class=" text-black font-semibold">Previous</div>
                    <ul class="flex space-x-3 lg:justify-end items-center  ">
                        <li>
                            <a href="#" class="flex h-8 w-8">
                                <span><i class="pi pi-facebook"></i></span>

                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex h-8 w-8">
                                <span><i class="pi pi-twitter"></i></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Editor from 'primevue/editor';
import Breadcrum from '@/components/Breadcrum.vue';
</script>