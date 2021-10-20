<script lang="ts">
  import AccountForm from '@/components/AccountForm.svelte';
  import { userInfo, IUserInfo } from '@/store/user';
  import { push } from 'svelte-spa-router';
  import AuthObserver from '@/components/auth/AuthObserver.svelte';
  import { fetcher } from '@/misc/fetcher';
  import { signIn } from '@/http/auth';
  import { catchError, throwError } from 'rxjs';

  let userEmail: string;
  let userPassword: string;

  userEmail = 'test@gmail.com';
  userPassword = 'test1234';

  const hadleFormSubmit = () => {
    onSignInClick();
  };

  const onSignInClick = () =>
    signIn({
      userEmail: userEmail,
      userPassword: userPassword,
    })
      .pipe(
        catchError(error => {
          alert('오류났어!');
          return throwError(() => error);
        }),
      )
      .subscribe({
        next: res => {
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('accessToken', res.accessToken);
          userInfo.set(res.userInfo);
          push('/');
        },
      });

  $: disablesSubmitButton = !(userEmail && userPassword);
</script>

<AuthObserver isPublic={true} allowsAuthoriedUser={true} />

<main>
  <AccountForm {hadleFormSubmit} isSignin={true}>
    <h2 slot="formTitle">Sign in</h2>
    <input
      type="text"
      name="userEmail"
      id="userEmail"
      slot="userEmail"
      placeholder=" "
      bind:value={userEmail}
    />
    <input
      type="password"
      name="userPassword"
      id="userPassword"
      slot="userPassword"
      placeholder=" "
      bind:value={userPassword}
    />
    <button slot="submitButton" disabled={disablesSubmitButton}>Sign in</button>
  </AccountForm>
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    padding: 20px;
  }
</style>
