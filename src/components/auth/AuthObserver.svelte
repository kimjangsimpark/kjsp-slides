<script lang="ts">
  import { onMount } from 'svelte';
  import { userInfo } from '@/store/user';
  import { push } from 'svelte-spa-router';
  import { getUserInfo } from '@/http/auth';
  import { catchError, throwError } from 'rxjs';

  export let allowsAuthoriedUser: boolean;

  onMount(() => {
    if ($userInfo) {
      // 이미 로그인한 사용자는 진입할 수 없는 페이지
      if (allowsAuthoriedUser) return push('/home');
      // 그게아니면 아무일도 안함
      return;
    }

    const userEmail = localStorage.getItem('userEmail');
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && userEmail) {
      getUserInfo(userEmail, accessToken)
        .pipe(
          catchError(error => {
            if (error instanceof Response) {
              // 토큰 재발급 요청
            } else {
              console.error('Get User Info ERROR!!', error);
              alert('뭔가.. 잘못됐다..!');
            }

            return throwError(() => error);
          }),
        )
        .subscribe({
          next: res => {
            localStorage.setItem('userEmail', res.userEmail);
            userInfo.set(res);
          },
        });
    }
  });
</script>
