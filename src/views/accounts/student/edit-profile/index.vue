<template>
  <StudentLayout>
    <b-col xl="9">
      <b-card no-body class="bg-transparent border rounded-3">
        <b-card-header class="bg-transparent border-bottom">
          <h3 class="card-header-title mb-0">Edit Profile</h3>
        </b-card-header>
        <b-card-body>
          <b-form class="row g-4" @submit.prevent="saveChanges">
            <b-col cols="12" class="justify-content-center align-items-center">
              <label class="form-label">Profile picture</label>
              <div class="d-flex align-items-center">
                <label class="position-relative me-4" for="uploadfile-1" title="Replace this pic">
                  <span class="avatar avatar-xl">
                    <img id="uploadfile-1-preview" class="avatar-img rounded-circle border border-white border-3 shadow"
                      :src="userDetails.avatar || avatar07" alt="">
                  </span>
                  <button type="button" class="uploadremove flex-centered" @click="removeAvatar">
                    <BIconX class="text-white" />
                  </button>
                </label>
                <label class="btn btn-primary-soft mb-0" for="uploadfile-1">Change</label>
                <b-form-file class="d-none" id="uploadfile-1" @change="handleAvatarUpload" accept="image/png,image/jpeg" />
              </div>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Full name" :invalid-feedback="errors.full_name">
                <b-form-input v-model="user.full_name" placeholder="Enter full name" :state="errors.full_name ? false : null" />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Email">
                <b-form-input v-model="user.email" type="email" placeholder="Enter email" disabled />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Phone number" :invalid-feedback="errors.phonenumber">
                <b-form-input v-model="user.phonenumber" placeholder="Enter phone number" :state="errors.phonenumber ? false : null" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Bio" :invalid-feedback="errors.bio">
                <b-form-textarea v-model="userDetails.bio" placeholder="Add a bio..." rows="3" max-rows="6" :state="errors.bio ? false : null" />
                <div class="form-text">Brief description for your profile.</div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Social Media Profiles">
                <div class="mb-3">
                  <b-form-group>
                    <template #label>
                      <font-awesome-icon :icon="faFacebook" class="text-facebook me-1" /> Facebook
                    </template>
                    <b-form-input v-model="userDetails.facebook" placeholder="Enter Facebook URL" />
                  </b-form-group>
                </div>
                <div class="mb-3">
                  <b-form-group>
                    <template #label>
                      <BIconTwitter class="text-twitter me-1" /> Twitter
                    </template>
                    <b-form-input v-model="userDetails.twitter" placeholder="Enter Twitter URL" />
                  </b-form-group>
                </div>
                <div class="mb-3">
                  <b-form-group>
                    <template #label>
                      <font-awesome-icon :icon="faInstagram" class="text-instagram me-1" /> Instagram
                    </template>
                    <b-form-input v-model="userDetails.instagram" placeholder="Enter Instagram URL" />
                  </b-form-group>
                </div>
                <div class="mb-3">
                  <b-form-group>
                    <template #label>
                      <font-awesome-icon :icon="faGlobe" class="text-primary me-1" /> Website
                    </template>
                    <b-form-input v-model="userDetails.website" placeholder="Enter website URL" />
                  </b-form-group>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" v-if="nonFieldErrors.length">
              <b-alert show variant="danger">
                <ul>
                  <li v-for="(error, index) in nonFieldErrors" :key="index">{{ error }}</li>
                </ul>
              </b-alert>
            </b-col>

            <div class="d-sm-flex justify-content-end">
              <b-button type="submit" variant="primary" class="mb-0" :disabled="isSubmitting">Save changes</b-button>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </StudentLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import StudentLayout from '@/layouts/StudentLayout.vue';
import avatar07 from '@/assets/images/avatar/07.jpg';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { BIconX, BIconTwitter } from 'bootstrap-icons-vue';
import { api } from '@/services/authService';

const $toast = useToast();
const user = ref({});
const userDetails = ref({});
const errors = ref({});
const nonFieldErrors = ref([]);
const isSubmitting = ref(false);
const avatarFile = ref(null);

const fetchProfile = async () => {
  try {
    const response = await api.get('auth/profile/');
    user.value = response.data.user;
    userDetails.value = response.data.user_details || {};
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    $toast.error('Failed to fetch profile data');
  }
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('Selected file:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });
    avatarFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      userDetails.value.avatar = e.target.result; // Preview
    };
    reader.readAsDataURL(file);
  } else {
    console.warn('No file selected');
    $toast.warning('No file selected for avatar');
  }
};

const removeAvatar = () => {
  avatarFile.value = null;
  userDetails.value.avatar = null;
  console.log('Avatar removed');
};

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!user.value.full_name?.trim()) {
    errors.value.full_name = 'Full name is required';
    isValid = false;
  }
  if (user.value.phonenumber && !/^\+?\d{10,15}$/.test(user.value.phonenumber)) {
    errors.value.phonenumber = 'Invalid phone number';
    isValid = false;
  }
  if (userDetails.value.bio && userDetails.value.bio.length > 500) {
    errors.value.bio = 'Bio must be 500 characters or less';
    isValid = false;
  }
  if (avatarFile.value && !['image/png', 'image/jpeg'].includes(avatarFile.value.type)) {
    errors.value.avatar = 'Avatar must be a PNG or JPEG image';
    isValid = false;
  }

  return isValid;
};

const saveChanges = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  nonFieldErrors.value = [];

  try {
    const formData = new FormData();
    formData.append('user', JSON.stringify({
      full_name: user.value.full_name,
      phonenumber: user.value.phonenumber,
    }));
    formData.append('user_details', JSON.stringify({
      bio: userDetails.value.bio,
      twitter: userDetails.value.twitter,
      facebook: userDetails.value.facebook,
      instagram: userDetails.value.instagram,
      website: userDetails.value.website,
    }));
    if (avatarFile.value) {
      console.log('Appending avatar:', {
        name: avatarFile.value.name,
        type: avatarFile.value.type,
        size: avatarFile.value.size,
      });
      formData.append('avatar', avatarFile.value);
    } else {
      console.warn('No avatar file selected for upload');
    }

    // Log FormData entries for debugging
    console.log('FormData entries:', [...formData.entries()]);

    const response = await api.put('auth/profile/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    user.value = response.data.user;
    userDetails.value = response.data.user_details;
    avatarFile.value = null; // Clear file after upload
    $toast.success('Profile updated successfully!');
  } catch (error) {
    console.error('Failed to update profile:', error);
    if (error.response && error.response.data) {
      errors.value = {
        ...(error.response.data.user || {}),
        ...(error.response.data.user_details || {}),
        avatar: error.response.data.avatar || errors.value.avatar,
      };
      nonFieldErrors.value = error.response.data.non_field_errors || [];
      $toast.error('Failed to update profile: Check form errors');
    } else {
      $toast.error('Failed to update profile');
    }
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchProfile();
});
</script>