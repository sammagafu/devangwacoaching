<template>
    <StudentLayout>
      <b-col xl="9">
        <b-row class="mb-3">
          <b-col cols="12" class="d-sm-flex justify-content-between align-items-center">
            <h1 class="h3 mb-2 mb-sm-0">Community Threads: {{ categoryName }}</h1>
            <b-button variant="primary" @click="showCreateThreadModal = true">Create New Thread</b-button>
          </b-col>
        </b-row>
  
        <b-card no-body class="bg-transparent">
          <b-card-body class="px-0">
            <b-card v-for="thread in threads" :key="thread.id" class="mb-3">
              <b-card-header>
                <h5>{{ thread.content.substring(0, 50) }}...</h5>
                <p class="mb-0">Started by {{ thread.starter.username }} on {{ formatDate(thread.created_at) }}</p>
              </b-card-header>
              <b-card-body>
                <p>{{ thread.content }}</p>
                <p class="mb-0">
                  <strong>Views:</strong> {{ thread.views }} |
                  <strong>Likes:</strong> {{ thread.likes_count }} |
                  <strong>Replies:</strong> {{ thread.replies_count }}
                </p>
                <b-button
                  variant="outline-primary"
                  size="sm"
                  @click="likeThread(thread.slug)"
                  v-if="user && !isThreadLiked(thread)"
                >
                  Like
                </b-button>
                <b-button
                  variant="outline-danger"
                  size="sm"
                  @click="unlikeThread(thread.slug)"
                  v-if="user && isThreadLiked(thread)"
                >
                  Unlike
                </b-button>
                <b-button variant="primary" size="sm" class="ms-2" @click="showReplyForm[thread.id] = !showReplyForm[thread.id]">
                  Reply
                </b-button>
              </b-card-body>
              <b-card-body v-if="showReplyForm[thread.id]">
                <b-form @submit.prevent="createReply(thread.id)">
                  <b-form-textarea
                    v-model="newReply[thread.id]"
                    placeholder="Enter your reply"
                    rows="3"
                    required
                  ></b-form-textarea>
                  <b-button type="submit" variant="primary" class="mt-2">Submit Reply</b-button>
                </b-form>
              </b-card-body>
              <b-card-body>
                <h6>Replies</h6>
                <div v-for="reply in thread.replies" :key="reply.id" class="mb-2" :style="{ marginLeft: reply.parent ? '20px' : '0' }">
                  <p>{{ reply.content }}</p>
                  <p class="mb-0">
                    By {{ reply.author.username }} on {{ formatDate(reply.created_at) }} |
                    <strong>Likes:</strong> {{ reply.likes_count }}
                  </p>
                  <b-button
                    variant="outline-primary"
                    size="sm"
                    @click="likeReply(reply.id)"
                    v-if="user && !isReplyLiked(reply)"
                  >
                    Like
                  </b-button>
                  <b-button
                    variant="outline-danger"
                    size="sm"
                    @click="unlikeReply(reply.id)"
                    v-if="user && isReplyLiked(reply)"
                  >
                    Unlike
                  </b-button>
                  <b-button
                    variant="primary"
                    size="sm"
                    class="ms-2"
                    @click="showNestedReplyForm[reply.id] = !showNestedReplyForm[reply.id]"
                  >
                    Reply
                  </b-button>
                  <b-form v-if="showNestedReplyForm[reply.id]" @submit.prevent="createNestedReply(thread.id, reply.id)" class="mt-2">
                    <b-form-textarea
                      v-model="newNestedReply[reply.id]"
                      placeholder="Enter your reply"
                      rows="3"
                      required
                    ></b-form-textarea>
                    <b-button type="submit" variant="primary" class="mt-2">Submit Reply</b-button>
                  </b-form>
                  <div v-for="childReply in reply.replies || []" :key="childReply.id" class="mb-2" style="margin-left: 20px;">
                    <p>{{ childReply.content }}</p>
                    <p class="mb-0">
                      By {{ childReply.author.username }} on {{ formatDate(childReply.created_at) }} |
                      <strong>Likes:</strong> {{ childReply.likes_count }}
                    </p>
                  </div>
                </div>
              </b-card-body>
            </b-card>
          </b-card-body>
        </b-card>
  
        <b-modal v-model="showCreateThreadModal" title="Create New Thread" @hidden="resetThreadForm">
          <b-form @submit.prevent="createThread">
            <b-form-group label="Thread Content" label-for="thread-content" :invalid-feedback="contentError">
              <b-form-textarea
                id="thread-content"
                v-model="newThreadContent"
                placeholder="Enter thread content"
                rows="5"
                required
                :state="contentError ? false : null"
              ></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary" :disabled="isSubmitting">Create Thread</b-button>
          </b-form>
        </b-modal>
      </b-col>
    </StudentLayout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useToast } from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useRoute, useRouter } from 'vue-router';
  import StudentLayout from '@/layouts/StudentLayout.vue';
  import { api } from '@/services/authService';
  
  const $toast = useToast();
  const route = useRoute();
  const router = useRouter();
  const threads = ref([]);
  const categoryName = ref('');
  const categoryId = ref(null);
  const user = ref(null);
  const showCreateThreadModal = ref(false);
  const newThreadContent = ref('');
  const contentError = ref('');
  const isSubmitting = ref(false);
  const showReplyForm = ref({});
  const newReply = ref({});
  const showNestedReplyForm = ref({});
  const newNestedReply = ref({});
  
  const fetchCategory = async () => {
    try {
      const response = await api.get(`community/categories/${route.params.slug}/`);
      categoryName.value = response.data.name;
      categoryId.value = response.data.id;
    } catch (error) {
      console.error('Failed to fetch category:', error);
      $toast.error('Failed to fetch category');
      router.push('/community'); // Redirect if category not found
    }
  };
  
  const fetchThreads = async () => {
    try {
      const response = await api.get(`community/threads/community/${route.params.slug}/`);
      threads.value = response.data.results; // Assuming Django REST Framework pagination
      if (threads.value.length > 0 && !categoryName.value) {
        categoryName.value = threads.value[0].category.name;
      }
      $toast.success('Threads loaded successfully!');
    } catch (error) {
      console.error('Failed to fetch threads:', error);
      $toast.error('Failed to fetch threads');
    }
  };
  
  const fetchUser = async () => {
    try {
      const response = await api.get('auth/users/me/'); // Adjust endpoint based on your auth setup
      user.value = response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      $toast.error('Failed to fetch user data');
    }
  };
  
  const validateThreadForm = () => {
    contentError.value = '';
    if (!newThreadContent.value.trim()) {
      contentError.value = 'Thread content is required';
      return false;
    }
    return true;
  };
  
  const createThread = async () => {
    if (!validateThreadForm()) return;
  
    isSubmitting.value = true;
    try {
      await api.post('community/threads/', {
        content: newThreadContent.value,
        category: categoryId.value, // Use category ID
      });
      $toast.success(`Thread created in ${categoryName.value}!`);
      showCreateThreadModal.value = false;
      newThreadContent.value = '';
      await fetchThreads();
    } catch (error) {
      console.error('Failed to create thread:', error);
      if (error.response && error.response.data) {
        if (error.response.data.category) {
          $toast.error('Invalid community');
        } else if (error.response.data.content) {
          contentError.value = error.response.data.content[0];
        } else {
          $toast.error('Failed to create thread');
        }
      } else {
        $toast.error('Failed to create thread');
      }
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const createReply = async (threadId) => {
    try {
      await api.post('community/replies/', {
        thread: threadId,
        content: newReply.value[threadId],
      });
      $toast.success('Reply created successfully!');
      newReply.value[threadId] = '';
      showReplyForm.value[threadId] = false;
      await fetchThreads();
    } catch (error) {
      console.error('Failed to create reply:', error);
      $toast.error('Failed to create reply');
    }
  };
  
  const createNestedReply = async (threadId, parentId) => {
    try {
      await api.post('community/replies/', {
        thread: threadId,
        content: newNestedReply.value[parentId],
        parent: parentId,
      });
      $toast.success('Nested reply created successfully!');
      newNestedReply.value[parentId] = '';
      showNestedReplyForm.value[parentId] = false;
      await fetchThreads();
    } catch (error) {
      console.error('Failed to create nested reply:', error);
      $toast.error('Failed to create nested reply');
    }
  };
  
  const likeThread = async (slug) => {
    try {
      await api.post(`community/threads/${slug}/like/`);
      $toast.success('Thread liked successfully!');
      await fetchThreads();
    } catch (error) {
      console.error('Failed to like thread:', error);
      $toast.error('Failed to like thread');
    }
  };
  
  const unlikeThread = async (slug) => {
    try {
      await api.post(`community/threads/${slug}/unlike/`);
      $toast.success('Thread unliked successfully!');
      await fetchThreads();
    } catch (error) {
      console.error('Failed to unlike thread:', error);
      $toast.error('Failed to unlike thread');
    }
  };
  
  const likeReply = async (replyId) => {
    try {
      await api.post(`community/posts/${replyId}/like/`);
      $toast.success('Reply liked successfully!');
      await fetchThreads();
    } catch (error) {
      console.error('Failed to like reply:', error);
      $toast.error('Failed to like reply');
    }
  };
  
  const unlikeReply = async (replyId) => {
    try {
      await api.post(`community/posts/${replyId}/unlike/`);
      $toast.success('Reply unliked successfully!');
      await fetchThreads();
    } catch (error) {
      console.error('Failed to unlike reply:', error);
      $toast.error('Failed to unlike reply');
    }
  };
  
  const isThreadLiked = (thread) => {
    if (!thread.likes || !user.value) return false;
    return thread.likes.some(like => like.user.id === user.value.id);
  };
  
  const isReplyLiked = (reply) => {
    if (!reply.likes || !user.value) return false;
    return reply.likes.some(like => like.user.id === user.value.id);
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const resetThreadForm = () => {
    newThreadContent.value = '';
    contentError.value = '';
    showCreateThreadModal.value = false;
  };
  
  onMounted(() => {
    fetchCategory();
    fetchThreads();
    fetchUser();
  });
  </script>