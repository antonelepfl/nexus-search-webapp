
<template>
  <div>
    <h3>Tools Launcher</h3>
    <div v-for="action in toolsList" class="" v-bind:key="action.name">
      <a target="_blank" :href="action.link">
        <div class="card colored">
          <div class="card-content">
            <p class="subtitle">
              <i class="fas" :class="action.icon"></i>
              <span>{{ action.name }}</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>


<script>
  import externalTools from '@/config/external-tools';

  export default {
    name: 'tools-launcher-component',
    props: ['entityId'],
    computed: {
      toolsList() {
        if (!this.entityId) return [];
        return externalTools.getByEntityId(this.entityId);
      },
    },
  };
</script>


<style scoped>
  .analysis-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .analysis-img {
    max-width: 700px;
  }
</style>
