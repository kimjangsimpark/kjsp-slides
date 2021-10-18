<script lang="ts">
  import AccountForm from '@/components/AccountForm.svelte';
  import { userInfo, IUserInfo } from '@/store/user';
  import { push } from 'svelte-spa-router';
  import AuthObserver from '@/components/auth/AuthObserver.svelte';
  import { fetcher } from '@/misc/fetcher';

  let userEmail: string;
  let userPassword: string;

  userEmail = 'test@gmail.com';
  userPassword = 'test1234';

  const hadleFormSubmit = () => {
    signIn();
  };

  const signIn = () => {
    const requestBody = JSON.stringify({ userEmail, userPassword });

    const signInResponse = fetcher.fetch('/api/user/signin', {
      method: 'POST',
      body: requestBody,
    });

    signInResponse.subscribe({
      next: response => {
        console.log(response);

        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('accessToken', response.accessToken);

        userInfo.set(response.userInfo);

        push('/');
      },
    });

    // // @todo 서버와 통신
    // userInfo.set({
    //   username: 'Tim Cook',
    //   email: userEmail,
    // });
    // localStorage.setItem('accessToken', 'aaa.bbb.ccc1');
  };

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
