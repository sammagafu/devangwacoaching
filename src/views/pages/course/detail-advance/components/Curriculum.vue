<template>
  <b-col cols="12">
    <b-card no-body class="border rounded-3">
      <b-card-header class="b-card-header border-bottom">
        <h3 class="mb-0">Curriculum</h3>
      </b-card-header>
      <b-card-body>
        <b-row class="g-5">
          <template v-if="modules && modules.length">
            <template v-for="(module, moduleIdx) in modules" :key="moduleIdx">
              <b-col cols="12">
                <h5 class="mb-4">{{ module.title }} ({{ module.total_videos || 0 }} lectures)</h5>
                <template v-if="module.videos && module.videos.length">
                  <template v-for="(video, videoIdx) in module.videos" :key="videoIdx">
                    <hr v-if="videoIdx">
                    <div class="d-sm-flex justify-content-sm-between align-items-center">
                      <div class="d-flex">
                        <a href="#" class="btn btn-danger-soft btn-round mb-0">
                          <font-awesome-icon :icon="faPlay" />
                        </a>
                        <div class="ms-2 ms-sm-3 mt-1 mt-sm-0">
                          <h6 class="mb-0">{{ video.title || 'Untitled Video' }}</h6>
                          <p class="mb-2 mb-sm-0 small">10m 00s</p>
                        </div>
                      </div>
                      <a :href="video.video_url" target="_blank" class="btn btn-sm btn-success mb-0">
                        Play
                      </a>
                    </div>
                  </template>
                </template>
                <div v-else class="text-muted">
                  No videos available for this module
                </div>
              </b-col>
            </template>
          </template>
          <div v-else class="text-center py-4 text-muted">
            No curriculum data available
          </div>
        </b-row>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { faPlay } from '@fortawesome/free-solid-svg-icons';

defineProps({
  modules: {
    type: Array as PropType<Array<{
      id: number;
      title: string;
      videos?: Array<{
        id: number;
        title: string;
        video_url: string;
      }>;
      total_videos: number;
    }>>,
    default: () => []
  }
});
</script>