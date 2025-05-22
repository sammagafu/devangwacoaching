<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h5 class="mb-4">Ask Your Question</h5>
        <div class="d-flex mb-4">
          <div class="avatar avatar-sm flex-shrink-0 me-2">
            <a href="#"> <img class="avatar-img rounded-circle" :src="userAvatar" alt=""> </a>
          </div>
          <b-form class="w-100 d-flex" @submit.prevent="postComment">
            <b-form-textarea
              v-model="newComment"
              class="one pe-4 bg-light"
              id="autoheighttextarea"
              rows="1"
              placeholder="Add a comment..."
            />
            <b-button variant="primary" class="ms-2 mb-0" type="submit" :disabled="posting">Post</b-button>
          </b-form>
        </div>

        <div v-if="loadingComments" class="text-center py-3">
          <b-spinner variant="primary" />
        </div>
        <div v-else-if="comments.length === 0" class="text-center py-3">
          <p>No comments yet. Be the first to comment!</p>
        </div>
        <div v-else class="border p-2 p-sm-4 rounded-3 mb-4">
          <ul class="list-unstyled mb-0">
            <li class="comment-item" v-for="comment in comments" :key="comment.id">
              <div class="d-flex mb-3">
                <div class="avatar avatar-sm flex-shrink-0">
                  <a href="#"><img class="avatar-img rounded-circle" :src="comment.user.avatar || defaultAvatar" alt=""></a>
                </div>
                <div class="ms-2">
                  <div class="bg-light p-3 rounded">
                    <div class="d-flex justify-content-between">
                      <div class="me-2">
                        <h6 class="mb-1 lead fw-bold">
                          <a href="#">{{ comment.user.full_name }}</a>
                        </h6>
                        <p class="h6 mb-0">{{ comment.content }}</p>
                      </div>
                      <small>{{ formatTime(comment.created_at) }}</small>
                    </div>
                  </div>
                  <ul class="nav nav-divider py-2 small">
                    <li class="nav-item">
                      <a class="text-primary-hover" href="#" @click="likeComment(comment.id)">Like ({{ comment.likes }})</a>
                    </li>
                    <li class="nav-item">
                      <a class="text-primary-hover" href="#" @click="showReplies(comment.id)">Reply</a>
                    </li>
                    <li class="nav-item" v-if="comment.replies_count > 0">
                      <a class="text-primary-hover" href="#" @click="fetchReplies(comment.id)">
                        View {{ comment.replies_count }} replies
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <ul class="list-unstyled ms-4" v-if="comment.replies?.length">
                <li class="comment-item" v-for="reply in comment.replies" :key="reply.id">
                  <div class="d-flex">
                    <div class="avatar avatar-xs flex-shrink-0">
                      <a href="#"><img class="avatar-img rounded-circle" :src="reply.user.avatar || defaultAvatar" alt=""></a>
                    </div>
                    <div class="ms-2">
                      <div class="bg-light p-3 rounded">
                        <div class="d-flex justify-content-between">
                          <div class="me-2">
                            <h6 class="mb-1 lead fw-bold">
                              <a href="#">{{ reply.user.full_name }}</a>
                            </h6>
                            <p class="mb-0">{{ reply.content }}</p>
                          </div>
                          <small>{{ formatTime(reply.created_at) }}</small>
                        </div>
                      </div>
                      <ul class="nav nav-divider py-2 small">
                        <li class="nav-item">
                          <a class="text-primary-hover" href="#" @click="likeComment(reply.id)">Like ({{ reply.likes }})</a>
                        </li>
                        <li class="nav-item">
                          <a class="text-primary-hover" href="#">Reply</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { useToast } from 'vue-toast-notification';
import { api } from '@/services/authService';
import avatar09 from '@/assets/images/avatar/09.jpg';

const $toast = useToast();
const comments = ref<CommentType[]>([]);
const newComment = ref('');
const loadingComments = ref(false);
const posting = ref(false);
const userAvatar = avatar09;
const defaultAvatar = avatar09;

interface CourseType {
  id?: number;
  slug?: string;
}

interface CommentType {
  id: number;
  user: { full_name: string; avatar?: string };
  content: string;
  created_at: string;
  likes: number;
  replies_count: number;
  replies?: CommentType[];
}

defineProps<{
  course: CourseType;
}>();

const fetchComments = async () => {
  if (!course?.slug) {
    console.warn('Course slug is missing, skipping comment fetch.');
    return;
  }
  try {
    loadingComments.value = true;
    const response = await api.get(`course/comments/`, {
      params: { course_slug: course.slug },
    });
    comments.value = response.data.map((comment: any) => ({
      ...comment,
      replies: comment.replies || [],
    }));
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    $toast.error('Failed to load comments.');
  } finally {
    loadingComments.value = false;
  }
};

const postComment = async () => {
  if (!newComment.value.trim()) {
    $toast.error('Comment cannot be empty.');
    return;
  }
  if (!course?.slug) {
    $toast.error('Course slug is missing.');
    return;
  }
  try {
    posting.value = true;
    const response = await api.post(`course/comments/`, {
      course_slug: course.slug,
      content: newComment.value,
    });
    comments.value.unshift({
      ...response.data,
      user: { full_name: response.data.user.full_name, avatar: response.data.user.avatar || defaultAvatar },
      likes: 0,
      replies_count: 0,
      replies: [],
    });
    newComment.value = '';
    $toast.success('Comment posted successfully.');
  } catch (error) {
    console.error('Failed to post comment:', error);
    $toast.error('Failed to post comment.');
  } finally {
    posting.value = false;
  }
};

const likeComment = async (commentId: number) => {
  try {
    await api.post(`course/comments/${commentId}/like/`);
    const comment = comments.value.find(c => c.id === commentId);
    if (comment) comment.likes += 1;
    $toast.success('Comment liked.');
  } catch (error) {
    console.error('Failed to like comment:', error);
    $toast.error('Failed to like comment.');
  }
};

const fetchReplies = async (commentId: number) => {
  try {
    const response = await api.get(`course/comments/${commentId}/replies/`);
    const comment = comments.value.find(c => c.id === commentId);
    if (comment) {
      comment.replies = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch replies:', error);
    $toast.error('Failed to fetch replies.');
  }
};

const showReplies = (commentId: number) => {
  console.log('Show reply form for comment:', commentId);
};

const formatTime = (date: string) => {
  const timeDiff = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60);
  return timeDiff < 24 ? `${Math.round(timeDiff)}hr` : new Date(date).toLocaleDateString();
};

onMounted(() => {
  fetchComments();
});
</script>