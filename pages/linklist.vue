<template lang="pug">
v-container
  v-card-text(v-if='$auth.user && $auth.user.is_admin')
    Editor.px-3.ma-0(v-model='linklist' :label="$t('common.linklist')")
  v-card-text(v-else v-html='linklist')
  v-card-actions(v-if='$auth.user && $auth.user.is_admin')
    v-spacer
    v-btn(color='primary' outlined
      @click='save') {{$t('common.save')}}
</template>
<script>
import Editor from '@/components/Editor'
import { mapState, mapActions } from 'vuex'

export default {
  components: { Editor },
  data ({ $store }) {
    return {
      linklist: $store.state.settings.linklist || this.$t('linklist')
    }
  },
  head () {
    return {
      title: `${this.settings.title} - ${this.$t('common.info')}`
    }
  },
  computed: mapState(['settings']),
  methods: {
    ...mapActions(['setSetting']),
    save () {
      this.$root.$message('common.ok', { color: 'success' })
      this.setSetting({ key: 'linklist', value: this.linklist })
    }
  }
}
</script>
