<script lang="ts">
  import AuthObserver from '@/components/auth/AuthObserver.svelte';
  import AccountForm from '@/components/AccountForm.svelte';
  import { UserServices } from '@/misc/userServices';
  import { fetcher } from '@/misc/fetcher';
  const userServices = UserServices.getInstance();

  let userName: string;
  let userEmail: string;
  let userPassword: string;
  let userPhone: string;

  userName = '김두치';
  userEmail = 'test@test.com';
  userPassword = '1234qwer';
  userPhone = '0112221111';

  const hadleFormSubmit = (): void => {
    const s = JSON.stringify({
      userName,
      userEmail,
      userPassword,
      userPhone,
    });
    const a = fetcher.fetch('/api/user/auth/signup', {
      method: 'POST',
      body: s,
    });

    // const signupResponse = userServices.signup({
    //   userName,
    //   userEmail,
    //   userPassword,
    //   userPhone,
    // });
  };

  $: disablesSubmitButton = !(userName && userEmail && userPassword && userPhone);
</script>

<AuthObserver isPublic={true} allowsAuthoriedUser={true} />

<main>
  <AccountForm {hadleFormSubmit} isSignin={false}>
    <h2 slot="formTitle">Sign up with <b>Email</b></h2>
    <input
      slot="userName"
      type="text"
      name="userName"
      id="userName"
      placeholder=" "
      bind:value={userName}
    />
    <input
      slot="userEmail"
      type="email"
      name="userEmail"
      id="userEmail"
      placeholder=" "
      bind:value={userEmail}
    />
    <input
      slot="userPassword"
      type="password"
      name="userPassword"
      id="userPassword"
      placeholder=" "
      bind:value={userPassword}
    />
    <input
      slot="userPhone"
      type="tel"
      name="userPhone"
      id="userPhone"
      placeholder=" "
      bind:value={userPhone}
    />
    <button slot="submitButton" disabled={disablesSubmitButton}>Sign up</button>
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
