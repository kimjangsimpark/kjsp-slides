<script lang="ts">
  import AccountForm from '@/components/AccountForm.svelte';
  import { userInfo } from '@/store/user';
  import { push } from 'svelte-spa-router';
  import AuthObserver from '@/components/auth/AuthObserver.svelte';

  let email: string;
  let password: string;

  const handleClickSignInButton = () => {
    signIn();
  };

  const signIn = () => {
    // @todo 서버와 통신
    userInfo.set({
      username: 'Tim Cook',
      email,
    });
    localStorage.setItem('accessToken', 'aaa.bbb.ccc1');
    void push('/home');
  };

  $: disablesSubmitButton = !(email && password);
</script>

<AuthObserver isPublic={true} allowsAuthoriedUser={true} />

<main>
  <AccountForm>
    <h2 slot="formTitle">Sign in</h2>
    <input
      type="text"
      name="email"
      id="email"
      slot="email"
      placeholder=" "
      bind:value={email}
    />
    <input
      type="password"
      name="password"
      id="password"
      slot="password"
      placeholder=" "
      bind:value={password}
    />
    <button
      slot="submitButton"
      disabled={disablesSubmitButton}
      on:click={handleClickSignInButton}>Sign in</button
    >
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
