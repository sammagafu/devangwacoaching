<template>
    <div class="comment text-black rounded-md">
      <div class="comment-header">
        <Avatar :label="getInitials(comment.author.full_name)" class="mr-2 text-white" size="small" shape="circle" />
        <span>{{ comment.author.full_name }}</span>
      </div>
      <p>{{ comment.content }}</p>
      <!-- <button @click="toggleReplyForm">Reply</button> -->
      <!-- <div v-if="showReplyForm">
        <textarea v-model="replyContent" placeholder="Write a reply..."></textarea>
        <button @click.prevent="submitReply">Submit</button>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    comment: Object
  });
  
  const emit = defineEmits(['add-reply']);
  
  
  const replyContent = ref('');
  
  const toggleReplyForm = () => {
    showReplyForm.value = !showReplyForm.value;
  };
  
  const submitReply = () => {
    emit('add-reply', { content: replyContent.value, author: 'Current User' }, props.comment);
    replyContent.value = '';
    showReplyForm.value = false;
  };
  
  const addReply = (reply, parentComment) => {
    parentComment.replies = parentComment.replies || [];
    parentComment.replies.push(reply);
  };
  
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('')??"";
  };
  </script>
  
  <style scoped>
  .comment {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
  }
  .comment-header {
    display: flex;
    align-items: center;
  }
  textarea {
    width: 100%;
    margin-top: 10px;
  }
  </style>
  