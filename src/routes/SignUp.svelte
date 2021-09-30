<script lang="ts">
  import AuthObserver from '@/components/auth/AuthObserver.svelte';
  import AccountForm from '@/components/AccountForm.svelte';

  let name: string;
  let email: string;
  let password: string;

  $: disablesSubmitButton = !(name && email && password);
</script>

<AuthObserver isPublic={true} allowsAuthoriedUser={true} />

<main>
  <AccountForm>
    <h2 slot="formTitle">Sign up with <b>Email</b></h2>
    <input
      slot="username"
      type="text"
      name="name"
      id="name"
      placeholder=" "
      bind:value={name}
    />
    <input
      slot="email"
      type="email"
      name="email"
      id="email"
      placeholder=" "
      bind:value={email}
    />
    <input
      slot="password"
      type="password"
      name="password"
      id="password"
      placeholder=" "
      bind:value={password}
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
