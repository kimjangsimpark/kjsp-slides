<script lang="ts">
  import { onMount } from 'svelte';
  import { userInfo } from '@/store/user';
  import { push } from 'svelte-spa-router';

  export let isPublic: boolean;
  export let allowsAuthoriedUser = false;

  onMount(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!$userInfo || !accessToken) {
      userInfo.set(null);
      localStorage.removeItem('accessToken');

      return isPublic ? null : push('/sign-in');
    } else if (accessToken) {
      // 이미 로그인한 사용자는 진입할 수 없는 페이지
      if (allowsAuthoriedUser) return push('/');
      // accessToken가지고 call GET userInfo
      // token으로 get userInfo 실패시 -> 홈화면 || 로그인화면으로 리다이렉트
      userInfo.set(null);
      // 성공시 userInfo 채워주기 -> 로그인 풀려서 왔던곳으로 리다이렉트
      userInfo.set({
        username: 'Tim Cook',
        email: 'test@test.com',
      });
    }
  });
</script>
